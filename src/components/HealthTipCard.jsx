const HealthTipCard = ({ title, description, image, link }) => {
  return (
    <div className="bg-white rounded-md overflow-hidden shadow-sm border border-gray-200">
      <img src={image} alt={title} className="w-full h-52 object-cover" />
      <div className="p-4 bg-blue-50">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        <a href={link} className="text-red-600 text-sm mt-2 inline-block">
          Read More......
        </a>
      </div>
    </div>
  );
};

export default HealthTipCard;
