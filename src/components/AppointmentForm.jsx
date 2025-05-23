import { useState, useEffect } from 'react';
import API from '../api/API';
// import API from '../api/Axios';

const AppointmentForm = ({ onClose }) => {
  const [symptoms, setSymptoms] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [message, setMessage] = useState('');
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await API.get('/user/doctors');
        setDoctors(res.data.doctors || []);
      } catch (err) {
        console.error('Failed to fetch doctors:', err.response?.data || err.message);
        setError('Unable to load doctors.');
      } finally {
        setLoadingDoctors(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post('/appointments/book', {
        doctorId,
        symptoms,
        preferredDate,
      });

      console.log("Booking success:", response.data);
      setMessage('Appointment booked successfully!');

      // Safe call
      if (typeof onClose === 'function') {
        onClose();
      }
    } catch (err) {
      console.error('Booking error:', err.response?.data || err.message);
      setMessage('Error booking appointment. Please login again or try later.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          className="absolute top-2 right-4 text-xl"
          onClick={() => {
            if (typeof onClose === 'function') onClose();
          }}
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4 text-[#00418C]">Book Appointment</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {message && <p className="text-green-600 mb-2">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {loadingDoctors ? (
            <p>Loading doctors...</p>
          ) : (
            <select
              value={doctorId}
              onChange={e => setDoctorId(e.target.value)}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Doctor</option>
              {doctors.map(doc => (
                <option key={doc._id} value={doc._id}>
                  Dr. {doc.firstName} {doc.lastName} - {doc.specialization}
                </option>
              ))}
            </select>
          )}

          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Describe your symptoms"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="date"
            value={preferredDate}
            onChange={(e) => setPreferredDate(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
