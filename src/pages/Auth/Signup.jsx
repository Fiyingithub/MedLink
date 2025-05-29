import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Check, UserRound, Stethoscope, ChevronDown } from "lucide-react";
import assets from "../../assets/images/assets";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { AppContext } from "../../context/AppContext";
import API from "../../api/Axios";
import imageCompression from "browser-image-compression";

const Signup = () => {
  const { showNotification } = useContext(AppContext);
  const [userType, setUserType] = useState("patient");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAgreed) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append("role", userType); // backend expects 'role'
    data.append("firstName", formData.firstName.trim());
    data.append("lastName", formData.lastName.trim());
    data.append("email", formData.email.trim());
    data.append("password", formData.password);
    data.append("confirmPassword", formData.confirmPassword);

    if (userType === "patient") {
      data.append("dateOfBirth", formData.dateOfBirth);
      data.append("bloodType", formData.bloodType);
      data.append("allergies", formData.allergies);
    } else if (userType === "doctor") {
      data.append("specialization", formData.specialization);
      data.append("licenseNumber", formData.licenseNumber);
      data.append("yearsOfExperience", formData.yearsOfExperience || "0");
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
          setLoading(false);
          return;
        }

        data.append("image", compressedFile, compressedFile.name);
      }

      const response = await API.post("/user/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 20000,
      });

      if (response.status === 201 || response.status === 200) {
        showNotification("Registration successful!", "success");

        const { token, user } = response.data;

        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
        }

        if (user.role === "doctor") {
          navigate("/doctor-dashboard");
        } else if (user.role === "patient") {
          navigate("/patient-dashboard");
        } else {
          navigate("/login");
        }
      } else {
        alert(response.data.message || "Something went wrong during signup.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      const message =
        error?.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      alert(`Signup failed: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full bg-blue overflow-hidden font-sans min-h-screen flex flex-col">
      <Header />
      <main className="relative z-20 flex flex-col justify-center flex-grow">
        <div className="lg:flex mb-20 lg:mb-0 h-full">
          <div className="hidden lg:block lg:w-1/2">
            <img
              src={
                userType === "patient"
                  ? assets.PatientSignUpImage
                  : assets.SignupImage
              }
              alt="Sign Up"
              className="w-full h-full object-cover transition-all duration-500 ease-in-out transform"
              loading="lazy"
            />
          </div>

          <div className="w-full lg:w-1/2 bg-white p-4 lg:px-20">
            <form onSubmit={handleSubmit}>
              <h1 className="text-2xl font-bold text-center mb-8 text-[#00418C]">
                Create a MedLink Account
              </h1>

              {/* User Type Toggle */}
              <div className="flex justify-center mb-8">
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  {["patient", "doctor"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setUserType(type)}
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

              {/* Common Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {[
                  { label: "First Name", name: "firstName" },
                  { label: "Last Name", name: "lastName" },
                  { label: "Email Address", name: "email", type: "email", colSpan: 2 },
                  { label: "Password", name: "password", type: "password" },
                  { label: "Confirm Password", name: "confirmPassword", type: "password" },
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
                      placeholder={`Enter ${field.label}`}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-[#00418C] focus:outline-none"
                      required
                      autoComplete={field.name === "email" ? "email" : "off"}
                    />
                  </div>
                ))}

                {/* Profile Image Upload */}
                <div className="md:col-span-2">
                  <label className="block text-[15px] font-medium text-gray-700 mb-1">
                    Upload Profile Image
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={handleImageChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                {/* Patient Specific Fields */}
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
                        required
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
                          required
                          className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring focus:ring-[#00418C]"
                        >
                          <option value="">Select Blood Type</option>
                          {[
                            "A+",
                            "A-",
                            "B+",
                            "B-",
                            "AB+",
                            "AB-",
                            "O+",
                            "O-",
                          ].map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={20}
                          className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none text-gray-500"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[15px] font-medium text-gray-700 mb-1">
                        Allergies (optional)
                      </label>
                      <input
                        type="text"
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleChange}
                        placeholder="List any allergies"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </>
                )}

                {/* Doctor Specific Fields */}
                {userType === "doctor" && (
                  <>
                    <div>
                      <label className="block text-[15px] font-medium text-gray-700 mb-1">
                        Specialization
                      </label>
                      <input
                        type="text"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        placeholder="Your specialization"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[15px] font-medium text-gray-700 mb-1">
                        License Number
                      </label>
                      <input
                        type="text"
                        name="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                        placeholder="Your license number"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[15px] font-medium text-gray-700 mb-1">
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        name="yearsOfExperience"
                        value={formData.yearsOfExperience}
                        onChange={handleChange}
                        placeholder="Years of experience"
                        min={0}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-[15px] font-medium text-gray-700 mb-1">
                        Hospital
                      </label>
                      <input
                        type="text"
                        name="hospital"
                        value={formData.hospital}
                        onChange={handleChange}
                        placeholder="Your hospital"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="mb-6 flex items-center gap-2">
                <input
                  type="checkbox"
                  name="termsAgreed"
                  id="termsAgreed"
                  checked={formData.termsAgreed}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="termsAgreed" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link
                    to="/terms-and-conditions"
                    className="text-[#00418C] underline"
                  >
                    Terms and Conditions
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 text-white font-semibold rounded-md ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#00418C]"
                }`}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>

              <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-[#00418C] underline">
                  Log In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;
