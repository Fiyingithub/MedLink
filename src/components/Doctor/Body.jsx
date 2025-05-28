import AppointmentRequest from "./Apointment/AppointmentRequest";
import PatientSummary from "./Chart/PatientSummary";
import PatientReviewCard from "./PatientReviewCard";

const Body = () => {
  const icons = {
    inwardPatient: (
      <svg
        width="29"
        height="29"
        viewBox="0 0 29 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_668_123)">
          <path
            d="M5.16663 23.8333V20.5667C5.16663 19.9055 5.33696 19.2981 5.67763 18.7443C6.01829 18.1905 6.47018 17.7674 7.03329 17.475C8.23885 16.8722 9.46385 16.4203 10.7083 16.1193C11.9527 15.8183 13.2166 15.6674 14.5 15.6667C14.8888 15.6667 15.2777 15.6814 15.6666 15.711C16.0555 15.7405 16.4444 15.7841 16.8333 15.8417V18.2042C16.4444 18.1264 16.0555 18.0731 15.6666 18.0443C15.2777 18.0155 14.8888 18.0008 14.5 18C13.4111 18 12.3319 18.1314 11.2625 18.3943C10.193 18.6572 9.13329 19.0508 8.08329 19.575C7.90829 19.6722 7.76713 19.8083 7.65979 19.9833C7.55246 20.1583 7.49918 20.3528 7.49996 20.5667V21.5H16.8333V23.8333H5.16663ZM14.5 14.5C13.2166 14.5 12.118 14.043 11.2041 13.1292C10.2902 12.2153 9.83329 11.1167 9.83329 9.83332C9.83329 8.54999 10.2902 7.45138 11.2041 6.53749C12.118 5.6236 13.2166 5.16666 14.5 5.16666C15.7833 5.16666 16.8819 5.6236 17.7958 6.53749C18.7097 7.45138 19.1666 8.54999 19.1666 9.83332C19.1666 11.1167 18.7097 12.2153 17.7958 13.1292C16.8819 14.043 15.7833 14.5 14.5 14.5ZM14.5 12.1667C15.1416 12.1667 15.6911 11.9384 16.1485 11.4818C16.6058 11.0253 16.8341 10.4758 16.8333 9.83332C16.8325 9.19088 16.6042 8.64177 16.1485 8.18599C15.6927 7.73021 15.1432 7.50155 14.5 7.49999C13.8567 7.49843 13.3076 7.7271 12.8526 8.18599C12.3976 8.64488 12.169 9.19399 12.1666 9.83332C12.1643 10.4727 12.393 11.0222 12.8526 11.4818C13.3123 11.9415 13.8614 12.1698 14.5 12.1667ZM21.5 28.5V22.6667H19.1666V15.6667H26.1666L23.8333 20.3333H26.1666L21.5 28.5Z"
            fill="black"
          />
        </g>
        <defs>
          <clipPath id="clip0_668_123">
            <rect
              width="28"
              height="28"
              fill="white"
              transform="translate(0.5 0.5)"
            />
          </clipPath>
        </defs>
      </svg>
    ),

    outwardPatient: (
      <svg
        width="21"
        height="25"
        viewBox="0 0 21 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.25006 5C5.25006 2.2375 7.59943 0 10.5 0C13.4007 0 15.75 2.2375 15.75 5C15.75 7.7625 13.4007 10 10.5 10C7.59943 10 5.25006 7.7625 5.25006 5ZM17.0625 25H18.375C19.8188 25 21 23.875 21 22.5V16.525C21 15.125 20.1994 13.8375 18.8869 13.2C18.3225 12.925 17.7188 12.6625 17.0625 12.425V25ZM10.9463 18.75L14.4375 11.6625C13.2169 11.4 11.9044 11.25 10.5 11.25C7.17943 11.25 4.31819 12.125 2.1132 13.2C1.47278 13.5141 0.936289 13.9912 0.563276 14.5781C0.190263 15.165 -0.00467952 15.8389 8.52994e-05 16.525V25H3.07132C2.78257 24.4375 2.62507 23.8 2.62507 23.125C2.62507 20.7125 4.68569 18.75 7.21881 18.75H10.9463ZM7.87505 25L9.72567 21.25H7.21881C6.12944 21.25 5.25006 22.0875 5.25006 23.125C5.25006 24.1625 6.12944 25 7.21881 25H7.87505Z"
          fill="#6674ED"
        />
      </svg>
    ),

    appointment: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.6667 16.3333C17.6944 16.3333 16.8681 15.993 16.1875 15.3125C15.5069 14.6319 15.1667 13.8055 15.1667 12.8333C15.1667 11.8611 15.5069 11.0347 16.1875 10.3542C16.8681 9.6736 17.6944 9.33332 18.6667 9.33332C19.6389 9.33332 20.4653 9.6736 21.1458 10.3542C21.8264 11.0347 22.1667 11.8611 22.1667 12.8333C22.1667 13.8055 21.8264 14.6319 21.1458 15.3125C20.4653 15.993 19.6389 16.3333 18.6667 16.3333ZM12.8333 23.3333C12.5028 23.3333 12.2259 23.2213 12.0027 22.9973C11.7794 22.7733 11.6674 22.4964 11.6667 22.1667V21.1167C11.6667 20.7083 11.7639 20.3194 11.9583 19.95C12.1528 19.5805 12.425 19.2889 12.775 19.075C13.65 18.55 14.5787 18.1564 15.561 17.8943C16.5433 17.6322 17.5786 17.5008 18.6667 17.5C19.7548 17.4992 20.7904 17.6307 21.7735 17.8943C22.7566 18.158 23.6849 18.5515 24.5583 19.075C24.9083 19.2889 25.1806 19.5805 25.375 19.95C25.5695 20.3194 25.6667 20.7083 25.6667 21.1167V22.1667C25.6667 22.4972 25.5547 22.7745 25.3307 22.9985C25.1067 23.2225 24.8298 23.3341 24.5 23.3333H12.8333ZM11.6667 16.3333H4.66667C4.33612 16.3333 4.05923 16.2213 3.836 15.9973C3.61278 15.7733 3.50078 15.4964 3.5 15.1667C3.49923 14.8369 3.61123 14.56 3.836 14.336C4.06078 14.112 4.33767 14 4.66667 14H11.6667C11.9972 14 12.2745 14.112 12.4985 14.336C12.7225 14.56 12.8341 14.8369 12.8333 15.1667C12.8326 15.4964 12.7206 15.7737 12.4973 15.9985C12.2741 16.2233 11.9972 16.3349 11.6667 16.3333ZM16.3333 6.99999H4.66667C4.33612 6.99999 4.05923 6.88799 3.836 6.66399C3.61278 6.43999 3.50078 6.1631 3.5 5.83332C3.49923 5.50355 3.61123 5.22666 3.836 5.00266C4.06078 4.77866 4.33767 4.66666 4.66667 4.66666H16.3333C16.6639 4.66666 16.9412 4.77866 17.1652 5.00266C17.3892 5.22666 17.5008 5.50355 17.5 5.83332C17.4992 6.1631 17.3872 6.44038 17.164 6.66516C16.9408 6.88993 16.6639 7.00155 16.3333 6.99999ZM12.95 11.6667H4.66667C4.33612 11.6667 4.05923 11.5547 3.836 11.3307C3.61278 11.1067 3.50078 10.8298 3.5 10.5C3.49923 10.1702 3.61123 9.89332 3.836 9.66932C4.06078 9.44532 4.33767 9.33332 4.66667 9.33332H14C13.7278 9.66388 13.5092 10.0236 13.3443 10.4125C13.1794 10.8014 13.048 11.2194 12.95 11.6667Z"
          fill="#061492"
        />
      </svg>
    ),

    totalDemart: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.7193 5.4912V2.6736C18.7193 1.7268 15.7097 0 11.9993 0C8.2877 0 5.2793 1.7268 5.2793 2.6736V5.4912C5.2793 8.0604 9.9317 10.1808 9.9317 12C9.9317 13.8168 5.2793 15.9372 5.2793 18.5064V21.3264C5.2793 22.272 8.2877 24 11.9993 24C15.7109 24 18.7193 22.272 18.7193 21.3252V18.5052C18.7193 15.936 14.0669 13.8156 14.0669 11.9988C14.0669 10.1808 18.7193 8.0604 18.7193 5.4912ZM7.1285 2.7936C7.9637 2.2668 9.5285 1.4952 12.0653 1.4952C14.6021 1.4952 16.8725 2.7936 16.8725 2.7936C17.0429 2.8968 17.7101 3.2532 17.2529 3.5244C16.2473 4.1208 14.2793 4.7484 11.9993 4.7484C9.7193 4.7484 7.8185 4.0572 6.8105 3.4596C6.3533 3.1896 7.1285 2.7936 7.1285 2.7936ZM12.6005 12C12.6005 13.4316 13.7957 14.3532 15.0617 15.5832C15.9869 16.4808 17.2529 17.7108 17.2529 18.5052V20.0988C16.0889 19.5192 12.6065 18.9528 12.6065 17.094C12.6065 16.1544 11.3909 16.1544 11.3909 17.094C11.3909 18.9528 7.9085 19.5192 6.7445 20.0988V18.5052C6.7445 17.7108 8.0117 16.4796 8.9357 15.5832C10.2017 14.3532 11.3969 13.4316 11.3969 12C11.3969 10.5684 10.2017 9.6468 8.9357 8.4168C8.0105 7.5168 6.7445 6.2868 6.7445 5.4912L6.6893 4.2936C7.9205 4.9572 9.8717 5.5872 11.9993 5.5872C14.1269 5.5872 16.0865 4.9572 17.3189 4.2936L17.2529 5.4912C17.2529 6.2856 15.9857 7.5168 15.0617 8.4168C13.7969 9.6468 12.6005 10.5684 12.6005 12Z"
          fill="#FF6D00"
        />
      </svg>
    ),

    arrowUp: (
      <svg
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.27325 5.66669H8.72658C8.85843 5.66613 8.98715 5.6265 9.09647 5.55279C9.2058 5.47908 9.29081 5.37461 9.34076 5.25259C9.39071 5.13057 9.40336 4.99648 9.3771 4.86727C9.35084 4.73806 9.28686 4.61954 9.19325 4.52669L5.47325 0.806696C5.41127 0.74421 5.33754 0.694614 5.2563 0.660768C5.17506 0.626923 5.08792 0.609497 4.99991 0.609497C4.91191 0.609497 4.82477 0.626923 4.74353 0.660768C4.66229 0.694614 4.58856 0.74421 4.52658 0.806696L0.80658 4.52669C0.712966 4.61954 0.648985 4.73806 0.622728 4.86727C0.596471 4.99648 0.609118 5.13057 0.659068 5.25259C0.709018 5.37461 0.79403 5.47908 0.903352 5.55279C1.01267 5.6265 1.1414 5.66613 1.27325 5.66669Z"
          fill="#3BAD49"
        />
      </svg>
    ),
  };

  const userData = JSON.parse(localStorage.getItem("DoctorData"));

  return (
    <div className="font-lato mb-20">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        {/* Welcome Section */}
        <div className="space-y-1">
          <h1 className="text-2xl md:text-[28px] font-medium text-gray-900">
            Welcome Dr. {userData?.user?.firstName || ""}
          </h1>
          <p className="text-sm md:text-[14px] text-gray-500 leading-relaxed">
            {"Here's"} your profile summary.
          </p>
        </div>
      </div>

      {/* Dashboard Card */}

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {/* Portfolio Value */}
        <div className="w-full bg-white border border-[#061492] hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer shadow-sm h-32 space-y-2 rounded-[20px] flex flex-col font-semibold justify-center px-5">
          <div className="flex items-center space-x-1">
            <p>{icons.inwardPatient}</p>
            <p className="text-[16px] font-[500]">Inward Patient</p>
          </div>
          <p className="text-[24px] whitespace-nowrap">100</p>
          <div className="flex items-center gap-1">
            <p className="text-[14px] text-[#3BAD49]">10.5%</p>
            <p>{icons.arrowUp}</p>
            <p className="text-[14px] text-[#0000008A] leading-[20px] font-thin">
              +10 today
            </p>
          </div>
        </div>

        {/* Claimed Dividend */}
        <div className="w-full bg-white hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer shadow-sm h-32 space-y-2 rounded-[20px] border border-[#061492] flex flex-col text-black font-semibold justify-center px-5">
          <div className="flex items-center space-x-1">
            <p>{icons.outwardPatient}</p>
            <p className="text-[16px] font-[500]">Outward Patient</p>
          </div>
          <p className="text-[24px] whitespace-nowrap">90</p>
          <div className="flex items-center gap-1">
            <p className="text-[14px] text-[#3BAD49]">10.5%</p>
            <p>{icons.arrowUp}</p>
            <p className="text-[14px] text-[#0000008A] leading-[20px] font-thin">
              -10 today
            </p>
          </div>
        </div>

        {/* Unclaimed Dividend */}
        <div className="w-full bg-white hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer shadow-sm h-32 space-y-2 rounded-[20px] border border-[#061492] flex flex-col text-black font-semibold justify-center px-5">
          <div className="flex items-center space-x-1">
            <p>{icons.appointment}</p>
            <p className="text-[16px] font-[500]">Today Appointment</p>
          </div>
          <p className="text-[24px] whitespace-nowrap">5</p>
          <div className="flex items-center gap-1">
            <p className="text-[14px] text-[#3BAD49]">10.5%</p>
            <p>{icons.arrowUp}</p>
            <p className="text-[14px] text-[#0000008A] leading-[20px] font-thin">
              +2 today
            </p>
          </div>
        </div>

        {/* Total Demart */}
        <div className="w-full bg-white hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer shadow-sm h-32 space-y-2 rounded-[20px] border border-[#061492] flex flex-col text-black font-semibold justify-center px-5">
          <div className="flex items-center space-x-1">
            <p>{icons.totalDemart}</p>
            <p className="text-[16px] font-[500]">Death Rate</p>
          </div>
          <p className="text-[24px] whitespace-nowrap">1</p>
          <div className="flex items-center gap-1">
            <p className="text-[14px] text-[#3BAD49]">10.5%</p>
            <p>{icons.arrowUp}</p>
            <p className="text-[14px] text-[#0000008A] leading-[20px] font-thin">
              +1 today
            </p>
          </div>
        </div>
      </div>

      <div className=" py-6 w-full">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Patient Review and Summary */}
          <div className="w-full lg:w-[60%] space-y-6">
            <div className=" space-y-6 ">
              <PatientSummary />
              <PatientReviewCard />
            </div>
          </div>

          {/* Right Column - Appointment Requests */}
          <div className="w-full lg:w-[40%] lg:col-span-1">
            <AppointmentRequest />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
