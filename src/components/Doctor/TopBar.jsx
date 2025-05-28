import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import assets from "../../assets/images/assets";
// import { Icon } from "@iconify/react/dist/iconify.js";

const TopBar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [logoutMenu, setLogoutMenu] = useState(false);
  const icons = {
    menu: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-menu"
      >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    ),

    search: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17 17L13.2223 13.2156L17 17ZM15.3158 8.15789C15.3158 10.0563 14.5617 11.8769 13.2193 13.2193C11.8769 14.5617 10.0563 15.3158 8.15789 15.3158C6.2595 15.3158 4.43886 14.5617 3.0965 13.2193C1.75413 11.8769 1 10.0563 1 8.15789C1 6.2595 1.75413 4.43886 3.0965 3.0965C4.43886 1.75413 6.2595 1 8.15789 1C10.0563 1 11.8769 1.75413 13.2193 3.0965C14.5617 4.43886 15.3158 6.2595 15.3158 8.15789V8.15789Z"
          stroke="#656565"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),

    notification: (
      <svg
        width="32"
        height="33"
        viewBox="0 0 32 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.0268 4.0675C11.6135 4.0675 8.02678 7.65417 8.02678 12.0675V15.9208C8.02678 16.7342 7.68012 17.9742 7.26678 18.6675L5.73345 21.2142C4.78678 22.7875 5.44012 24.5342 7.17345 25.1208C12.9201 27.0408 19.1201 27.0408 24.8668 25.1208C26.4801 24.5875 27.1868 22.6808 26.3068 21.2142L24.7734 18.6675C24.3734 17.9742 24.0268 16.7342 24.0268 15.9208V12.0675C24.0268 7.66751 20.4268 4.0675 16.0268 4.0675Z"
          stroke="#262626"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M18.4939 4.45417C18.0805 4.33417 17.6539 4.24084 17.2139 4.1875C15.9339 4.0275 14.7072 4.12084 13.5605 4.45417C13.9472 3.4675 14.9072 2.77417 16.0272 2.77417C17.1472 2.77417 18.1072 3.4675 18.4939 4.45417Z"
          stroke="#262626"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.0273 25.6008C20.0273 27.8008 18.2273 29.6008 16.0273 29.6008C14.934 29.6008 13.9207 29.1475 13.2007 28.4275C12.4807 27.7075 12.0273 26.6942 12.0273 25.6008"
          stroke="#262626"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
      </svg>
    ),

    questionMark: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.0007 1.33337C13.0999 1.33337 10.2642 2.19356 7.85229 3.80515C5.44037 5.41675 3.56051 7.70737 2.45042 10.3873C1.34034 13.0673 1.04989 16.0163 1.61581 18.8614C2.18172 21.7064 3.57859 24.3198 5.62976 26.3709C7.68093 28.4221 10.2943 29.819 13.1393 30.3849C15.9844 30.9508 18.9334 30.6604 21.6133 29.5503C24.2933 28.4402 26.584 26.5603 28.1955 24.1484C29.8071 21.7365 30.6673 18.9008 30.6673 16C30.6627 12.1116 29.116 8.38375 26.3665 5.63421C23.6169 2.88467 19.8891 1.33796 16.0007 1.33337ZM16.0007 28C13.6273 28 11.3072 27.2963 9.33381 25.9777C7.36042 24.6591 5.82235 22.785 4.9141 20.5922C4.00585 18.3995 3.76821 15.9867 4.23123 13.659C4.69426 11.3312 5.83715 9.19299 7.51538 7.51476C9.19361 5.83653 11.3318 4.69364 13.6596 4.23062C15.9873 3.76759 18.4001 4.00523 20.5929 4.91349C22.7856 5.82174 24.6597 7.35981 25.9783 9.3332C27.2969 11.3066 28.0007 13.6267 28.0007 16C27.9968 19.1814 26.7312 22.2314 24.4817 24.481C22.2321 26.7306 19.1821 27.9962 16.0007 28ZM17.334 22V24.6667H14.6673V22H17.334ZM21.334 12.6667C21.3354 13.4663 21.1563 14.256 20.81 14.9768C20.4637 15.6975 19.9592 16.3308 19.334 16.8294C18.3241 17.612 17.6412 18.7421 17.418 20H14.7087C14.8266 18.9721 15.1491 17.9781 15.6572 17.0768C16.1654 16.1755 16.8488 15.385 17.6673 14.752C17.9958 14.4892 18.2574 14.1523 18.4308 13.7689C18.6041 13.3856 18.6843 12.9667 18.6648 12.5464C18.6453 12.1262 18.5267 11.7165 18.3185 11.3509C18.1104 10.9852 17.8187 10.674 17.4673 10.4427C17.0757 10.1867 16.625 10.0352 16.1583 10.0025C15.6915 9.96982 15.2242 10.0571 14.8007 10.256C14.3489 10.4726 13.9698 10.8157 13.7094 11.2436C13.4491 11.6716 13.3186 12.166 13.334 12.6667C13.334 13.0203 13.1935 13.3595 12.9435 13.6095C12.6934 13.8596 12.3543 14 12.0007 14C11.647 14 11.3079 13.8596 11.0578 13.6095C10.8078 13.3595 10.6673 13.0203 10.6673 12.6667C10.6475 11.642 10.9302 10.6341 11.4802 9.7692C12.0302 8.9043 12.8229 8.22075 13.7593 7.80404C14.5894 7.43308 15.4995 7.2771 16.4057 7.3505C17.312 7.42391 18.1851 7.72432 18.9447 8.22404C19.6786 8.7099 20.2809 9.36985 20.6978 10.145C21.1147 10.9202 21.3332 11.7865 21.334 12.6667Z"
          fill="#3D3D3D"
        />
      </svg>
    ),

    dropDown: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.81039 9.75H16.1894C16.3377 9.75003 16.4827 9.79404 16.606 9.87645C16.7293 9.95886 16.8254 10.076 16.8821 10.213C16.9389 10.35 16.9538 10.5008 16.9248 10.6463C16.8959 10.7917 16.8245 10.9254 16.7196 11.0302L12.5301 15.2197C12.3895 15.3603 12.1988 15.4393 11.9999 15.4393C11.801 15.4393 11.6103 15.3603 11.4696 15.2197L7.28014 11.0302C7.17528 10.9254 7.10388 10.7917 7.07495 10.6463C7.04602 10.5008 7.06088 10.35 7.11763 10.213C7.17438 10.076 7.27049 9.95886 7.39379 9.87645C7.5171 9.79404 7.66207 9.75003 7.81039 9.75Z"
          fill="#858D9D"
        />
      </svg>
    ),
  };

  const handleLogout = () => {
    localStorage.removeItem("DoctorData");

    navigate("/login");
  };

  //   const userToken = sessionStorage.getItem("userToken");
  const userData = JSON.parse(localStorage.getItem("DoctorData"));
  const token = userData?.token
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <div className="fixed top-0 z-10 bg-white w-full font-lato">
      <div className="fixed top-0 z-10 bg-white lg:bg-white flex justify-between border-b border-b-gray-200 left-0 right-0 h-16 lg:pl-12 pl-5 pr-5 items-center">
        <Link to={"/doctor-dashboard"} className="text-3xl font-bold">
          <span className="text-black">Med</span>
          <span className="text-red-600">Link</span>
        </Link>

        <div className="fixed lg:hidden top-5 right-5">
          <p
            className="text-[#656565] size-7 cursor-pointer"
            onClick={toggleSidebar}
          >
            {icons.menu}
          </p>
        </div>

        <div className="hidden lg:block">
          <div className="border-[1.5px] border-[#868686] flex items-center rounded-3xl w-[400px] h-[35px] px-2 space-x-1 mr-10">
            <p className="text-[#656565] w-5 h-5">{icons.search}</p>
            <input
              autoComplete="off"
              type="text"
              placeholder="Search sub-account"
              className="outline-none bg-transparent placeholder:text-[#656565] grow text-[12px] font-inter"
            />
          </div>
        </div>

        <div className="lg:flex items-center gap-8 hidden">
          <div className="flex items-center gap-4">
            <p className="cursor-pointer">{icons.notification}</p>
            <p className="cursor-pointer">{icons.questionMark}</p>
          </div>

          <div
            className="flex cursor-pointer"
            onClick={() => setLogoutMenu(!logoutMenu)}
          >
            <div className="relative mr-3">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={userData?.user?.image || assets.Doctor3Img}
                alt="User Avatar"
              />
              <span className="w-3.5 h-3.5 bg-[#8937CE] rounded-full border-2 border-white absolute bottom-0 right-0"></span>
            </div>

            <div className="flex items-center">
              <div className="flex flex-col text-[14px]">
                <p className="font-medium">{userData?.user?.firstName || ""}</p>
                <p className="text-[#4A4C56]">
                  {userData?.user?.lastName || ""}
                </p>
              </div>

              <div>
                <p>{icons.dropDown}</p>
              </div>
            </div>
          </div>

          {logoutMenu && (
            <div className="absolute right-8 top-14 bg-white rounded-lg border py-2 px-6">
              <div
                className="text-[1.3vw] lg:text-[1.2vw] cursor-pointer hover:text-[#061492] p-1 rounded flex items-center"
                onClick={handleLogout}
              >
                <IoLogOut className="mr-2" />
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
