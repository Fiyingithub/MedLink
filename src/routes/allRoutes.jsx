import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../utilities/Notification/auth";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
