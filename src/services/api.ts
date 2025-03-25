
import { toast } from "sonner";

const API_BASE_URL = "http://localhost:5002/api";
export const getTotalPatients = async () => {
  const response = await fetch("http://localhost:5002/api/patients/count");
  if (!response.ok) throw new Error("Failed to fetch total patients count");
  return response.json();
};



export const getTodayAppointments = async () => {
  const response = await fetch("http://localhost:5002/api/appointments/today");
  if (!response.ok) throw new Error("Failed to fetch today's appointments");
  return response.json();
};

// Generic fetch handler with error management
async function fetchWithErrorHandling<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API error: ${response.status}`);
    }
    
    return await response.json() as T;
  } catch (error) {
    console.error("API Error:", error);
    toast.error(error instanceof Error ? error.message : "An unknown error occurred");
    throw error;
  }
}

// Patients
export async function getPatients() {
  return fetchWithErrorHandling(`${API_BASE_URL}/patients`);
}

export async function addPatient(patientData: any) {
  return fetchWithErrorHandling(`${API_BASE_URL}/patients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patientData),
  });
}

// Appointments
export async function getAppointments() {
  return fetchWithErrorHandling(`${API_BASE_URL}/appointments`);
}

export async function addAppointment(appointmentData: any) {
  return fetchWithErrorHandling(`${API_BASE_URL}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointmentData),
  });
}

// Emergency Alerts
export async function getEmergencyAlerts() {
  return fetchWithErrorHandling(`${API_BASE_URL}/emergencyAlerts`);
}

// Test Results
export async function getTestResults() {
  return fetchWithErrorHandling(`${API_BASE_URL}/testResults`);
}
