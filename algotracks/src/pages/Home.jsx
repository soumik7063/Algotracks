import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../framer_motion/variant";

const Benifits = ({ text }) => {
  return (
    <div
      variants={fadeIn(`down`, 0.3)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0 }}
      className="bg-gray-900 p-6 rounded-lg shadow-md"
    >
      <div className="text-blue-600 text-4xl mb-4">🗓️</div>
      <h3 className="text-xl font-semibold mb-3 text-white">
        Contest Calendar
      </h3>
      <h1 className="text-gray-200">{text}</h1>
    </div>
  );
};
const Home = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!username.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Fetch user data from Codeforces API
      const response = await fetch(
        `https://codeforces.com/api/user.info?handles=${username}`
      );
      const data = await response.json();

      if (data.status === "OK") {
        setUserData(data.result[0]);
      } else {
        setError("User not found. Please check the username and try again.");
      }
    } catch (err) {
      setError("Failed to fetch user data. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
    
    className="min-h-screen bg-gray-800 ">
      {/* Hero Section */}
      <section className="bg-gradient-to-tr from-[#08275C] to-[#2B2B2B] text-white py-20 px-4 mt-5">
        <motion.div 
        variants={fadeIn(`down`, 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0 }}
        className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">
            Track Your Competitive Programming Journey
          </h1>
          <p className="text-xl mb-8">
            Your all-in-one platform for monitoring progress across Codeforces,
            LeetCode, CodeChef, and more. Never miss a contest and keep all your
            CP profiles in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/profile"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              View Your Dashboard
            </Link>
            <Link
              to="/contests"
              className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition"
            >
              Upcoming Contests
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <motion.div 
        variants={fadeIn(`down`, 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0 }}
        className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Why Use Our Platform?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Benifits text="Track all your competitive programming profiles in one place. See your ratings, solved problems, and progress across platforms." />
            <Benifits text="Never miss a coding contest again. Get a comprehensive calendar of upcoming contests from all major platforms." />
            <Benifits text="Bookmark interesting contests and get reminders before they start. Organize your competitive programming schedule efficiently." />
          </div>
        </motion.div>
      </section>

      {/* Codeforces Search Section */}
      <section className="py-16 px-4 bg-gray-700">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-200">
            Quick Codeforces Lookup
          </h2>
          <p className="text-center text-gray-300 mb-8">
            Want to check someone's Codeforces stats quickly? Enter their
            username below.
          </p>

          <div className="bg-gray-800 p-8 rounded-lg shadow-md">
            <form
              onSubmit={handleSearch}
              className="flex flex-col md:flex-row gap-4 mb-6"
            >
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Codeforces username"
                className="flex-1 px-4 py-3 border text-gray-200 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                disabled={isLoading}
              >
                {isLoading ? "Searching..." : "Search"}
              </button>
            </form>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {userData && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  {userData.titlePhoto && (
                    <img
                      src={userData.titlePhoto}
                      alt={`${userData.handle}'s profile`}
                      className="w-16 h-16 rounded-full"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-bold">
                      {userData.handle}
                      {userData.rank && (
                        <span
                          className={`ml-2 text-sm px-2 py-1 rounded ${getRankColor(
                            userData.rank
                          )}`}
                        >
                          {userData.rank}
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-600">
                      {userData.firstName} {userData.lastName}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <div className="text-sm text-gray-600">Rating</div>
                    <div className="font-bold text-lg">
                      {userData.rating || "N/A"}
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded border border-gray-200">
                    <div className="text-sm text-gray-600">Max Rating</div>
                    <div className="font-bold text-lg">
                      {userData.maxRating || "N/A"}
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded border border-gray-200">
                    <div className="text-sm text-gray-600">Country</div>
                    <div className="font-bold text-lg">
                      {userData.country || "N/A"}
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded border border-gray-200">
                    <div className="text-sm text-gray-600">Contribution</div>
                    <div className="font-bold text-lg">
                      {userData.contribution || "N/A"}
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <a
                    href={`https://codeforces.com/profile/${userData.handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Full Profile on Codeforces
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper function to get color class based on Codeforces rank
const getRankColor = (rank) => {
  const rankColors = {
    newbie: "bg-gray-200 text-gray-800",
    pupil: "bg-green-200 text-green-800",
    specialist: "bg-cyan-200 text-cyan-800",
    expert: "bg-blue-200 text-blue-800",
    "candidate master": "bg-purple-200 text-purple-800",
    master: "bg-orange-200 text-orange-800",
    "international master": "bg-orange-200 text-orange-800",
    grandmaster: "bg-red-200 text-red-800",
    "international grandmaster": "bg-red-200 text-red-800",
    "legendary grandmaster": "bg-red-200 text-red-800",
  };

  return rankColors[rank.toLowerCase()] || "bg-gray-200 text-gray-800";
};

export default Home;
