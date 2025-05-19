
const Hero = () => {
  return (
    <div className="relative z-20 flex h-screen flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900">
        Your Health, Simplified
      </h1>
      <p className="mt-4 text-lg md:text-xl font-medium text-black">
        Book appointments with trusted doctors online or <br />
        explore expert health advice.
      </p>
      <div className="mt-8 flex flex-wrap gap-6 justify-center">
        <button className="bg-[#B4190B] text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-red-800">
          Book Appointment
        </button>
        <button className="border-2 border-[#B4190B] text-[#B4190B] px-8 py-4 rounded-full text-xl font-semibold hover:bg-red-700 hover:text-white transition">
          Xplore Health Tips
        </button>
      </div>
    </div>
  );
};

export default Hero;
