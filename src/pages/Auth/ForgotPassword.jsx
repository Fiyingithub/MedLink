import { useState } from "react";
import API from "../../api/Axios"; // Adjust path if needed

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      setLoading(true);
      const response = await API.post("/resetPassword/forgot-password", { email });
      setMessage(response.data.message || "Reset link sent to your email.");
    } catch (err) {
      setError(err.response?.data?.error || "Error sending reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      {/* Dark overlay */}
      <div className="hidden lg:block absolute inset-0 bg-black opacity-10 z-10" />

      {/* Content */}
      <div className="bg-white z-50 shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2 text-[#00418C]">
          Forgot Password
        </h2>
        <p className="text-center mb-8 text-[#00418C]">
          Enter your registered email address below, and we’ll send you a link
          to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring focus:ring-[#00418C] focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00418C] mt-8 text-white py-3 rounded-md hover:bg-[#00418C]/90 transition cursor-pointer"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        {message && (
          <p className="text-green-600 text-center mt-4">{message}</p>
        )}
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
