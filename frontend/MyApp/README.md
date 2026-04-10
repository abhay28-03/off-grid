# Frontend

Plain React Native demo app for testing the FastAPI backend.

The app calls:

- `GET /test`
- `POST /echo`

Android emulator uses `http://10.0.2.2:8000` for the backend. iOS simulator and other targets use `http://localhost:8000`.

## Setup

```powershell
npm install
```

## Run

Start Metro:

```powershell
npm start
```

Run Android:

```powershell
npm run android
```

Run tests:

```powershell
npm test
```
