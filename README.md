# Doctors Assistance Dashboard

## 📌 Project Overview
The **Doctors Assistance Dashboard** is a web-based application designed to help doctors efficiently manage patient records, track appointments, and assist with daily medical tasks. The dashboard provides real-time data retrieval from a **MongoDB database**, along with authentication and AI-powered assistance features.

## 🚀 Features
- **Doctor Authentication**: Secure login system fetching doctor details from MongoDB.
- **Dashboard Overview**: Displays total patients, today's appointments, and quick actions.
- **Patient Management**: View and search for all registered patients.
- **Appointment Tracking**: Displays upcoming and completed patient appointments.
- **AI Assistant**: Provides recommendations and assistance to doctors.
- **Sticky AI Assistant Button**: Quick access to the AI Assistant feature.

## 🛠 Tech Stack
- **Frontend**: React (Vite) + TypeScript + Tailwind CSS + ShadCN Components
- **Backend**: Node.js + Express.js + MongoDB (MongoDB Atlas)
- **Authentication**: JSON Web Token (JWT) & LocalStorage for session handling
- **State Management**: React Query

## 📂 Project Structure
```
/doctor-assistance-dashboard
├── backend/            # Backend server files
│   ├── server.js       # Express server with API endpoints
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API route handlers
│   └── db.js           # MongoDB connection setup
├── frontend/           # Frontend React application
│   ├── src/
│   │   ├── components/ # UI components (Header, Cards, etc.)
│   │   ├── pages/      # Main pages (Dashboard, Login, Patients)
│   │   ├── services/   # API calls (api.ts)
│   │   └── App.tsx     # Main application entry
│   ├── public/         # Static assets
│   ├── index.html      # Main HTML file
│   └── vite.config.ts  # Vite configuration
└── README.md           # Project documentation
```

## 🔧 Setup Instructions
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo/doctors-assistance-dashboard.git
cd doctors-assistance-dashboard
```

### 2️⃣ Setup the Backend
```sh
cd backend
npm install
```
- Create a `.env` file and add the MongoDB connection string:
  ```sh
  MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/Doctor
  JWT_SECRET=your_secret_key
  ```
- Start the backend server:
  ```sh
  node server.js
  ```
  - The backend will run on `http://localhost:5002`

### 3️⃣ Setup the Frontend
```sh
cd frontend
npm install
npm run dev
```
- The frontend will be available at `http://localhost:8080`

## 🔥 API Endpoints
| Method | Endpoint                  | Description |
|--------|---------------------------|-------------|
| POST   | `/api/login`               | Authenticate doctors |
| GET    | `/api/patients`            | Fetch all patients |
| GET    | `/api/patients/count`      | Get total patient count |
| GET    | `/api/appointments/today`  | Fetch today's appointments |

## 📌 Future Enhancements
- Implement real-time chat for doctor-patient communication.
- Add **prescription management** and **billing features**.
- Integrate **voice-based AI assistant**.

## 👨‍💻 Contributors
- **Your Name** - Full Stack Developer
- **[Your GitHub](https://github.com/your-profile)**

## 📜 License
This project is licensed under the **MIT License**.

---
Made with ❤️ for better healthcare! 🚀

