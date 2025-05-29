import React, { useEffect, useState } from 'react';
import API from '../api/Axios';
import SearchDoctors from '../pages/SearchDoctors';
import ChatRoom from '../pages/ChatRoom';

const PatientDashboard = () => {
  const [patientData, setPatientData] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [profileRes, appointmentsRes] = await Promise.all([
          API.get('/user/patient/profile'),
          API.get('/appointments/history')
        ]);

        setPatientData(profileRes.data);
        setAppointments(appointmentsRes.data);
      } catch (err) {
        console.error('Error loading dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading || !patientData) return <div>Loading patient dashboard...</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">
        Welcome, {patientData.firstName} {patientData.lastName}
      </h1>
      <img
        src={patientData.image || "/default-avatar.png"}
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover mb-4"
      />

      {/* Vitals Section */}
      <div className="bg-gray-100 p-4 rounded mb-4 shadow">
        <h2 className="text-xl font-semibold mb-2">Your Vitals</h2>
        {patientData.vitals ? (
          <ul>
            <li>Blood Pressure: {patientData.vitals.bloodPressure}</li>
            <li>Heart Rate: {patientData.vitals.heartRate}</li>
            <li>Temperature: {patientData.vitals.temperature} °C</li>
            <li>Oxygen Saturation: {patientData.vitals.oxygenSaturation}%</li>
          </ul>
        ) : (
          <p>No vitals recorded yet.</p>
        )}
      </div>

      {/* Search Doctor */}
      <div className="mb-6">
        <SearchDoctors />
      </div>

      {/* Appointment History */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-xl font-semibold mb-2">Appointment History</h2>
        {appointments.length > 0 ? (
          <ul className="list-disc list-inside">
            {appointments.map((appt) => (
              <li key={appt._id}>
                <strong>{new Date(appt.date).toLocaleString()}</strong> with{" "}
                <strong>{appt.doctorName}</strong> ({appt.specialization})<br />
                Status: <em>{appt.status}</em>
              </li>
            ))}
          </ul>
        ) : (
          <p>No past appointments.</p>
        )}
      </div>

      {/* Chat Room */}
      <div className="mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setShowChat(!showChat)}
        >
          {showChat ? 'Close Consultation Chat' : 'Open Consultation Chat'}
        </button>
        {showChat && <ChatRoom userRole="patient" />}
      </div>
    </div>
  );
};

export default PatientDashboard;
