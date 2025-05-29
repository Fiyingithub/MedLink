import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import assets from "../../assets/images/assets";

// Array of doctors (should match the one used in Doctors.jsx)
const doctors = [
  {
    name: "Dr Murphy Christian",
    specialty: "Dentist",
    image: assets.Doctor1Img,
    bio: "Dr. Murphy Christian is a highly skilled dentist with over 7 years of clinical experience, specializing in restorative and cosmetic dentistry.",
    info: {
      location: "Lagos, Nigeria",
      days: "Sunday – Monday",
      time: "1:00 pm – 3:00 pm",
      reviews: "4.8 reviews",
      experience: "7 years",
    },
    reviewsList: [
      {
        name: "Sarah Johnson",
        rating: 5,
        comment: "Excellent dentist! Very professional and made me feel comfortable throughout the procedure. Highly recommend Dr. Christian."
      },
      {
        name: "Michael Adebayo",
        rating: 4,
        comment: "Great service and clean facility. Dr. Christian explained everything clearly and the results were amazing."
      }
    ]
  },
  {
    name: "Dr Kristina Castle",
    specialty: "Surgeon",
    image: assets.Doctor2Img,
    bio: "Dr. Kristina Castle is an accomplished general surgeon with over 10 years of surgical experience. She is renowned for her precise techniques and compassionate patient care. During her tenure at Lagoon Hospital, she led multiple complex surgical procedures, maintaining a 100% recovery success rate in elective surgeries.",
    info: {
      location: "Abuja, Nigeria",
      days: "Monday – Friday",
      time: "9:00 am – 5:00 pm",
      reviews: "4.9 reviews",
      experience: "10 years",
    },
    reviewsList: [
      {
        name: "Tomisi Ayobade",
        rating: 5,
        comment: "Doctor was really calm in explaining terms i did not understand. Diagnosed and treated me well. Kudos..."
      },
      {
        name: "Ayobamdele John",
        rating: 5,
        comment: "So this kind doctor dey nigeria!! mad o... I am so using this doctor again. lol"
      }
    ]
  },
  {
    name: "Dr Triyne Kesakov",
    specialty: "Rheumatologist",
    image: assets.Doctor3Img,
    bio: "Dr. Triyne Kesakov is a specialist in rheumatology, with 8 years of experience diagnosing and treating autoimmune and musculoskeletal disorders. His expertise lies in managing conditions such as rheumatoid arthritis, lupus, and fibromyalgia. He is well known for her patient-centered care.",
    info: {
      location: "Port Harcourt, Nigeria",
      days: "Tuesday – Thursday",
      time: "10:00 am – 2:00 pm",
      reviews: "4.7 reviews",
      experience: "8 years",
    },
    reviewsList: [
      {
        name: "Grace Okafor",
        rating: 5,
        comment: "Dr. Kesakov helped me manage my arthritis so well. Very knowledgeable and caring doctor."
      },
      {
        name: "David Okonkwo",
        rating: 4,
        comment: "Professional service and great results. The treatment plan really improved my quality of life."
      }
    ]
  },
  {
    name: "Dr Jane Doe",
    specialty: "Pediatrician",
    image: assets.Doctor4Img,
    bio: "Dr. Jane Doe is a compassionate and dedicated pediatrician with over 9 years of experience in providing comprehensive healthcare to infants, children, and adolescents. Her work focuses on preventive medicine, immunization, nutrition, and early childhood development. Dr. Doe is deeply trusted by families for her empathetic approach and thorough explanations. She is a strong advocate for child health education and frequently collaborates with schools and community programs to support child wellness initiatives.",
    info: {
      location: "Ibadan, Nigeria",
      days: "Monday – Saturday",
      time: "8:00 am – 4:00 pm",
      reviews: "4.8 reviews",
      experience: "9 years",
    },
    reviewsList: [
      {
        name: "Funmi Adebola",
        rating: 5,
        comment: "Dr. Doe is amazing with children. My kids love her and she's so patient and understanding."
      },
      {
        name: "Emeka Obi",
        rating: 4,
        comment: "Great pediatrician. Very thorough examinations and excellent with explaining everything to parents."
      }
    ]
  },
  {
    name: "Dr Triyne Kesakov",
    specialty: "Rheumatologist",
    image: assets.Doctor5Img,
    bio: "Dr. Triyne Kesakov is a distinguished rheumatologist recognized for her holistic and evidence-based approach to autoimmune and inflammatory disorders. With 6 years of clinical experience, she has successfully managed complex cases involving joint degeneration and systemic inflammation. Dr. Kesakov is especially noted for integrating lifestyle and dietary interventions into her care plans. She regularly speaks at national medical conferences and contributes to continuing medical education for healthcare professionals across Nigeria.",
    info: {
      location: "Enugu, Nigeria",
      days: "Wednesday – Friday",
      time: "11:00 am – 3:00 pm",
      reviews: "4.6 reviews",
      experience: "6 years",
    },
    reviewsList: [
      {
        name: "Chidi Nwankwo",
        rating: 5,
        comment: "Excellent doctor with a holistic approach. Really helped with my joint problems."
      },
      {
        name: "Amaka Eze",
        rating: 4,
        comment: "Very knowledgeable and takes time to explain treatment options. Highly recommended."
      }
    ]
  },
  {
    name: "Dr Jane Doe",
    specialty: "Pediatrician",
    image: assets.Doctor6Img,
    bio: "Dr. Jane Doe is a veteran pediatrician with over 11 years of experience dedicated to the holistic care of children from birth through adolescence. She has a special interest in preventive care, developmental screenings, and chronic disease management. Her patient-first philosophy has earned her a loyal following among parents who appreciate her warmth, attentiveness, and clear communication. Dr. Doe actively participates in medical missions and is passionate about ensuring all children have access to quality healthcare, regardless of socioeconomic background.",
    info: {
      location: "Kano, Nigeria",
      days: "Monday – Friday",
      time: "9:00 am – 1:00 pm",
      reviews: "4.9 reviews",
      experience: "11 years",
    },
    reviewsList: [
      {
        name: "Hauwa Ibrahim",
        rating: 5,
        comment: "Dr. Doe is exceptional with children. Very caring and professional. My family trusts her completely."
      },
      {
        name: "Aliyu Mohammed",
        rating: 5,
        comment: "Outstanding pediatrician. Takes great care of our kids and always available for questions."
      }
    ]
  },
];

const DoctorProfile = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('description');
  const userData = JSON.parse(localStorage.getItem("userData"));

  const doctor = doctors[parseInt(doctorId, 10) ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBookAppointment = ()=> {
    if(!userData){
      navigate('/login')
    }else{
      navigate('/patient-dashboard')
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="relative w-full bg-blue overflow-hidden font-sans">
      <Header />
      <main className="relative z-20 flex flex-col items-center justify-center h-full px-4 py-10 bg-gray-50">
        {doctor ? (
          <div className="bg-white rounded-xl shadow-lg max-w-6xl w-full flex flex-col lg:flex-row overflow-hidden">
            {/* Left side (Image & Basic Info) */}
            <div className="lg:w-1/2 p-8 flex flex-col items-center bg-gray-50">
              <div className="relative mb-6">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                  style={{ minHeight: "350px", maxHeight: "600px" }}
                />
                <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{doctor.name}</h2>
              <p className="text-lg text-gray-600 mb-4">{doctor.specialty}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span>{doctor.info.reviews}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-1">🩺</span>
                  <span>{doctor.info.experience}</span>
                </div>
              </div>
            </div>

            {/* Right side (Tabs & Content) */}
            <div className="lg:w-1/2 p-8">
              {/* Tab Navigation */}
              <div className="flex mb-6">
                <button
                  className={`px-6 py-3 font-semibold transition-colors ${
                    activeTab === 'description'
                      ? 'text-white bg-blue-800 rounded-t-lg'
                      : 'text-gray-600 hover:text-blue-800'
                  }`}
                  onClick={() => setActiveTab('description')}
                >
                  Description
                </button>
                <button
                  className={`px-6 py-3 font-semibold transition-colors ${
                    activeTab === 'reviews'
                      ? 'text-white bg-blue-800 rounded-t-lg'
                      : 'text-gray-600 hover:text-blue-800'
                  }`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews
                </button>
              </div>

              {/* Tab Content */}
              <div className="h-96 overflow-y-auto">
                {activeTab === 'description' ? (
                  <div>
                    <div className="mb-6">
                      <h3 className="font-bold text-xl mb-3 text-gray-900">About</h3>
                      <p className="text-gray-700 leading-relaxed">{doctor.bio}</p>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-bold text-xl mb-3 text-gray-900">Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-700">
                          <span className="w-6 h-6 flex items-center justify-center mr-3">📍</span>
                          <span>{doctor.info.location}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <span className="w-6 h-6 flex items-center justify-center mr-3">📅</span>
                          <span>{doctor.info.days}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <span className="w-6 h-6 flex items-center justify-center mr-3">⏰</span>
                          <span>{doctor.info.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {doctor.reviewsList?.map((review, index) => (
                      <div key={index} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{review.name}</h4>
                          <div className="flex items-center">
                            <div className="flex mr-2">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-sm text-gray-600">{review.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 ">
                <button 
                onClick={handleBookAppointment}
                className="bg-blue-800 text-white px-8 py-3 rounded-lg hover:bg-blue-900 transition-colors font-semibold">
                  Book Appointment
                </button>
                <button
                  className="text-gray-600 hover:text-blue-800 font-medium transition-colors"
                  onClick={() => navigate(-1)}
                >
                  Back to Selection
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-600">Doctor Not Found</h2>
            <p>The doctor you are looking for does not exist.</p>
            <button
              className="mt-4 text-blue-700 underline"
              onClick={() => navigate(-1)}
            >
              Back to Selection
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default DoctorProfile;