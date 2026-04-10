from fastapi import FastAPI, HTTPException
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