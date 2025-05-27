import { useState } from "react";
import AppointmentPage from "../UI/AppointmentPage";
import Sidebar from "../Sidebar";
import TopBar from "../TopBar";




const Appointment = () => {
  // const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // const userData = sessionStorage.getItem("userData");
  // const userToken = sessionStorage.getItem("userToken");
  // console.log(userToken);

  // if (userToken === null) {
  //   navigate("/shareholderlogin");
  // }

  return (
    <div>
      <TopBar toggleSidebar={toggleSidebar} />

      <div className="flex">
        <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className=" w-full mt-20 lg:ml-[17%] 2xl:ml-[18%] px-4 md:px-[30px]">
          <AppointmentPage />
        </div>
      </div>
    </div>
  );
};

export default Appointment;
