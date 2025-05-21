const DoctorCard = ({ name, specialty, image }) => {
  return (
    <div className="bg-[#5962B6] rounded-lg overflow-hidden shadow-md text-center">
      <img src={image} alt={name} className="w-full h-64 object-cover" />
      <div className="bg-indigo-600 text-white p-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm mb-2">{specialty}</p>
        <button className="bg-[#FF0000] hover:bg-pink-700 text-white px-4 py-1 rounded">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
