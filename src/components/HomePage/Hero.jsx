import HeroImage from "../../assets/images/hero.jpg";

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <img
        src={HeroImage}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-30 mix-blend-overlay z-10" />

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900">
          Your Health, Simplified
        </h1>
        <p className="mt-4 text-lg md:text-xl font-medium text-black">
          Book appointments with trusted doctors online or <br />
          explore expert health advice.
        </p>
        <div className="mt-8 flex flex-wrap gap-6 justify-center">
          <a
            href="#doctor"
            className="bg-[#B4190B] cursor-pointer text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-red-800"
          >
            Book Appointment
          </a>
          <a
            href="#health"
            className="border-2 border-[#B4190B] text-[#B4190B] px-8 py-4 rounded-full text-xl font-semibold hover:bg-red-700 hover:text-white transition"
          >
            Explore Health Tips
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
