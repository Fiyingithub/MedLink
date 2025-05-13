import React, { useState } from "react";
import { UserRound, Stethoscope, LogIn, Lock } from "lucide-react";
import Logo from "../../assets/images/assets";
import { Link } from "react-router-dom";

const Login = () => {
  const [userType, setUserType] = useState("patient");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `${userType.charAt(0).toUpperCase() + userType.slice(1)} login attempted!`
    );
    console.log(formData);
  };

  const loginParagraph =
    userType === "patient"
      ? "Access your personalized patient portal to view medical records, upcoming appointments, and test results. "
      : "Log in to your doctor portal to securely manage patient records, monitor treatment progress, and coordinate with your clinical team.";

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      {/* Dark overlay */}
      <div className="hidden lg:block absolute inset-0 bg-black opacity-10 z-10" />

      {/* Content */}
      <form
        onSubmit={handleSubmit}
        className="relative z-50 w-full max-w-xl bg-white bg-opacity-95 rounded-lg shadow-xl lg:p-8 p-4 pb-20 lg:m-4"
      >
        <div>
          <img src={Logo} alt="" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-2 text-[#00418C]">
          Login
        </h1>
        <p className="text-center mb-8 text-[#00418C]">{loginParagraph}</p>

        {/* User Type Toggle */}
        <div className="flex justify-center mb-8">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            {["patient", "doctor"].map((type) => (
              <button
                key={type}
                onClick={() => setUserType(type)}
                type="button"
                className={`flex items-center gap-2 px-6 py-3 ${
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

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Email Field */}
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
                className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring focus:ring-[#00418C] focus:outline-none"
                placeholder={`Enter Email Address`}
              />
            </div>
          </div>

          {/* Password Field */}
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
                className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring focus:ring-[#00418C] focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Remember Me and Forgot Password */}
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
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#00418C] text-white py-3 rounded-md hover:bg-[#00418C]/90 transition"
          >
            login
          </button>

          <div className="text-center text-[18px] mt-4 text-gray-600">
            Don't have an account?{" "}
            <Link
              to={"/signup"}
              href="#"
              className="text-[#00418C] font-medium mt-8 hover:underline"
            >
              Signup
            </Link>
          </div>

          {/* Portal Info (Conditional based on user type) */}
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
  );
};

export default Login;
