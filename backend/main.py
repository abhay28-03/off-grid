import json
from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import supabase  # Import the client we just created

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
def get_inventory():
    return {"data": data_store.inventoryItems}

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