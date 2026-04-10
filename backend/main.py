from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend is running 🚀"}

@app.get("/test")
def test():
    return {
        "status": "success",
        "data": "API is working perfectly 💯"
    }

@app.post("/echo")
def echo(data: dict):
    return {
        "you_sent": data
    }