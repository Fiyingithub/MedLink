import { FaQuoteRight, FaStar } from "react-icons/fa";

const TestimonialCard = ({ name, role, quote }) => (
  <div className="bg-gray-100 p-4 rounded shadow-sm">
    <div className="flex items-center space-x-4 mb-2">
      <img
        src="https://randomuser.me/api/portraits/women/44.jpg"
        alt="avatar"
        className="w-10 h-10 rounded-full"
      />
      <div>
        <div className="font-bold">{name}</div>
        <div className="text-sm text-gray-600">{role}</div>
      </div>
      <FaQuoteRight className="ml-auto text-blue-800" />
    </div>
    <p className="text-sm text-gray-700 mb-3">"{quote}"</p>
    <div className="flex space-x-1 text-yellow-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i} />
      ))}
    </div>
  </div>
);

export default TestimonialCard;
