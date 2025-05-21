import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroImage from "../assets/images/hero.jpg"; 
import Hero from "../components/Hero";
import Services from "../components/Services";
import Doctors from "../components/Doctors";
import HealthTips from "../components/HealthTips";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import ContactUs from "../components/Contact";


const HomePage = () => {
  return (
    <div className="w-full bg-white font-sans">
      <Header />
      <main className="flex flex-col">
        <Hero />         {/* background image will be handled here */}
        <Services />
        <Doctors />
        <HealthTips />
        <WhyChooseUs />
        <Testimonials />
        <ContactUs />
        <Footer />
      </main>
    </div>
  );
};


export default HomePage;
