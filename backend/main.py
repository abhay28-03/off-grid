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

# --- New Supabase Routes ---

@app.get("/items")
def get_items():
    try:
        # Fetch all rows from the 'items' table in Supabase
        response = supabase.table("items").select("*").execute()
        return {"data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/items")
def create_item(item: ItemCreate):
    try:
        # Insert a new row into the 'items' table
        response = supabase.table("items").insert({
            "name": item.name,
            "description": item.description
        }).execute()
        return {"message": "Item added successfully", "data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

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