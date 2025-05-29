import { useEffect, useState } from 'react';
import API from '../api/Axios';
// import API from '../api/Axios';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [responseMessage, setResponseMessage] = useState('');

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
      fetchAppointments(); // Refresh list
    } catch (err) {
      console.error(err);
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
          {appointments.map((appt) => (
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
                <div className="mt-3">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => {
                      // Navigate to chat or session
                      window.location.href = `/chat/${appt.patient._id}`;
                    }}
                  >
                    Start Chat
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
