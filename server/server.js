
const express = require('express');
const cors = require('cors');
const dbo = require('./db');

// Middlewareconst express = require('express');
const cors = require('cors');
const dbo = require('./db');
const dayjs = require('dayjs');

const PORT = process.env.PORT || 5002;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Start server
app.listen(PORT, async () => {
  try {
    // Connect to MongoDB when server starts
    await dbo.connectToServer();
    console.log(`Server is running on port: ${PORT}`);
  } catch (err) {
    console.error("Failed to start server:", err);
  }
});

// ✅ API to Fetch All Patients
app.get("/patients", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: "Error fetching patients data" });
  }
});

// Routes for patients
app.get('/api/patients', async (req, res) => {
  try {
    const db = dbo.getDb();
    const patients = await db.collection("patients")
      .find({})
      .limit(10)
      .toArray();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/patients', async (req, res) => {
  try {
    const db = dbo.getDb();
    const newPatient = req.body;
    const result = await db.collection("patients").insertOne(newPatient);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Fix: Get total patient count correctly
app.get("/api/patients/count", async (req, res) => {
  try {
    const db = dbo.getDb();
    const count = await db.collection("patients").countDocuments();
    res.json({ totalPatients: count });
  } catch (error) {
    console.error("Error fetching total patients count:", error);
    res.status(500).json({ error: "Failed to fetch total patients count" });
  }
});

// Routes for appointments
app.get('/api/appointments', async (req, res) => {
  try {
    const db = dbo.getDb();
    const appointments = await db.collection("appointments")
      .find({})
      .limit(10)
      .toArray();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/appointments', async (req, res) => {
  try {
    const db = dbo.getDb();
    const newAppointment = req.body;
    const result = await db.collection("appointments").insertOne(newAppointment);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Routes for emergency alerts
app.get('/api/emergencyAlerts', async (req, res) => {
  try {
    const db = dbo.getDb();
    const alerts = await db.collection("emergencyAlerts")
      .find({})
      .limit(10)
      .toArray();
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Fix: Get today's appointments correctly
app.get("/api/appointments/today", async (req, res) => {
  try {
    const db = dbo.getDb();
    const today = dayjs().startOf("day").toDate();
    const tomorrow = dayjs().add(1, "day").startOf("day").toDate();

    const todayAppointments = await db.collection("appointments")
      .find({ appointmentDate: { $gte: today, $lt: tomorrow } })
      .toArray();

    res.json({ todayAppointments });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch today's appointments" });
  }
});

// Routes for test results
app.get('/api/testResults', async (req, res) => {
  try {
    const db = dbo.getDb();
    const results = await db.collection("testResults")
      .find({})
      .limit(10)
      .toArray();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use(cors());
app.use(express.json());

// Start server
app.listen(PORT, async () => {
  try {
    // Connect to MongoDB when server starts
    await dbo.connectToServer();
    console.log(`Server is running on port: ${PORT}`);
  } catch (err) {
    console.error("Failed to start server:", err);
  }
});

// Routes for patients
app.get('/api/patients', async (req, res) => {
  try {
    const db = dbo.getDb();
    const patients = await db.collection("patients")
      .find({})
      .limit(10)
      .toArray();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/patients', async (req, res) => {
  try {
    const db = dbo.getDb();
    const newPatient = req.body;
    const result = await db.collection("patients").insertOne(newPatient);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/patients/count", async (req, res) => {
  try {
    const db = dbo.getDb(); // Get database connection
    const count = await db.collection("patients").countDocuments({}); // Count total patients
    res.json({ totalPatients: count }); // Send response
  } catch (error) {
    console.error("Error fetching total patients count:", error);
    res.status(500).json({ error: "Failed to fetch total patients count" });
  }
});

// Routes for appointments
app.get('/api/appointments', async (req, res) => {
  try {
    const db = dbo.getDb();
    const appointments = await db.collection("appointments")
      .find({})
      .limit(10)
      .toArray();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/appointments', async (req, res) => {
  try {
    const db = dbo.getDb();
    const newAppointment = req.body;
    const result = await db.collection("appointments").insertOne(newAppointment);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Routes for emergency alerts
app.get('/api/emergencyAlerts', async (req, res) => {
  try {
    const db = dbo.getDb();
    const alerts = await db.collection("emergencyAlerts")
      .find({})
      .limit(10)
      .toArray();
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/appointments/today", async (req, res) => {
  try {
    const today = dayjs().startOf("day").toDate();
    const tomorrow = dayjs().add(1, "day").startOf("day").toDate();

    const todayAppointments = await Patient.find({
      appointmentDate: { $gte: today, $lt: tomorrow },
    }).select("name age gender condition medications allergies reason time");

    res.json({ todayAppointments });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch today's appointments" });
  }
});

// Routes for test results
app.get('/api/testResults', async (req, res) => {
  try {
    const db = dbo.getDb();
    const results = await db.collection("testResults")
      .find({})
      .limit(10)
      .toArray();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
