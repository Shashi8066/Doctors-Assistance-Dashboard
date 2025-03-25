import React from "react";

const AppointmentList = ({ appointments }) => {
  if (!appointments.length) {
    return <p>No appointments for today.</p>;
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div key={appointment._id} className="p-4 border rounded-lg shadow">
          <h3 className="text-lg font-semibold">{appointment.patientDetails.name}</h3>
          <p>Age: {appointment.patientDetails.age}</p>
          <p>Gender: {appointment.patientDetails.gender}</p>
          <p>Reason: {appointment.reason}</p>
          <p>Time: {appointment.time}</p>
        </div>
      ))}
    </div>
  );
};

export default AppointmentList;