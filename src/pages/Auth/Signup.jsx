import { useContext, useState } from "react";
import { UserRound, Stethoscope, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import assets from "../../assets/images/assets";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { AppContext } from "../../context/AppContext";
import API from "../../api/API";

const Signup = () => {
  const navigate = useNavigate();
  const { showNotification, showOverlay, hideOverlay } = useContext(AppContext);
  const [userType, setUserType] = useState("patient");
  const [isLoading, setIsLoading] = useState(false);
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

  const isCommonFieldsValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.termsAgreed &&
    formData.password === formData.confirmPassword;

  let isFormValid = false;

  if (userType === "patient") {
    isFormValid =
      isCommonFieldsValid && formData.bloodType && formData.dateOfBirth;
  } else if (userType === "doctor") {
    isFormValid =
      isCommonFieldsValid &&
      formData.specialization &&
      formData.licenseNumber &&
      formData.yearsOfExperience &&
      formData.hospital;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAgreed) {
      showNotification("You must agree to the terms and conditions.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showNotification("Passwords do not match.");
      return;
    }
    showOverlay();
    setIsLoading(true);

    try {
      const data = new FormData();

      // Universal required fields
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
      } else if (userType === "doctor") {
        data.append("specialization", formData.specialization);
        data.append("licenseNumber", formData.licenseNumber);
        data.append("yearsOfExperience", formData.yearsOfExperience.toString());
        data.append("hospital", formData.hospital);
      }

      if (image) {
        data.append("image", image);
      }

      const response = await API.post("/user/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        showNotification("Registration successful!");
        // console.log("Server response:", response.data);
        setFormData({
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
        navigate("/login");
      } else {
        showNotification(response.data.message || "Something went wrong.");
        setFormData({
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
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup error:", error);
      showNotification(
        error.response?.data?.message ||
          "Network error. Please try again later."
      );
    } finally {
      hideOverlay();
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full bg-blue overflow-hidden font-sans">
      <Header />
      <main className="relative z-20 flex flex-col justify-center h-full">
        <div className="lg:flex mb-20 lg:mb-0 h-[100%]">
          <div className="hidden lg:block lg:w-[50%]">
            <img
              src={
                userType === "patient"
                  ? assets.PatientSignUpImage
                  : assets.SignupImage
              }
              alt="Doctors"
              className="w-full h-full object-cover transition-all duration-500 ease-in-out transform "
              loading="lazy"
            />
          </div>
          {/* Content */}
          <div className="w-full lg:w-[50%] bg-white p-4 lg:px-20 ">
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
                  { label: "First Name", name: "firstName", required: true },
                  { label: "Last Name", name: "lastName", required: true },
                  {
                    label: "Email Address",
                    name: "email",
                    type: "email",
                    colSpan: 2,
                    required: true,
                  },
                  {
                    label: "Password",
                    name: "password",
                    type: "password",
                    required: true,
                  },
                  {
                    label: "Confirm Password",
                    name: "confirmPassword",
                    type: "password",
                    required: true,
                  },
                ].map((field) => (
                  <div
                    key={field.name}
                    className={field.colSpan === 2 ? "md:col-span-2" : ""}
                  >
                    <label className="block text-[15px] font-medium text-gray-700 mb-1">
                      {field.label}{" "}
                      {field.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    <input
                      type={field.type || "text"}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={`Enter ${field.label}`}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-[#00418C] focus:outline-none"
                      required={field.required}
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
                        Date of Birth <span className="text-red-500">*</span>
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
                        Blood Type <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="bloodType"
                          value={formData.bloodType}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded-md appearance-none"
                          required
                        >
                          <option value="">Select</option>
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
                      {
                        label: "Medical License Number",
                        name: "licenseNumber",
                        required: true,
                      },
                      {
                        label: "Years of Experience",
                        name: "yearsOfExperience",
                        type: "number",
                        required: true,
                      },
                      {
                        label: "Hospital/Clinic",
                        name: "hospital",
                        required: true,
                      },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block text-[15px] font-medium text-gray-700 mb-1">
                          {field.label}{" "}
                          {field.required && (
                            <span className="text-red-500">*</span>
                          )}
                        </label>
                        <input
                          type={field.type || "text"}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          placeholder={`Enter ${field.label}`}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required={field.required}
                        />
                      </div>
                    ))}

                    <div>
                      <label className="block text-[15px] font-medium text-gray-700 mb-1">
                        Specialization <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="specialization"
                          value={formData.specialization}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded-md appearance-none"
                          required
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
                  required
                />
                <label className="ml-2 text-[16px] text-gray-700">
                  I agree to the{" "}
                  <a href="#" className="text-[#00418C] font-medium underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#00418C] font-medium underline">
                    Privacy Policy
                  </a>{" "}
                  <span className="text-red-500">*</span>
                </label>
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
                {isLoading ? "Submitting..." : "Signup"}
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;
