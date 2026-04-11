import json
from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel

import models
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Off Grid Demo API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for validating incoming POST data
class ItemCreate(BaseModel):
    name: str
    description: str = None

class StockUpdate(BaseModel):
    id: str
    sales: int

@app.get("/")
def home():
    return {"message": "Backend is running"}

@app.get("/test")
def test():
    return {
        "status": "success",
        "data": "API is working perfectly",
        "items": [
            {"id": 1, "name": "Solar panel"},
            {"id": 2, "name": "Battery pack"},
            {"id": 3, "name": "Water filter"},
        ],
    }

@app.post("/echo")
def echo(data: dict):
    return {"you_sent": data}

# --- Data Store Endpoints ---
import data_store

@app.get("/api/dashboard/owner")
def get_owner_dashboard():
    return {"data": data_store.ownerDashboardFeatures}

@app.get("/api/dashboard/employee")
def get_employee_dashboard():
    return {"data": data_store.employeeDashboardFeatures}

@app.get("/api/metrics/owner")
def get_owner_metrics():
    return {"data": data_store.ownerMetrics}

@app.get("/api/metrics/employee")
def get_employee_metrics():
    return {"data": data_store.employeeMetrics}

@app.get("/api/sales")
def get_sales():
    return {"data": data_store.salesData}

@app.get("/api/signals")
def get_signals():
    return {"data": data_store.liveSignals}

@app.get("/api/transactions")
def get_transactions():
    return {"data": data_store.transactions}

@app.get("/api/actions")
def get_action_queue():
    return {"data": data_store.actionQueue}

@app.get("/api/briefs")
def get_decision_briefs():
    return {"data": data_store.decisionBriefs}

@app.get("/api/inventory")
def get_inventory(db: Session = Depends(get_db)):
    items = db.query(models.InventoryItem).all()
    return {"data": items}

@app.get("/api/routes")
def get_routes():
    return {"data": data_store.fieldRoutes}

@app.get("/api/team")
def get_team():
    return {"data": data_store.teamMembers}

@app.get("/api/clients")
def get_clients():
    return {"data": data_store.clients}

@app.get("/api/workflow")
def get_workflow():
    return {"data": data_store.workflowItems}

@app.get("/api/timeline")
def get_timeline():
    return {"data": data_store.timelineEvents}

# --- New Supabase Routes (Legacy/Testing from before) ---

@app.get("/items")

# --- Real-Time Employee Tracking (WebSockets) ---

class ConnectionManager:
    def __init__(self):
        # We store all connected clients here (Owners observing, Employees sending)
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except RuntimeError:
                pass

manager = ConnectionManager()
sync_manager = ConnectionManager()

@app.websocket("/ws/v1/sync")
async def websocket_sync_endpoint(websocket: WebSocket):
    """
    WebSocket endpoint for broadcasting global data reload events.
    When an employee updates data, we fire a REFRESH_DATA to tell Owner phones to re-render.
    """
    await sync_manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        sync_manager.disconnect(websocket)

@app.post("/api/stock/update")
async def update_stock(update: StockUpdate):
    for item in data_store.inventoryItems:
        if item["id"] == update.id:
            old_sales = item.get("sales", 0)
            diff = update.sales - old_sales
            item["sales"] = update.sales
            item["stock"] -= diff
            
            # Magically bump the items sold metric globally so Owner sees revenue tick up!
            for metric in data_store.employeeMetrics:
                if metric["id"] == "items-sold":
                    metric["value"] = int(metric["value"]) + diff
                    
            for metric in data_store.ownerMetrics:
                if metric["id"] == "weekly-revenue":
                    # Let's pretend every item is Rs 2000
                    metric["value"] = int(metric["value"]) + (diff * 2000)
            
            # Broadcast to all connected clients that the database changed!
            await sync_manager.broadcast({"type": "REFRESH_DATA", "source": "stock"})
            return {"status": "success", "item": item}
            
    raise HTTPException(status_code=404, detail="Item not found")

@app.post("/api/actions/resolve/{action_id}")
async def resolve_action(action_id: str):
    import data_store
    data_store.actionQueue = [a for a in data_store.actionQueue if a["id"] != action_id]
    await sync_manager.broadcast({"type": "REFRESH_DATA", "source": "actions"})
    return {"status": "success"}

@app.post("/api/signals/resolve/{signal_id}")
async def resolve_signal(signal_id: str):
    import data_store
    data_store.liveSignals = [s for s in data_store.liveSignals if s["id"] != signal_id]
    await sync_manager.broadcast({"type": "REFRESH_DATA", "source": "signals"})
    return {"status": "success"}

@app.post("/api/briefs/resolve/{brief_id}")
async def resolve_brief(brief_id: str):
    import data_store
    data_store.decisionBriefs = [b for b in data_store.decisionBriefs if b["id"] != brief_id]
    await sync_manager.broadcast({"type": "REFRESH_DATA", "source": "briefs"})
    return {"status": "success"}

import uuid

@app.post("/api/tasks/assign")
async def assign_task(payload: dict):
    import data_store
    data_store.pendingEmployeeTask = {
        "id": str(uuid.uuid4()),
        "employee_id": payload.get("employee_id"),
        "description": payload.get("description"),
        "status": "pending"
    }
    await sync_manager.broadcast({"type": "REFRESH_DATA", "source": "task_assign"})
    return {"status": "success"}

@app.get("/api/tasks/pending")
def get_pending_task():
    import data_store
    task = getattr(data_store, "pendingEmployeeTask", None)
    return {"data": task}

@app.post("/api/tasks/accept/{task_id}")
async def accept_task(task_id: str):
    import data_store
    task = getattr(data_store, "pendingEmployeeTask", None)
    if task and task["id"] == task_id:
        for emp in data_store.teamMembers:
            if emp["id"] == task["employee_id"]:
                emp["currentTask"] = task["description"]
                emp["status"] = "Busy"
        data_store.pendingEmployeeTask = None
        await sync_manager.broadcast({"type": "REFRESH_DATA", "source": "task_accept"})
        return {"status": "success"}
    raise HTTPException(status_code=404, detail="Task not active")

@app.post("/api/tasks/reject/{task_id}")
async def reject_task(task_id: str):
    import data_store
    data_store.pendingEmployeeTask = None
    await sync_manager.broadcast({"type": "REFRESH_DATA", "source": "task_reject"})
    return {"status": "success"}

@app.websocket("/ws/v1/tracking/live")
async def websocket_tracking_endpoint(websocket: WebSocket):
    """
    WebSocket endpoint for live employee tracking.
    Employees connect and stream their GPS coordinates.
    Owners connect to listen to these location streams in real-time.
    """
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            
            try:
                location_data = json.loads(data)
            except json.JSONDecodeError:
                location_data = {"error": "Invalid JSON", "raw": data}

            await manager.broadcast(location_data)

    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast({
            "type": "status", 
            "status": "offline",
            "message": "Tracker disconnected"
        })