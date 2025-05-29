const ServiceCard = ({ title, description, icon, image, link }) => {
  return (
    <div className="bg-gray-200 rounded-md flex flex-col md:flex-row gap-4 shadow-sm">
     <div className="flex items-center justify-center w-full md:w-1/2 p-0">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-40 rounded-l-md rounded-r-none m-0"
          style={{ padding: 0, margin: 0 }}
        />
      </div>
      <div className="flex flex-col justify-center items-start text-left w-full md:w-1/2">
        <div>
           <span className="">{icon}</span>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            {title}
          </h3>
          <p className="text-sm text-left mt-2">{description}</p>
        </div>
        <a href={link} className="text-red-600 mt-4 inline-block">
          Read More →
        </a>
      </div>
    </div>
  );
};

export default ServiceCard;
