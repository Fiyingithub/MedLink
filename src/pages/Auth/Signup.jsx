import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, UserRound, Stethoscope, ChevronDown } from "lucide-react";
import Logo from "../../assets/images/assets";
import { Link } from "react-router-dom";
import API from "../../api/Axios";
import imageCompression from 'browser-image-compression';

const Signup = () => {
  const [userType, setUserType] = useState("patient");
  const [image, setImage] = useState(null);
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

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.termsAgreed) {
    alert("You must agree to the terms and conditions.");
    return;
  }

  const data = new FormData();
  data.append("role", userType);
  data.append("firstName", formData.firstName);
  data.append("lastName", formData.lastName);
  data.append("email", formData.email);
  data.append("password", formData.password);
  data.append("confirmPassword", formData.confirmPassword);
  data.append("dateOfBirth", formData.dateOfBirth);

  if (userType === "patient") {
    data.append("bloodType", formData.bloodType);
    data.append("allergies", formData.allergies);
  } else {
    data.append("specialization", formData.specialization);
    data.append("licenseNumber", formData.licenseNumber);
    data.append(
      "yearsOfExperience",
      String(formData.yearsOfExperience || "0")
    );
    data.append("hospital", formData.hospital);
  }

  try {
    if (image) {
      const compressedFile = await imageCompression(image, {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
        fileType: image.type,
      });

      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(compressedFile.type)) {
        alert("Only .jpg, .jpeg, .png formats are allowed.");
        return;
      }

      data.append("image", compressedFile);
    }

    const response = await API.post("/user/register", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 20000,
    });

    if (response.status === 200) {
      alert("Registration successful!");

      // ✅ Save token and user info
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }

      // ✅ Redirect based on role
      if (user.role === "doctor") {
        navigate("/doctor/dashboard");
      } else if (user.role === "patient") {
        navigate("/patient/dashboard");
      } else {
        navigate("/login"); // fallback
      }
    } else {
      console.error("Signup failed:", response.data);
      alert(response.data.message || "Something went wrong.");
    }
  } catch (error) {
    console.error("Signup error:", error);
    const message =
      error?.response?.data?.message ||
      error.message ||
      "An unexpected error occurred.";
    alert(`Signup failed: ${message}`);
  }
};

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      <div className="hidden lg:block absolute inset-0 bg-black opacity-10 z-10" />
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

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="block text-[15px] font-medium text-gray-700 mb-1">
              Upload Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Patient Specific */}
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
                  className="w-full p-2 border border-gray-300 rounded-md"
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
                    className="w-full p-2 border border-gray-300 rounded-md appearance-none"
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
                  className="w-full p-2 h-20 border border-gray-300 resize-none rounded-md"
                  placeholder="List any allergies you have..."
                />
              </div>
            </>
          )}

          {/* Doctor Specific */}
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
                    className="w-full p-2 border border-gray-300 rounded-md"
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
                    className="w-full p-2 border border-gray-300 rounded-md appearance-none"
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

        {/* Terms */}
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
            className="text-[#00418C] font-medium hover:underline"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
