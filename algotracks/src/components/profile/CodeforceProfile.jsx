import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

const CodeforceProfile = () => {
  const { isLoggedIn, user, loading } = useContext(AuthContext);
  const [codeforceData, setCodeforceDta] = useState(null);
  const [isloading, setIsloading] = useState(true);
  const [error, setError] = useState("");
 
   //Later work
//   const [CodeforceRating, setCodeforceRating] = useState(null);
//   https://codeforces.com/api/user.rating?handle=soumik7063

  const UserHandel = user?.cpProfiles?.Codeforce;

  useEffect(() => {
    const getUser = async () => {
      setIsloading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://codeforces.com/api/user.info?handles=${UserHandel}`
        );
        const data = await response.json();

        if (data.status == "OK") {
          setCodeforceDta(data.result[0]);
        } else {
          setError("User not found. Please check the username and try again.");
        }
      } catch (error) {
        setError("Failed to fetch user data. Please try again later.");
        console.error(error);
      } finally {
        setIsloading(false);
      }
    };
    getUser();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/signup" />;
  }
  const getRatingColorClass = (rating) => {
    if (rating < 1200) return "bg-gray-500";
    if (rating < 1400) return "bg-green-500";
    if (rating < 1600) return "bg-cyan-500";
    if (rating < 1900) return "bg-blue-500";
    if (rating < 2100) return "bg-purple-500";
    if (rating < 2400) return "bg-orange-500";
    return "bg-red-500";
  };
  if (loading || isloading) {
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

  if (!isloading) {
    return (
      <>
        <div className="mt-20">
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
                  <div className="ml-auto bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
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
          </div>
        </div>
      </>
    );
  }
};

export default CodeforceProfile;
