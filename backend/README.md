# Backend

FastAPI demo API for local testing.

## Setup

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## Run

```powershell
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Test

```powershell
pytest
```
