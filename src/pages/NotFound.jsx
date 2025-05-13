import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <div className="mt-[20%]">
        <h1 className="text-4xl text-red-600 font-semibold text-center ">
          The Page You're Trying to Navigate to is not Found
        </h1>
        <div className="flex justify-center mt-4 ">
          <button className="w-28 py-2 border border-gray-500">
            <Link to={"/"}>Go Home</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
