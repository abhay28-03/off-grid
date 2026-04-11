# Off-Grid Business Management App

A comprehensive business management application with a React Native frontend and a FastAPI backend. It features an AI-powered inventory forecaster, real-time tracking, and dashboard metrics.

## 🛠 Prerequisites

Before you begin, ensure you have the following installed on your machine:
- **Node.js** (v18 or higher)
- **Python** (v3.9 or higher)
- **React Native CLI** environment setup (Android Studio for Android, Xcode for iOS)

---

## 🚀 Backend Setup

The backend is built with FastAPI, Python, and uses LangChain for AI integration.

1. **Navigate to the backend directory**
   ```bash
   cd backend
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**
   - **Windows:**
     ```powershell
     .\venv\Scripts\activate
     ```
   - **Mac/Linux:**
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Environment Configuration**
   Ensure you have a `.env` file in the `backend/` directory with the following variables:
   ```env
   DATABASE_URL="Your Supabase Database URL"
   ```

6. **Run the FastApi Server**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
   *The backend will now be running at `http://localhost:8000`.*

---

## 📱 Frontend Setup

The frontend is a React Native CLI project built to run on Android and iOS.

1. **Navigate to the frontend directory**
   ```bash
   cd frontend/MyApp
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Configure Backend IP (If running on a real Android/iOS device)**
   If you are running the app on a physical device, `localhost` will not work. Open `frontend/MyApp/src/api.ts` (or your respective API configuration file) and replace `http://localhost:8000` or `http://10.0.2.2:8000` with your machine's local Wi-Fi IP address (e.g., `http://192.168.1.100:8000`).

4. **Start the Metro Bundler**
   Leave this running in its own terminal window.
   ```bash
   npm start
   ```

5. **Run the Application**
   Open a new terminal, navigate to `frontend/MyApp`, and run the app on your preferred platform:
   - **For Android:**
     ```bash
     npm run android
     ```
   - **For iOS (Mac only):**
     *Make sure to `cd ios && pod install && cd ..` first.*
     ```bash
     npm run ios
     ```

---

## 🧪 Running Tests

### Backend
To run backend tests, ensure your virtual environment is active, then run:
```bash
cd backend
pytest
```

### Frontend
To run frontend Jest tests:
```bash
cd frontend/MyApp
npm test
```
