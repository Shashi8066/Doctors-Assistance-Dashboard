require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dayjs = require("dayjs");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Define Patient Schema & Model
const PatientSchema = new mongoose.Schema(
  {
    name: String,
    age: { type: Number, required: true },
    age: { type: Number, required: true },
    age: { type: Number, required: true },
    appointmentDate: Date,
    time: String,
    duration: String,
    status: String,
    reason: String,
  },
  { strict: false }
);
const Patient = mongoose.model("Patient", PatientSchema);

// API Route to Get Total Patient Count
app.get("/api/patients/count", async (req, res) => {
  try {
    const count = await Patient.countDocuments();
    res.json({ totalPatients: count });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch patient count" });
  }
});

// API Route to Get Today's Appointments
app.get("/api/appointments/today", async (req, res) => {
  try {
    const today = dayjs().startOf("day").toDate();
    const tomorrow = dayjs().add(1, "day").startOf("day").toDate();

    const appointments = await Patient.find(
      { appointmentDate: { $gte: today, $lt: tomorrow } },
      { _id: 1, name: 1, time: 1, duration: 1, status: 1, reason: 1 }
    );

    const formattedAppointments = appointments.map((appt) => ({
      id: appt._id.toString(),
      patientName: appt.name,
      patientInitials: appt.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
      time: appt.time,
      duration: appt.duration || "30 min",
      status: appt.status || "upcoming",
      reason: appt.reason || "General checkup",
    }));

    res.json({
      totalAppointments: formattedAppointments.length,
      todayAppointments: formattedAppointments,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch today's appointments" });
  }
});

// Root Route
app.get("/", (req, res) => {
  res.send("Server is running!");
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


// ✅ API to Fetch Patient by Name
app.get("/patients/name/:name", async (req, res) => {
  try {
    const patient = await Patient.findOne({ name: req.params.name });
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: "Error fetching patient data" });
  }
});

// ✅ API to Add New Patient
app.post("/patients", async (req, res) => {
  try {
    const { name, age, gender, history, conditions, medications, testResults } = req.body;

    // Validate required fields
    if (!name || !age || !gender) {
      return res.status(400).json({ error: "Name, age, and gender are required fields." });
    }

    // Create new patient entry
    const newPatient = new Patient({
      name,
      age,
      gender,
      history,
      conditions,
      medications,
      testResults,
    });

    await newPatient.save();
    res.json({ message: "✅ Patient added successfully!", patient: newPatient });
  } catch (error) {
    console.error("❌ Error adding patient:", error);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});


// Define Doctor Schema
const DoctorSchema = new mongoose.Schema({
  username: String,
  pass: String,
  name: String,
  specialization: String
});

const Doctor = mongoose.model("Doctor", DoctorSchema);

// API Route for Login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
      // Check if doctor exists in the database
      const doctor = await Doctor.findOne({ username });
      if (!doctor) return res.status(401).json({ error: "Invalid username or password" });

      // Check if the password matches (assuming plain text for now)
      if (doctor.pass !== password) {
          return res.status(401).json({ error: "Invalid username or password" });
      }

      // Send doctor details as response
      res.json({ name: doctor.name, username: doctor.username });
  } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

// API Route to Get Logged-in Doctor's Info
app.get("/api/doctor/:username", async (req, res) => {
  try {
      const doctor = await Doctor.findOne({ username: req.params.username });
      if (!doctor) return res.status(404).json({ error: "Doctor not found" });

      res.json({ name: doctor.name, specialization: doctor.specialization });
  } catch (error) {
      res.status(500).json({ error: "Failed to fetch doctor details" });
  }
});


// Start Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));