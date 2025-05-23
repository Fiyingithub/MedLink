import { useState } from "react";
import API from "../../api/API"; // Adjust path if needed
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import assets from "../../assets/images/assets";

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
      const response = await API.post("/resetPassword/forgot-password", {
        email,
      });
      setMessage(response.data.message || "Reset link sent to your email.");
    } catch (err) {
      setError(err.response?.data?.error || "Error sending reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full bg-blue overflow-hidden font-sans">
      <div className="absolute inset-0 bg-white bg-opacity-30 z-10 mix-blend-overlay" />
      <Header />
      <main className="relative z-20 flex flex-col justify-center h-full">
        <div className="lg:flex h-[500px] lg:h-screen">
          <div className="hidden lg:block lg:w-[50%]">
            <img
              src={assets.ResetPasswordmage}
              alt="Doctors"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Content */}
          <div className="w-full lg:w-[50%] my-20 bg-white p-4 lg:px-20 ">
            <h2 className="text-2xl font-bold text-center mb-2 text-[#00418C]">
              Forgot Password
            </h2>
            <p className="text-center mb-8 text-[#00418C]">
              Enter your registered email address below, and we’ll send you a
              link to reset your password.
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
        <Footer />
      </main>
    </div>
  );
};

export default ForgotPassword;