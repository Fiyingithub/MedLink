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
import DoctorDashboard from "./pages/DoctorDashboard.jsx";
import PrivateRoute from "./routes/allRoutes.jsx";
import ChatRoom from "./pages/ChatRoom.jsx";
import { UserProvider } from './context/UserContext';

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
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/book-appointment" element={<AppointmentForm />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/dashboard" element={<PrivateRoute><DoctorDashboard /></PrivateRoute>} />
        <Route path="/chat/:recipientId" element={<PrivateRoute><ChatRoom /></PrivateRoute>} />
      </Routes>
    </UserProvider>
  );
};

export default App;