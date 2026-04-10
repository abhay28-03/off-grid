from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Off Grid Demo API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
