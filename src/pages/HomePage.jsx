import React from "react";
import Header from "../components/Header";

const HomePage = () => {
  return (
   <div className="relative w-full bg-blue overflow-hidden font-sans">
      <div className="absolute inset-0 z-0">
        <img
          src="/path-to-your-image.jpg"
          alt="Doctors"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-white bg-opacity-30 z-10" />
      <Header />
      </div>
  );
};

export default HomePage;
