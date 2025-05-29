import ServiceCard from "./SeviceCard";
import assets from "../../assets/images/assets"
import { MdOutlinePsychology } from "react-icons/md";
import { FaHeartbeat, FaTooth, FaEye } from "react-icons/fa";


const services = [
  {
    title: "Neurology",
    description:
      "Once the family has reached a decision, the team informs the relevant parties.",
    icon: <MdOutlinePsychology className="text-2xl text-[#000000]" />,
    image: assets.NeurologyImg,
    link: "#",
  },
  {
    title: "Cardiology",
    description: "Proper check up on your heart is rest assured with MedLink.",
    icon: <FaHeartbeat className="text-2xl text-[#000000]" />,
    image: assets.CardiologyImg,
    link: "#",
  },
  {
    title: "Dentist",
    description:
      "Get the best doctor that will take care of your tooth and delivers medications.",
    icon: <FaTooth className="text-2xl text-[#000000]" />,
    image: assets.DentistImg,
    link: "#",
  },
  {
    title: "Eye Care",
    description:
      "MedLink eye specialists take prior care of patients and follow up meds.",
    icon: <FaEye className="text-2xl text-[#000000]" />,
    image: assets.EyeCareImg,
    link: "#",
  },
];



const Services = () => (
  <section className="bg-[#DCEDFD] py-12 px-4 text-center">
    <h2 className="text-2xl font-bold mb-2">OUR SERVICES</h2>
    <p className="text-gray-700 mb-8">Feel Like Home With Best Medical Care</p>
    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {services.map((service, index) => (
        <ServiceCard key={index} {...service} />
      ))}
    </div>
  </section>
);

export default Services;
