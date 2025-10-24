import { useState } from "react";
import SingleQuestion from "./SingleQuestion";
const Heading = ({ heading }) => {
  return (
    <h1 className="text-center text-gray-200 text-xl font-semibold">
      Problem {heading}
    </h1>
  );
};
const RecomendQuestions = ({ problems }) => {
  const [offset, setoffset] = useState(10);
  const handleShowMore = () => {
    setoffset((prev) => prev + 5);
  };
  return (
    <div className="bg-gray-700 px-2 md:p-4 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <Heading heading="name" />
        <Heading heading="rating" />
        <Heading heading="tags" />
      </div>
      {problems &&
        problems
          .slice(0, offset)
          .map((item, idx) => <SingleQuestion key={idx} problem={item} />)}
      {problems && problems.length > offset && (
        <button
          onClick={handleShowMore}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Show More
          <svg
            className="ml-1 -mr-1 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default RecomendQuestions;
