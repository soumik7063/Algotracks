import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { contestContext } from "../../ContestDataContext";
import PastContestcard from "./PastContestcard.jsx";
import Error from "../../Error";
import { useNavigate } from "react-router-dom";
import ContestCard from "./ContestCard.jsx";

const CodeforcesContest = () => {
  const navigate = useNavigate();
  const { user, checkLoginStatus, isLoggedIn } = useContext(AuthContext);
  const { contestData, isLoading } = useContext(contestContext);
  const [pastContest, setPastContest] = useState(null);
  const [upcomingContest, setUpcomingContest] = useState(null);
  const [error, setError] = useState(null);
  const [isBookmarkLoading, setIsbookmarkLoading] = useState(false);
  const [successmsg, setsuccessmsg] = useState("");
  // For pagination of past contests
  const [displayCount, setDisplayCount] = useState(10);
  // For tab selection
  const [activeTab, setActiveTab] = useState("upcoming");
  const [bookmarked, setBookmarked] = useState({});
  const [bookmarkContest, setbookmarkContest] = useState([]);
  useEffect(() => {
    if (user && user.bookmarks && user.bookmarks["Codeforce"]) {
      setbookmarkContest(user.bookmarks["Codeforce"]);
    }
  }, [user?.bookmarks?.["Codeforce"]]);
  useEffect(() => {
    if (contestData) {
      setPastContest(
        contestData.filter((contest) => contest.phase === "FINISHED")
      );
      setUpcomingContest(
        contestData.filter((contest) => contest.phase === "BEFORE")
      );
    }
  }, [contestData]);

  useEffect(() => {
    const newbookmarked = {};
    bookmarkContest.forEach((contest) => {
      newbookmarked[contest.id] = true;
    });
    setBookmarked((prev) => ({
      ...prev,
      ...newbookmarked,
    }));
  }, [bookmarkContest]);

  const handleShowMore = () => {
    setDisplayCount((prevCount) => prevCount + 10);
  };
  const updateBookmark = async (contest) => {
    if (!isLoggedIn) {
      navigate("/signup");
      return
    }
    const newBookmarked = {
      ...bookmarked,
      [contest.id]: !bookmarked[contest.id],
    };

    setBookmarked(newBookmarked);

    try {
      setIsbookmarkLoading(true);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/bookmarks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: user._id,
          platform: "Codeforce",
          operation: newBookmarked[contest.id],
          contest: contest,
        }),
      });
      await checkLoginStatus();
      const res = await response.json();
      console.log(res);
      if (res.success) {
        setsuccessmsg(res.message);
      } else {
        setError(res.message);
      }
    } catch (error) {
      setError("Failed to update bookmark. Please try again later.");
    } finally {
      setIsbookmarkLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 transform transition-transform duration-200 hover:scale-105">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-indigo-800 py-6 px-6">
          <h1 className="text-white text-2xl md:text-3xl font-bold text-center">
            Codeforces Contest Calendar
          </h1>
          <p className="text-blue-100 text-center mt-2">
            Track upcoming and past competitive programming contests
          </p>
        </div>

        {/* Action Bar */}
        <div className="bg-gray-800 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="tabs flex rounded-md shadow-sm overflow-hidden">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "upcoming"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Upcoming Contests
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={` px-4 py-2 text-sm font-medium ${
                activeTab === "past"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Past Contests
            </button>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Refreshing...
              </>
            ) : (
              "Refresh Contests"
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && <Error error={error} />}

        {/* Loading State */}
        {isLoading && !error && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          </div>
        )}

        {/* Content */}
        {!isLoading && !error && contestData && (
          <div className="p-6">
            {activeTab === "upcoming" && (
              <>
                <h2 className="text-xl font-semibold mb-6 text-gray-800">
                  Upcoming Contests
                </h2>
                {upcomingContest && upcomingContest.length > 0 ? (
                  <div className="grid gap-6">
                    {upcomingContest
                      .slice()
                      .reverse()
                      .map((contest, idx) => {
                        return (
                          <ContestCard
                            key={idx}
                            contest={contest}
                            updateBookmark={updateBookmark}
                            isBookmarkLoading={isBookmarkLoading}
                            bookmarked={bookmarked}
                          />
                        );
                      })}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">
                      No upcoming contests
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      There are no upcoming contests scheduled at the moment.
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Past Contests Tab */}
            {activeTab === "past" && (
              <>
                <h2 className="text-xl font-semibold mb-6 text-gray-800">
                  Past Contests
                </h2>
                {pastContest && pastContest.length > 0 ? (
                  <>
                    <div className="grid gap-4">
                      {pastContest
                        .slice(0, displayCount)
                        .map((contest, idx) => {
                          return (
                            <PastContestcard key={idx} contest={contest} />
                          );
                        })}
                    </div>

                    {pastContest.length > displayCount && (
                      <div className="mt-6 text-center">
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
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">
                      No past contests
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      There are no past contests in the system.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 text-center text-sm text-gray-500">
        Data provided by Codeforces API. Last updated:{" "}
        {new Date().toLocaleString()}
      </div>
    </div>
  );
};

export default CodeforcesContest;
