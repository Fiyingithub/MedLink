import { useContext, useState } from "react";
import { UserRound, Stethoscope, LogIn, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/API";
import assets from "../../assets/images/assets";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { AppContext } from "../../context/AppContext";

const Login = () => {
  const { showNotification } = useContext(AppContext);
  const [userType, setUserType] = useState("patient");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const isFormValid = formData.email && formData.password && formData.rememberMe

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await API.post("/user/login", {
        ...formData,
        role: userType,
      });

      
      

      // Redirect based on role
      if (userType === "patient") {
        showNotification("Login successful!", "success");
        localStorage.setItem("userData", JSON.stringify(res.data));
        navigate("/patient-dashboard");
      } else {
        showNotification("Login successful!", "success");
        localStorage.setItem("DoctorData", JSON.stringify(res.data));
        navigate("/doctor-dashboard");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || "Login failed. Please try again.";
      setErrorMsg(msg);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const loginParagraph =
    userType === "patient"
      ? "Access your personalized patient portal to view medical records, upcoming appointments, and test results. "
      : "Login to your portal to manage patients records and treatment.";

  return (
    <div className="relative w-full bg-blue overflow-hidden font-sans">
      <Header />
      <main className="relative z-20 flex flex-col justify-center h-full">
        <div className="lg:flex h-[500px] lg:h-[100%]">
          <div className="hidden lg:block lg:w-[50%]">
            <img
              src={
                userType === "patient"
                  ? assets.PatientSignUpImage
                  : assets.LoginImage
              }
              alt="Doctors"
              className="w-full h-full object-cover transition-all duration-500 ease-in-out transform "
              loading="lazy"
            />
          </div>
          {/* Content */}
          <div className="w-full lg:w-[50%] bg-white p-4 lg:px-20 ">
            <form onSubmit={handleSubmit}>
              <h1 className="text-2xl font-bold text-center mb-2 text-[#00418C]">
                Login
              </h1>
              <p className="text-center mb-8 text-[#00418C]">
                {loginParagraph}
              </p>

              {/* User Type Toggle */}
              <div className="flex justify-center mb-8">
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  {["patient", "doctor"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setUserType(type)}
                      type="button"
                      className={`flex items-center gap-2 px-6 py-3 cursor-pointer ${
                        userType === type
                          ? "bg-[#00418C] text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {type === "patient" ? (
                        <UserRound size={18} />
                      ) : (
                        <Stethoscope size={18} />
                      )}
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="text-red-600 text-sm text-center mb-4">
                  {errorMsg}
                </div>
              )}

              {/* Form Fields */}
              <div className="space-y-6">
                <div>
                  <label
                    className="block text-[15px] font-medium text-gray-700 mb-1"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserRound size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring focus:ring-[#00418C] focus:outline-none"
                      placeholder="Enter Email Address"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-[15px] font-medium text-gray-700 mb-1"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring focus:ring-[#00418C] focus:outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-[#00418C] border-gray-300 rounded"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    to={"/forgot-password"}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 rounded-md transition text-white ${
                    !isFormValid
                      ? "opacity-50 bg-gray-600 cursor-not-allowed"
                      : "bg-[#00418C] hover:bg-[#00418C]/90"
                  }`}
                  disabled={!isFormValid}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

                <div className="text-center text-[18px] mt-4 text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to={"/signup"}
                    className="text-[#00418C] font-medium hover:underline"
                  >
                    Signup
                  </Link>
                </div>

                <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-md">
                  <h3 className="text-sm font-medium text-blue-800">
                    {userType === "patient"
                      ? "Patient Portal Benefits:"
                      : "Doctor Portal Benefits:"}
                  </h3>
                  <ul className="mt-2 text-xs text-blue-700 list-disc pl-4 space-y-1">
                    {userType === "patient" ? (
                      <>
                        <li>View your medical records and test results</li>
                        <li>Schedule appointments with your doctors</li>
                        <li>Request prescription refills</li>
                        <li>Message your healthcare team</li>
                      </>
                    ) : (
                      <>
                        <li>Access patient records securely</li>
                        <li>Manage your appointment schedule</li>
                        <li>Collaborate with other healthcare providers</li>
                        <li>Submit insurance claims and billing</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
