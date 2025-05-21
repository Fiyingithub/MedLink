const ServiceCard = ({ title, description, icon, image, link }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-md flex flex-col md:flex-row gap-4 shadow-sm">
      <div className="flex items-center justify-center w-full md:w-1/2">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-40 rounded"
        />
      </div>
      <div className="flex flex-col justify-between w-full md:w-1/2">
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <span className="text-red-600 text-2xl">{icon}</span>
            {title}
          </h3>
          <p className="text-sm mt-2">{description}</p>
        </div>
        <a href={link} className="text-red-600 mt-4 inline-block">
          Read More →
        </a>
      </div>
    </div>
  );
};

export default ServiceCard;
