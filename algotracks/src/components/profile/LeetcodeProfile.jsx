import React, { useEffect, useState, useContext } from 'react';
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { getUserProfile } from '../../services/Leetcode';

const LeetcodeProfile = () => {
  const { isLoggedIn, user, loading } = useContext(AuthContext);
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [solvedProblem, setSolvedProblem] = useState([]);
  const [error, setIserror] = useState('');
  const username = user?.cpProfiles?.Leetcode;

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    try {
      const ProfileInfo = await getUserProfile(username);
      setLeetcodeData(ProfileInfo.data);
    } catch (error) {
      setIserror("Not finding user please check username");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      leetcodeData &&
      leetcodeData.submitStats &&
      leetcodeData.submitStats.acSubmissionNum
    ) {
      setSolvedProblem(leetcodeData.submitStats.acSubmissionNum);
    }
  }, [leetcodeData]);
  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg
          className="animate-spin h-12 w-12 text-green-500"
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

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (!isLoading && leetcodeData) {
    return (
      <div className="container max-w-[1200px] mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-green-500 via-green-400 to-teal-400 p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-green-600 shadow-lg mb-4 md:mb-0 md:mr-6">
                {leetcodeData.username ? leetcodeData.username.charAt(0).toUpperCase() : "?"}
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {leetcodeData.username || "LeetCoder"}
                </h1>
                <p className="text-white opacity-90 mt-1">
                  {leetcodeData.profile && leetcodeData.profile.realName ? leetcodeData.profile.realName : "Anonymous Coder"}
                </p>
                {leetcodeData.profile && leetcodeData.profile.ranking && (
                  <div className="mt-2 bg-white bg-opacity-20 px-3 py-1 rounded-full inline-block">
                    <span className="text-gray-700 font-medium">Rank: {leetcodeData.profile.ranking}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Problem Solving Statistics</h2>
            
            {solvedProblem && solvedProblem.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Easy Problems */}
                <div className="bg-green-100 rounded-lg p-4 shadow-md transition-transform hover:scale-105">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-green-800">{solvedProblem[0]?.difficulty || "Easy"}</h3>
                    <div className="bg-green-500 text-white text-sm px-2 py-1 rounded-full">
                      {solvedProblem[0]?.count || 0} solved
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-green-500 h-2.5 rounded-full" 
                        style={{ width: `${solvedProblem[0]?.count > 0 ? (solvedProblem[0]?.count / solvedProblem[0]?.submissions * 100) : 0}%` }}>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {solvedProblem[0]?.count || 0}/{solvedProblem[0]?.submissions || 0} submissions
                    </p>
                  </div>
                </div>

                {/* Medium Problems */}
                <div className="bg-yellow-100 rounded-lg p-4 shadow-md transition-transform hover:scale-105">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-yellow-800">{solvedProblem[1]?.difficulty || "Medium"}</h3>
                    <div className="bg-yellow-500 text-white text-sm px-2 py-1 rounded-full">
                      {solvedProblem[1]?.count || 0} solved
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-yellow-500 h-2.5 rounded-full" 
                        style={{ width: `${solvedProblem[1]?.count > 0 ? (solvedProblem[1]?.count / solvedProblem[1]?.submissions * 100) : 0}%` }}>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {solvedProblem[1]?.count || 0}/{solvedProblem[1]?.submissions || 0} submissions
                    </p>
                  </div>
                </div>

                {/* Hard Problems */}
                <div className="bg-red-100 rounded-lg p-4 shadow-md transition-transform hover:scale-105">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-red-800">{solvedProblem[2]?.difficulty || "Hard"}</h3>
                    <div className="bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                      {solvedProblem[2]?.count || 0} solved
                    </div>
                  </div>  
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-red-500 h-2.5 rounded-full" 
                        style={{ width: `${solvedProblem[2]?.count > 0 ? (solvedProblem[2]?.count / solvedProblem[2]?.submissions * 100) : 0}%` }}>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {solvedProblem[2]?.count || 0}/{solvedProblem[2]?.submissions || 0} submissions
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-gray-500">No problem solving data available</p>
              </div>
            )}
          </div>

          {/* Overall Statistics */}
          <div className="p-6 bg-gray-800 bg-opacity-50">
            <h2 className="text-xl font-semibold text-white mb-4">Overall Progress</h2>
            
            <div className="bg-gray-900 bg-opacity-30 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-900 bg-opacity-20 p-4 rounded-lg text-center">
                  <h3 className="text-blue-300 text-sm uppercase">Total Solved</h3>
                  <p className="text-white text-2xl font-bold mt-1">
                    {solvedProblem.reduce((acc, curr) => acc + (curr?.count || 0), 0)}
                  </p>
                </div>
                
                <div className="bg-purple-900 bg-opacity-20 p-4 rounded-lg text-center">
                  <h3 className="text-purple-300 text-sm uppercase">Acceptance Rate</h3>
                  <p className="text-white text-2xl font-bold mt-1">
                    {solvedProblem.length > 0 ? 
                      (solvedProblem.reduce((acc, curr) => acc + (curr?.count || 0), 0) / 
                      solvedProblem.reduce((acc, curr) => acc + (curr?.submissions || 0), 0) * 100).toFixed(1) : 0}%
                  </p>
                </div>
                
                <div className="bg-teal-900 bg-opacity-20 p-4 rounded-lg text-center">
                  <h3 className="text-teal-300 text-sm uppercase">Rating</h3>
                  <p className="text-white text-2xl font-bold mt-1">
                    {leetcodeData.profile && leetcodeData.profile.starRating ? leetcodeData.profile.starRating : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default LeetcodeProfile;