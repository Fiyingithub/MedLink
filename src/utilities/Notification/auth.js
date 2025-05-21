import { jwtDecode } from "jwt-decode"; // <-- Corrected import

// Check if token is expired
export function isTokenExpired(token) {
  try {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000; // convert to ms
  } catch (error) {
    return true; // If decode fails, treat token as invalid
  }
}
