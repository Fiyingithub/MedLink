import { useState } from "react";
import { Link } from "react-router-dom";
import assets from "../../assets/images/assets";
import { useNavigate } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
// Icons

import { FaFileMedical } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { GiWeight } from "react-icons/gi";
import { IoIosMan } from "react-icons/io";
import { TbWaveSawTool } from "react-icons/tb";
import { GoSidebarExpand } from "react-icons/go";
import Map, { Marker } from "react-map-gl/mapbox";
import UpcomingAppointmentCard from "./UI/UpcomingAppointmentCard";
// import CheckInsurance from "./CheckInsurance";

const Body = () => {
  const navigate = useNavigate();
  const [selectedStory, setSelectedStory] = useState("");
  const [disease, setDisease] = useState("");
  const [isMore, setIsMore] = useState(false);

  const diseaseHistory = [
    {
      id: 1,
      name: "ToothAche",
      date: "15 October 2024",
      story:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 2,
      name: "Fever",
      date: "20 October 2024",
      story:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 3,
      name: "Headache",
      date: "25 October 2024",
      story:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      id: 4,
      name: "Back Pain",
      date: "30 October 2024",
      story:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];

  const [viewport, setViewport] = useState({
    latitude: 6.601838,
    longitude: 3.351486,
    zoom: 12,
    width: "100%",
    height: "100%",
  });

  // Function to handle clicking on a disease history item
  const handleDiseaseClick = (story, name) => {
    setSelectedStory(story);
    setDisease(name);
  };

  // function formatDate(dateString) {
  //   const date = new Date(dateString);

  //   const day = date.getDate();
  //   const month = date.toLocaleString("default", { month: "long" });
  //   const year = date.getFullYear();
  //   const ordinalSuffix = (day) => {
  //     const suffixes = ["th", "st", "nd", "rd"];
  //     const remainder = day % 100;
  //     return (
  //       suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0]
  //     );
  //   };
  //   let hours = date.getHours();
  //   const minutes = date.getMinutes().toString().padStart(2, "0");
  //   const period = hours >= 12 ? "PM" : "AM";
  //   hours = hours % 12 || 12;

  //   return `${day}${ordinalSuffix(
  //     day
  //   )} ${month} ${year}, ${hours}:${minutes} ${period}`;
  // }

  const userData = JSON.parse(sessionStorage.getItem("userData"));

  return (
    <div className="font-lato mb-20">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        {/* Welcome Section */}
        <div className="space-y-1">
          <h1 className="text-2xl md:text-[28px] font-medium text-gray-900">
            Welcome {userData?.data?.firstName || "Portable"}
          </h1>
          <p className="text-sm md:text-[14px] text-gray-500 leading-relaxed">
            {"Here's"} your profile summary.
          </p>
        </div>
      </div>

      {/* Dashboard Card */}

      <div className="w-full mt-4">
        <div>
          <div
            className="fixed right-0 top-[50%] p-2 rounded-lg text-[24px] z-20 bg-blue-800"
            onClick={() => setIsMore(!isMore)}
          >
            <GoSidebarExpand className="text-white cursor-pointer" />
          </div>
          {isMore && (
            <div className="fixed right-4 top-[57.5%] z-20 bg-white rounded-lg border border-gray-300 p-4 shadow-xl flex flex-col gap-2 text-[14px]">
              <Link to={"#"} className="hover:text-blue-800">
                Previous surgery
              </Link>
              <Link to={"#"} className="hover:text-blue-800">
                Allergies
              </Link>
              <Link to={"#"} className="hover:text-blue-800">
                Current medication
              </Link>
              <Link to={"#"} className="hover:text-blue-800">
                Insurance (HMO)
              </Link>
            </div>
          )}

          <div className="mt-8 lg:mx-4 ">
            <div className="flex gap-4 flex-col-reverse lg:flex-row">
              {/* side 1 */}
              <div className="lg:w-[33.33%] w-[100%] flex flex-col gap-4 ">
                {/* Statistics */}
                <div className="rounded-lg shadow-lg border border-gray-300 border-gray-300 p-4 space-y-4 ">
                  <UpcomingAppointmentCard />
                </div>

                {/* Address */}
                <div className="shadow-lg border border-gray-300 border-gray-300 rounded-lg ">
                  <div className="py-2 px-4 border-b">
                    <h3 className="text-xl font-semibold mb-4">Your Address</h3>
                  </div>
                  <div className=" px-4 ">
                    <div className="space-y-2">
                      <p>Email: email@email.com</p>
                      <p>Phone: +234 810 000 0000</p>
                      <p>Address: 123, Otigba Street, Ikeja Lagos, Nigeria</p>
                    </div>
                    <div className="h-40 border-t ">
                      <Map
                        {...viewport}
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                        onViewportChange={(newViewport) =>
                          setViewport(newViewport)
                        }
                        mapboxAccessToken="your-mapbox-access-token"
                      >
                        <Marker latitude={6.601838} longitude={3.351486}>
                          <div className="bg-blue-500 w-3 h-3 rounded-full" />
                        </Marker>
                      </Map>
                    </div>
                  </div>
                </div>
              </div>

              {/* side 2 */}
              <div className="w-[100%] lg:w-[66.67%] flex flex-col gap-4 ">
                {/* buttons */}
                <div className="flex flex-wrap gap-2 items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      className="flex gap-2 items-center cursor-pointer px-4 py-2 bg-blue-800 hover:bg-blue-700 transition-all text-white rounded-lg"
                      onClick={() => navigate("/patient/appointments")}
                    >
                      <FaFileMedical />
                      Book Appointment
                    </button>
                  </div>
                </div>

                {/* details and story */}
                <div className="rounded-lg shadow-lg border border-gray-300 items-center justify-center relative">
                  <div className="h-40 w-[100%]">
                    <img
                      src={assets.LoginImage}
                      alt=""
                      className="object-cover w-[100%] h-[100%] "
                    />
                  </div>

                  {/* Patient name and image */}
                  <div className="flex gap-4 items-center absolute left-6 top-[150px]">
                    <div>
                      <div className="w-[100px] h-[100px] rounded-xl overflow-hidden border border-gray-300 shadow-lg ">
                        <img
                          src={assets.DentistImg}
                          alt=""
                          className="h-[100%] w-[100%] object-cover "
                        />
                      </div>
                      <div className="text-center">
                        <p>illness</p>
                        <p className="font-medium text-[14px] ">
                          {disease || "Back Pain"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h1 className="font-medium text-[2vmax] ">
                        Portable Zazu
                      </h1>
                      <p className="font-medium text-[1.5vmax] ">
                        #p-patientID
                      </p>
                      <p className="flex items-center gap-1 ">
                        <IoMdTime /> {"Joined on 15 October 2024, 10:00 AM"}
                      </p>
                    </div>
                  </div>

                  {/* Disease story */}
                  <div className="p-4 mt-32 ">
                    <h2 className="font-medium mb-4 ">Story About illness</h2>
                    <p className="text-[13px]">
                      {selectedStory ||
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti praesentium accusamus, id obcaecati numquam adipisci iste rerum! Nihil commodi adipisci deleniti magnam dolor fuga praesentium non facere ex? Dolorum a eius aperiam veritatis soluta est esse ab praesentium debitis at similique, sunt, laborum ratione. Architecto magni quas dicta officia repudiandae."}
                    </p>
                  </div>
                </div>

                {/* vitals and statistics */}
                <div className="flex flex-col lg:flex-row justify-between gap-4 ">
                  {/* Vitals */}
                  <div className="w-[100%] lg:w-[50%] rounded-lg border border-gray-300 shadow-lg ">
                    <div className="border border-gray-300 p-4 space-y-4">
                      <div className="py-4 border-b">
                        <h3 className="text-xl font-semibold mb-4">
                          Your Health Vitals
                        </h3>
                      </div>
                      <div className="flex justify-between ">
                        {/* Vital 1 */}
                        <div className="flex flex-col items-center justify-center border border-gray-300 p-4 lg:p-2">
                          <GiWeight className="text-red-500 text-4xl mb-2" />
                          <p className="text-[10px]">Weight</p>
                          <p className="text-lg font-bold">230 ibs</p>
                        </div>

                        {/* Vital 2 */}
                        <div className="flex flex-col items-center justify-center border border-gray-300 p-4 lg:p-2">
                          <IoIosMan className="text-[#e1ca58] text-[100px] mb-2" />
                          <p className="text-[10px]">Height</p>
                          <p className="text-lg font-bold">{`6'1`}</p>
                        </div>

                        {/* Vital 3 */}
                        <div className="flex flex-col items-center justify-center border border-gray-300 p-4 lg:p-2">
                          <TbWaveSawTool className="text-green-500 text-6xl mb-2" />
                          <p className="text-[10px]">BMI</p>
                          <p className="text-lg font-bold">30.34</p>
                        </div>
                      </div>
                      <div>
                        {/* Vital 4 */}
                        <div className="flex gap-4 flex-col justify-center border border-gray-300 p-2">
                          <p className="text-[14px] text-red-600 ">
                            Blood Pressure
                          </p>
                          <div className="flex gap-4">
                            <div className="flex items-center gap-1">
                              <p className="text-[3vmax] font-bold">150</p>
                              <div>
                                <p className="text-[12px]">Systolic</p>
                                <p className="text-[12px]">mmHg</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <p className="text-[3vmax] font-bold">90</p>
                              <div>
                                <p className="text-[12px]">Diastolic</p>
                                <p className="text-[12px]">mmHg</p>
                              </div>
                            </div>
                          </div>
                          <p>Recorded on 25/10/2024</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Disease History */}
                  <div className="w-[100%] lg:w-[50%] rounded-lg border border-gray-300 shadow-lg ">
                    <div className="py-6 px-4 border-b">
                      <h3 className="text-xl font-semibold mb-4">
                        Medical History
                      </h3>
                    </div>
                    <div className="flex items-center lg:justify-between p-4 ">
                      <div className="space-y-0">
                        {diseaseHistory?.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-4 cursor-pointer "
                            onClick={() =>
                              handleDiseaseClick(item.story, item.name)
                            }
                          >
                            <div className="flex-shrink-0 flex flex-col items-center">
                              <div className="w-14 h-14 bg-blue-800 hover:bg-blue-700 transition-all text-white rounded-full flex items-center justify-center">
                                <FaHeart className="text-[20px] " />
                              </div>
                              {index < diseaseHistory.length - 1 && (
                                <div className="h-6 border-l-4 border-blue-800 "></div>
                              )}
                            </div>
                            <div className="hover:text-blue-700 transition-all">
                              <p className="font-medium ">{item.name}</p>
                              <p className="text-sm text-gray-500">
                                {item.date}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
