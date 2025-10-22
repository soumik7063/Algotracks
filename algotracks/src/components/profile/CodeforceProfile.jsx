import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { Profilecontext } from "./ProfileContext";
import { Submission } from "./Submission";
import UpdateProfile from "./UpdateProfile";
import CP_ids from "./CP_ids";
const verdict = {
  OK: "Accepted",
  WRONG_ANSWER: "Wrong answer",
  TIME_LIMIT_EXCEEDED: "Time limit exceeded",
};
const CodeforceProfile = () => {
  const [displayCount, setDisplayCount] = useState(5);
  const { loading } = useContext(AuthContext);
  const handelShowMore = () => {
    setDisplayCount((prev) => prev + 5);
  };

  const { codeforceData, isLoading, isError, CodeforceSubmission } =
  useContext(Profilecontext);
  console.log(!codeforceData)
  const getRatingColorClass = (rating) => {
    if (rating < 1200) return "bg-gray-500";
    if (rating < 1400) return "bg-green-500";
    if (rating < 1600) return "bg-cyan-500";
    if (rating < 1900) return "bg-blue-500";
    if (rating < 2100) return "bg-purple-500";
    if (rating < 2400) return "bg-orange-500";
    return "bg-red-500";
  };
  if(!codeforceData){
    return (
      <div>
       <div className='flex justify-center items-center h-20 flex-col'>
         <p className='text-2xl font-bold text-gray-400'>Your Codeforce ID is not found</p>
          <p className='text-xl font-semibold text-gray-300'>Please update it</p>
       </div>
       <div className='md:w-2xl mx-auto'>
        <CP_ids platform="Codeforce"/>
       </div>
      </div>
    )
  }
  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg
          className="animate-spin h-8 w-8 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      </div>
    );
  }
  
  if (isError) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md">
          <p className="font-bold">isError</p>
          <p>{isError}</p>
        </div>
      </div>
    );
  }
  
  if (!isLoading && codeforceData) {
    return (
      <>
        <div className="mt-5">
          <div className="bg-white max-w-[1180px] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300  mx-auto">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-gradient-to-br from-blue-500 to-purple-600 p-6 flex items-center justify-center">
                <div className="rounded-full border-4 border-white shadow-md overflow-hidden w-48 h-48 md:w-40 md:h-40 lg:w-48 lg:h-48">
                  <img
                    src={codeforceData.titlePhoto}
                    alt={`${codeforceData.handle}'s profile`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="md:w-2/3 p-6 md:p-8">
                <div className="flex items-center mb-4">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Codeforces Profile
                  </h1>
                  <div className="ml-auto text-2xl bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                    {(codeforceData &&
                      codeforceData.maxRank &&
                      codeforceData.maxRank) ||
                      "Rank"}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center border-b border-gray-200 pb-3">
                    <span className="text-gray-500 w-32">Username:</span>
                    <span className="font-medium text-gray-800">
                      {codeforceData &&
                        codeforceData.handle &&
                        codeforceData.handle}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center border-b border-gray-200 pb-3">
                    <span className="text-gray-500 w-32">Current Rating:</span>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-800">
                        {(codeforceData &&
                          codeforceData.rating &&
                          codeforceData.rating) ||
                          "N/A"}
                      </span>
                      {codeforceData.rating && (
                        <div
                          className={`ml-2 w-3 h-3 rounded-full ${getRatingColorClass(
                            codeforceData.rating
                          )}`}
                        ></div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center border-b border-gray-200 pb-3">
                    <span className="text-gray-500 w-32">Max Rating:</span>
                    <span className="font-medium text-gray-800">
                      {(codeforceData &&
                        codeforceData.maxRating &&
                        codeforceData.maxRating) ||
                        "N/A"}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center border-b border-gray-200 pb-3">
                    <span className="text-gray-500 w-32">Organization:</span>
                    <span className="font-medium text-gray-800">
                      {(codeforceData &&
                        codeforceData.organization &&
                        codeforceData.organization) ||
                        "N/A"}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <a
                    href={`https://codeforces.com/profile/${codeforceData.handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-gray-900">
            <h2 className="text-xl font-semibold text-white mb-4">
              Recent Submissions
            </h2>
            <div className="grid grid-cols-5 text-md text-center  text-gray-300 font-semibold">
              <h1 className="col-span-2">Name</h1>
              <h1>Date</h1>
              <h1>Time</h1>
              <h1>Status</h1>
            </div>
            {CodeforceSubmission &&
              CodeforceSubmission.slice(0, displayCount).map((item, idx) => {
                return (
                  <Submission
                    key={idx}
                    title={item.problem.name}
                    time={item.creationTimeSeconds + item.relativeTimeSeconds}
                    status={verdict[item.verdict]}
                  />
                );
              })}
            {CodeforceSubmission.length > displayCount && (
              <div className="mt-6 text-center">
                <button
                  onClick={handelShowMore}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-pink-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
              </div>
            )}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default CodeforceProfile;
