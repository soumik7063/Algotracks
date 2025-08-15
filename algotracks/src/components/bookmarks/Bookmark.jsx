import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext";
import { Link } from "react-router-dom";

const Bookmark = () => {
  const [greetmsg, setGreetmsg] = useState("");
  const [bookmarks, setBookmarks] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const fetchBookmarks = () => {
    setLoading(true);

    if (user && user.bookmarks) { 
      const copiedBookmarks = JSON.parse(JSON.stringify(user.bookmarks));

      for (const key in copiedBookmarks) {
        if (
          Object.prototype.hasOwnProperty.call(copiedBookmarks, key) &&
          Array.isArray(copiedBookmarks[key])
        ) {
          copiedBookmarks[key].sort((a, b) => {
            const timeA = a.startTimeSeconds || a.startTime;
            const timeB = b.startTimeSeconds || b.startTime;
            return timeA - timeB;
          });
        }
      }
      setBookmarks(copiedBookmarks);
    } else {
      setBookmarks(null);
    }

    setLoading(false); 
  };

  useEffect(() => {
    fetchBookmarks();
  }, [user, user.bookmarks, user.bookmarks.Codeforce]); 
  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    greeting(currentHour);
  }, []);

  function greeting(time) {
    if (time >= 12 && time < 16) setGreetmsg("Good Afternoon");
    else if (time >= 16 && time <= 23) setGreetmsg("Good Evening");
    else setGreetmsg("Good Morning");
  }

  const formatDate = (timestamp) => {
    const actualTimestamp =
      String(timestamp).length === 10 ? timestamp * 1000 : timestamp;
    const date = new Date(actualTimestamp);
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTimeRemaining = (startTime) => {
    const actualStartTime =
      String(startTime).length === 10 ? startTime * 1000 : startTime;
    const now = Date.now(); // Current time in milliseconds
    const timeRemaining = Math.floor((actualStartTime - now) / 1000); // Remaining time in seconds

    if (timeRemaining <= 0) return "Started";

    const days = Math.floor(timeRemaining / 86400);
    const hours = Math.floor((timeRemaining % 86400) / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);

    if (days > 0) {
      return `${days}d ${hours}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const ContestCard = ({ item, platform }) => {
    const contestName = platform === "Codeforce" ? item.name : item.titleSlug;
    const contestStartTime =
      platform === "Codeforce" ? item.startTimeSeconds : item.startTime;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 transform transition-transform duration-200 hover:scale-105">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {contestName}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
          <span className="font-medium">Starts:</span>{" "}
          {formatDate(contestStartTime)}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          <span className="font-medium">Remaining:</span>{" "}
          {getTimeRemaining(contestStartTime)}
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full text-sm transition duration-300">
          Notify 🔔
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 sm:p-6 lg:p-8 mt-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {greetmsg} {user?.name || "Guest"} 👋
        </h2>

        {!loading && bookmarks ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Codeforces Column */}
            <div>
              <h2 className="text-2xl font-bold mb-4 border-b-2 border-blue-500 pb-2">
                Codeforces Bookmarks
              </h2>
              {bookmarks?.Codeforce?.length > 0 ? (
                bookmarks.Codeforce.map((item, idx) => (
                  <ContestCard key={idx} item={item} platform="Codeforce" />
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No Codeforces bookmarks yet.
                </p>
              )}
            </div>

            {/* Leetcode Column */}
            <div>
              <h2 className="text-2xl font-bold mb-4 border-b-2 border-green-500 pb-2">
                Leetcode Bookmarks
              </h2>
              {bookmarks["Leetcode"] && bookmarks["Leetcode"].length > 0 ? (
                bookmarks["Leetcode"].map((item, idx) => (
                  <ContestCard key={idx} item={item} platform="Leetcode" />
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No Leetcode bookmarks yet.
                </p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
            Loading bookmarks...
          </p>
        )}
      </div>
    </div>
  );
};
export default Bookmark;
