import { useState } from "react";
import API from "../api/Axios";
import AppointmentForm from "../components/AppointmentForm";

const SearchDoctors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const response = await API.post("/doctors/search", { query: searchTerm });

      if (response.data.length === 0) {
        setError("No doctors found matching that symptom or specialty.");
      } else {
        setResults(response.data);
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Error searching for doctors.");
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setShowModal(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Search Doctors by Symptom or Specialty
      </h2>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="e.g., fever, cardiology"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {results.length > 0 && (
        <ul className="space-y-4">
          {results.map((doc) => (
            <li
              key={doc._id}
              className="flex items-start gap-4 p-4 border border-gray-200 rounded shadow-sm"
            >
              <img
                src={doc.image || "/default-doctor.png"}
                alt="Doctor"
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold">
                  Dr. {doc.firstName} {doc.lastName}
                </h3>
                <p className="text-gray-600">Specialization: {doc.specialization}</p>
                <p className="text-gray-600">Email: {doc.email}</p>
                <button
                  onClick={() => handleBookClick(doc._id)}
                  className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
                >
                  Book Appointment
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <AppointmentForm
          onClose={() => {
            setShowModal(false);
            setSelectedDoctorId(null);
          }}
          prefillDoctorId={selectedDoctorId}
        />
      )}
    </div>
  );
};

export default SearchDoctors;
