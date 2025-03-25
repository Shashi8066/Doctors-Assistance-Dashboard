import React, { useEffect } from "react";
import { Calendar, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/dashboard/Header";
import MetricCard from "@/components/dashboard/MetricCard";
import AppointmentList from "@/components/dashboard/AppointmentList";
import PatientSearch from "@/components/dashboard/PatientSearch";
import { getTotalPatients, getTodayAppointments } from "@/services/api";
import { toast } from "sonner";

const Index = () => {
  // Fetch total number of patients
  const {
    data: totalPatientsData,
    isLoading: totalPatientsLoading,
    error: totalPatientsError,
  } = useQuery({
    queryKey: ["totalPatients"],
    queryFn: getTotalPatients,
    retry: 1,
  });

  // Fetch today's appointments
  const {
    data: todayAppointmentsData,
    isLoading: todayAppointmentsLoading,
    error: todayAppointmentsError,
  } = useQuery({
    queryKey: ["todayAppointments"],
    queryFn: getTodayAppointments,
    retry: 1,
  });

  useEffect(() => {
    if (totalPatientsError) toast.error("Failed to load total patients count");
    if (todayAppointmentsError) toast.error("Failed to load today's appointments");
  }, [totalPatientsError, todayAppointmentsError]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center dark:bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-6">Doctor's Dashboard</h1>

        {/* Dashboard Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          <MetricCard 
            title="Total Patients" 
            value={totalPatientsData?.totalPatients || "Loading..."} 
            change={{ value: '12%', positive: true }} 
            icon={Users} 
            color="primary" 
            loading={totalPatientsLoading}
          />
          <MetricCard 
            title="Today's Appointments" 
            value={todayAppointmentsData?.totalAppointments || "Loading..."} 
            change={{ value: todayAppointmentsData?.totalAppointments || 0, positive: true }} 
            icon={Calendar} 
            color="secondary" 
            loading={todayAppointmentsLoading}
          />
        </div>

        {/* Today's Appointments Section */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-medical-primary" />
            Today's Appointments
          </h2>

          {todayAppointmentsLoading ? (
            <p>Loading...</p>
          ) : todayAppointmentsData?.todayAppointments.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {todayAppointmentsData.todayAppointments.map((appt) => (
                <li key={appt.id} className="py-4 flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    {/* Patient Initials Avatar */}
                    <div className="bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center text-lg font-bold">
                      {appt.patientInitials}
                    </div>
                    {/* Patient Details */}
                    <div>
                      <p className="text-md font-semibold">{appt.patientName}</p>
                      <p className="text-sm text-gray-500">{appt.reason}</p>
                    </div>
                  </div>
                  {/* Appointment Details */}
                  <div className="text-right">
                    <p className="font-semibold">{appt.time}</p>
                    <p className="text-sm text-gray-500">{appt.duration}</p>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-md ${
                        appt.status === "completed"
                          ? "bg-green-200 text-green-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No appointments for today.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Index;