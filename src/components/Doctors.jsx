import DoctorCard from "./DoctorCard";
import assets from "../assets/images/assets";

const doctors = [
  {
    name: "Dr Murphy Christian",
    specialty: "Dentist",
    image: assets.Doctor1Img,
  },
  {
    name: "Dr Kristina Castle",
    specialty: "Surgeon",
    image: assets.Doctor2Img,
  },
  {
    name: "Dr Triyne Kesakov",
    specialty: "Rheumatologist",
    image: assets.Doctor3Img,
  },
  {
    name: "Dr Jane Doe",
    specialty: "Pediatrician",
    image: assets.Doctor4Img,
  },
  {
    name: "Dr Triyne Kesakov",
    specialty: "Rheumatologist",
    image:  assets.Doctor5Img,
  },
  {
    name: "Dr Jane Doe",
    specialty: "Pediatrician",
    image: assets.Doctor6Img,
  },
];

const Doctors = () => (
  <section className="bg-white py-12 px-4 text-center">
    <h2 className="text-3xl font-bold mb-2">
      Meet Our Expert <span className="text-blue-700">Doctors</span>
    </h2>
    <p className="text-gray-600 mb-8">
      At MedLink, your health is in the hands of trusted professionals.
    </p>
    <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {doctors.map((doc, index) => (
        <DoctorCard key={index} {...doc} />
      ))}
    </div>
  </section>
);

export default Doctors;
