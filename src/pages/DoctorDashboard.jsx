import { useEffect, useState } from 'react';
import API from '../api/Axios';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [responseMessage, setResponseMessage] = useState('');
  const [vitalsInput, setVitalsInput] = useState({}); // patientId -> vitals

  const fetchAppointments = async () => {
    try {
      const res = await API.get('/appointments/doctor');
      setAppointments(res.data.appointments);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = async (id, status) => {
    try {
      await API.put(`/appointments/respond/${id}`, {
        status,
        responseMessage,
      });
      setResponseMessage('');
      fetchAppointments(); // Refresh list
    } catch (err) {
      console.error(err);
    }
  };

  const handleVitalsChange = (patientId, field, value) => {
    setVitalsInput((prev) => ({
      ...prev,
      [patientId]: {
        ...prev[patientId],
        [field]: value,
      },
    }));
  };

  const handleVitalsSubmit = async (patientId) => {
    try {
      const vitals = vitalsInput[patientId];
      if (!vitals) return;

      await API.patch(`/patients/${patientId}/vitals`, vitals);
      alert('Vitals updated successfully!');
    } catch (err) {
      console.error('Vitals update failed', err);
      alert('Failed to update vitals.');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <p className="text-center py-10">Loading appointments...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Doctor Dashboard</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt) => {
            const patientId = appt.patient._id;
            const vitals = vitalsInput[patientId] || {};

            return (
              <div key={appt._id} className="border p-4 rounded-md shadow">
                <p><strong>Patient:</strong> {appt.patient.firstName} {appt.patient.lastName}</p>
                <p><strong>Symptoms:</strong> {appt.symptoms}</p>
                <p><strong>Date:</strong> {new Date(appt.preferredDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> <span className="capitalize">{appt.status}</span></p>

                {appt.status === 'pending' && (
                  <div className="mt-3">
                    <input
                      type="text"
                      placeholder="Add a message"
                      value={responseMessage}
                      onChange={(e) => setResponseMessage(e.target.value)}
                      className="border p-2 rounded w-full mb-2"
                    />
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleResponse(appt._id, 'approved')}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleResponse(appt._id, 'rejected')}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                )}

                {appt.status === 'approved' && (
                  <div className="mt-3 space-y-3">
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                      onClick={() => {
                        window.location.href = `/chat/${appt.patient._id}`;
                      }}
                    >
                      Start Chat
                    </button>

                    <div className="mt-4 border-t pt-4">
                      <h4 className="font-semibold mb-2">Enter Patient Vitals:</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Blood Pressure"
                          value={vitals.bloodPressure || ''}
                          onChange={(e) => handleVitalsChange(patientId, 'bloodPressure', e.target.value)}
                          className="border p-2 rounded"
                        />
                        <input
                          type="number"
                          placeholder="Heart Rate"
                          value={vitals.heartRate || ''}
                          onChange={(e) => handleVitalsChange(patientId, 'heartRate', e.target.value)}
                          className="border p-2 rounded"
                        />
                        <input
                          type="number"
                          placeholder="Temperature"
                          value={vitals.temperature || ''}
                          onChange={(e) => handleVitalsChange(patientId, 'temperature', e.target.value)}
                          className="border p-2 rounded"
                        />
                        <input
                          type="number"
                          placeholder="Oxygen Saturation"
                          value={vitals.oxygenSaturation || ''}
                          onChange={(e) => handleVitalsChange(patientId, 'oxygenSaturation', e.target.value)}
                          className="border p-2 rounded"
                        />
                      </div>
                      <button
                        onClick={() => handleVitalsSubmit(patientId)}
                        className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      >
                        Submit Vitals
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
