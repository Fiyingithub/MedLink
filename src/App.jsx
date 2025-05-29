import { Route, Routes } from "react-router-dom";
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from './utilities/Notification/auth';
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import AppointmentForm from "./components/AppointmentForm.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import ResetPassword from "./pages/Auth/ResetPassword.jsx";
import PrivateRoute from "./routes/allRoutes.jsx";
import ChatRoom from "./pages/ChatRoom.jsx";
import { UserProvider } from './context/UserContext';
import DoctorDashboard from "./pages/Doctor/DoctorDashboard.jsx";
import AppointmentPage from "./components/Doctor/Apointment/AppointmentPage.jsx";
import PatientDashboard from "./pages/Patient/PatientDashboard.jsx";
import Appointment from "./components/Patient/Appointment/Appointment.jsx";

import DoctorProfile from "./components/HomePage/DoctorProfile.jsx";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token && isTokenExpired(token)) {
      console.warn("Token expired. logging out.");
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />

        {/* Authentication Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/book-appointment" element={<AppointmentForm />} />

        {/* Doctor Routes */}
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/appointments" element={<AppointmentPage />} />
        <Route path="/dashboard" element={<PrivateRoute><DoctorDashboard /></PrivateRoute>} />
        <Route path="/chat/:recipientId" element={<PrivateRoute><ChatRoom /></PrivateRoute>} />
        <Route path="/doctor/:doctorId" element={<DoctorProfile />} />
        {/* Patient Routes */}
        <Route path="/patient-dashboard" element={<PatientDashboard/>} />
        <Route path="/patient/appointments" element={<Appointment />} />
      </Routes>
    </UserProvider>
  );
};

export default App;