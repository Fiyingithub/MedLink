import React, { useState } from "react";
import { Check, UserRound, Stethoscope, ChevronDown } from "lucide-react";
import Logo from "../../assets/images/assets";
import { Link } from "react-router-dom";

const Signup = () => {
  const [userType, setUserType] = useState("patient");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    bloodType: "",
    allergies: "",
    specialization: "",
    licenseNumber: "",
    yearsOfExperience: "",
    hospital: "",
    termsAgreed: false,
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
    if (!formData.termsAgreed) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    alert(
      `${
        userType.charAt(0).toUpperCase() + userType.slice(1)
      } registration submitted!`
    );
    console.log(formData);
  };

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
        <h1 className="text-2xl font-bold text-center mb-8 text-[#00418C]">
          Create a MedLink Account
        </h1>

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Common Fields */}
          {[
            { label: "First Name", name: "firstName" },
            { label: "Last Name", name: "lastName" },
            {
              label: "Email Address",
              name: "email",
              type: "email",
              colSpan: 2,
            },
            { label: "Password", name: "password", type: "password" },
            {
              label: "Confirm Password",
              name: "confirmPassword",
              type: "password",
            },
          ].map((field) => (
            <div
              key={field.name}
              className={field.colSpan === 2 ? "md:col-span-2" : ""}
            >
              <label className="block text-[15px] font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={`Enter ${field.name}`}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-[#00418C] focus:outline-none"
              />
            </div>
          ))}

          {/* Conditional Fields */}
          {userType === "patient" && (
            <>
              <div>
                <label className="block text-[15px] font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-[#00418C] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[15px] font-medium text-gray-700 mb-1">
                  Blood Type
                </label>
                <div className="relative">
                  <select
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring focus:ring-[#00418C] focus:outline-none"
                  >
                    <option value="">Select</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                      (type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      )
                    )}
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-3 text-gray-500"
                    size={16}
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-[15px] font-medium text-gray-700 mb-1">
                  Allergies (if any)
                </label>
                <textarea
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  className="w-full p-2 text-[16px] border border-gray-300 resize-none rounded-md focus:ring focus:ring-[#00418C] focus:outline-none h-20"
                  placeholder="List any allergies you have..."
                />
              </div>
            </>
          )}

          {userType === "doctor" && (
            <>
              {[
                { label: "Medical License Number", name: "licenseNumber" },
                {
                  label: "Years of Experience",
                  name: "yearsOfExperience",
                  type: "number",
                },
                { label: "Hospital/Clinic", name: "hospital" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-[15px] font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={`Enter ${field.name}`}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-[#00418C] focus:outline-none"
                  />
                </div>
              ))}

              <div>
                <label className="block text-[15px] font-medium text-gray-700 mb-1">
                  Specialization
                </label>
                <div className="relative">
                  <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring focus:ring-[#00418C] focus:outline-none"
                  >
                    <option value="">Select</option>
                    {[
                      "Cardiology",
                      "Dermatology",
                      "Neurology",
                      "Orthopedics",
                      "Pediatrics",
                      "Psychiatry",
                      "Oncology",
                      "General Practice",
                    ].map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-3 text-gray-500"
                    size={16}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Terms Agreement */}
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            name="termsAgreed"
            checked={formData.termsAgreed}
            onChange={handleChange}
            className="h-4 w-4 text-[#00418C] border-gray-300 rounded"
          />
          <label className="ml-2 text-[16px] text-gray-700">
            I agree to the{" "}
            <a href="#" className="text-[#00418C] font-medium underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#00418C] font-medium underline">
              Privacy Policy
            </a>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#00418C] text-white py-3 rounded-md hover:bg-[#00418C]/90 transition"
        >
          Sign Up
        </button>

        <div className="text-center text-[18px] mt-4 text-gray-600">
          Already have an account?{" "}
          <Link
            to={"/login"}
            href="#"
            className="text-[#00418C] font-medium mt-8 hover:underline"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
