
# Doctor's Assistant Dashboard - MongoDB Server

This server connects the Doctor's Assistant Dashboard to MongoDB for data storage and retrieval.

## Setup Instructions

1. **Install MongoDB**: 
   - Download and install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
   - Or use MongoDB Atlas cloud service

2. **Configure MongoDB Connection**:
   - Create a `.env` file in the server directory
   - Add your MongoDB connection string:
     ```
     MONGODB_URI=mongodb://your-connection-string
     ```
   - If using localhost, the default is `mongodb://localhost:27017/doctorAssistant`

3. **Install Dependencies**:
   ```
   cd server
   npm install
   ```

4. **Start the Server**:
   ```
   npm start
   ```
   The server will run on port 5000 by default

## API Endpoints

- **Patients**:
  - GET `/api/patients` - Get all patients
  - POST `/api/patients` - Add a new patient

- **Appointments**:
  - GET `/api/appointments` - Get all appointments
  - POST `/api/appointments` - Add a new appointment

- **Emergency Alerts**:
  - GET `/api/emergencyAlerts` - Get all emergency alerts

- **Test Results**:
  - GET `/api/testResults` - Get all test results

## Database Collections

The application uses the following collections:
- patients
- appointments
- emergencyAlerts
- testResults

## Development

For development with auto-restart:
```
npm run dev
```
