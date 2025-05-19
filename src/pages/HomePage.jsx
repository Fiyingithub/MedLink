import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroImage from "../assets/images/hero.jpg"; 
import Hero from "../components/Hero";

const HomePage = () => {
  return (
    <div className="relative w-full bg-blue overflow-hidden font-sans">
      <div className="absolute inset-0 z-0">
        <img
          src={HeroImage}
          alt="Doctors"
          className="w-full h-full object-cover"
        />
      </div>

      
     <div className="absolute inset-0 bg-white bg-opacity-30 z-10 mix-blend-overlay" />
      <Header />
      <main className="relative z-20 flex flex-col justify-center h-full">
        <Hero />
        <Footer />
      </main>
    </div>
  );
};

export default HomePage;
