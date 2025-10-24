import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiHide , BiShow} from "react-icons/bi";
const SingleQuestion = ({ problem }) => {
  const [show, setshow] = useState(false);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap- md:gap-4 mt-2 w-full bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 mb-3 transform transition-transform duration-200 hover:scale-101">
      <Link
        to={problem.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-center text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1"
      >
        {problem.name}
      </Link>
      <p className="text-center text-md md:font-semibold text-gray-600 dark:text-gray-300 mb-1">
        {problem.rating}
      </p>
      <div className="flex items-center gap-4 justify-center">
        <button className="text-gray-300 cursor-pointer" onClick={() => setshow((prev) => !prev)}>
          {show ? <BiHide className="h-6 w-6"/>: <BiShow className="h-6 w-6"/>}
        </button>
        {show && (
          <p className="text-center text-md md:font-semibold text-gray-900 dark:text-gray-300 mb-1">
            {problem.tags}
          </p>
        )}
      </div>
    </div>
  );
};

export default SingleQuestion;
