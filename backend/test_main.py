from fastapi.testclient import TestClient

from main import app


client = TestClient(app)


def test_home():
    response = client.get("/")

    assert response.status_code == 200
    assert response.json() == {"message": "Backend is running"}


def test_demo_endpoint():
    response = client.get("/test")
    body = response.json()

    assert response.status_code == 200
    assert body["status"] == "success"
    assert body["items"][0]["name"] == "Solar panel"


def test_echo_endpoint():
    payload = {"source": "react-native", "ready": True}

    response = client.post("/echo", json=payload)

    assert response.status_code == 200
    assert response.json() == {"you_sent": payload}
