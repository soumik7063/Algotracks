import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../AuthContext";

const CP_ids = ({ platform }) => {
  const { isLoggedIn, user, loading } = useContext(AuthContext);
  const [platformId, setPlatformId] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (platform === "name" && user && user.name) {
      setPlatformId(user.name);
    } else if (platform === "email" && user && user.email) {
      setPlatformId(user.email);
    } else if (user && user.cpProfiles && user.cpProfiles[platform]) {
      setPlatformId(user.cpProfiles[platform]);
    }
  }, [user, platform]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isEditable) {
      setIsSaving(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            platform,
            platformID: platformId,
          }),
        });

        const res = await response.json();
        const { message, success } = res;
        
        if (success) {
          setSuccessMsg(message);
          setTimeout(() => setSuccessMsg(""), 3000);
        } else {
          setErrorMsg(message || "Failed to update profile");
          setTimeout(() => setErrorMsg(""), 3000);
        }
      } catch (error) {
        setErrorMsg("An error occurred. Please try again.");
        console.error(error);
        setTimeout(() => setErrorMsg(""), 3000);
      } finally {
        setIsEditable(false);
        setIsSaving(false);
      }
    }
  };

  // Platform-specific styling
  const getPlatformColor = () => {
    switch(platform.toLowerCase()) {
      case "leetcode": return "from-green-500 to-green-600";
      case "codeforce": return "from-blue-500 to-blue-600";
      case "codechef": return "from-yellow-600 to-yellow-700";
      case "hackerrank": return "from-green-600 to-green-700";
      case "name": return "from-purple-500 to-purple-600";
      case "email": return "from-indigo-500 to-indigo-600";
      default: return "from-gray-500 to-gray-600";
    }
  };

  const getPlatformIcon = () => {
    switch(platform.toLowerCase()) {
      case "leetcode": return "🏆";
      case "codeforce": return "📊";
      case "codechef": return "👨‍🍳";
      case "hackerrank": return "💻";
      case "name": return "👤";
      case "email": return "✉️";
      default: return "🔗";
    }
  };

  const handleEditClick = (e) => {
    e.preventDefault(); // Prevent any form submission
    setIsEditable(true);
  };

  const handleCancelClick = (e) => {
    e.preventDefault(); // Prevent any form submission
    setIsEditable(false);
    // Reset to original value
    if (platform === "name" && user && user.name) {
      setPlatformId(user.name);
    } else if (platform === "email" && user && user.email) {
      setPlatformId(user.email);
    } else if (user && user.cpProfiles && user.cpProfiles[platform]) {
      setPlatformId(user.cpProfiles[platform]);
    } else {
      setPlatformId("");
    }
  };

  return (
    <div className="mb-6 transition-all duration-300 transform hover:scale-[1.01]">
      <div className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-100`}>
        <div className={`bg-gradient-to-r ${getPlatformColor()} px-4 py-3 flex items-center`}>
          <span className="text-xl mr-2">{getPlatformIcon()}</span>
          <h3 className="text-white font-medium">{platform} ID</h3>
        </div>
        
        <div className="p-4">
          {(errorMsg || successMsg) && (
            <div className={`mb-4 p-3 rounded-md ${errorMsg ? 'bg-red-50 border-l-4 border-red-500 text-red-700' : 'bg-green-50 border-l-4 border-green-500 text-green-700'} flex items-center`}>
              <span className="text-lg mr-2">{errorMsg ? '⚠️' : '✅'}</span>
              <p>{errorMsg || successMsg}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-grow w-full">
              <div className="relative rounded-md shadow-sm">
                <input
                  className={`block w-full pr-10 border-gray-300 focus:ring-2 focus:ring-offset-2 ${isEditable ? 'bg-white border-blue-300 focus:ring-blue-500' : 'bg-gray-50'} rounded-md py-2 px-3 text-gray-700 leading-5 transition-colors duration-200 ease-in-out ${!isEditable && 'cursor-not-allowed'}`}
                  name={platform}
                  value={platformId}
                  onChange={(e) => setPlatformId(e.target.value)}
                  type="text"
                  placeholder={`Enter your ${platform} ID`}
                  readOnly={!isEditable}
                  onDoubleClick={handleEditClick}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-400">
                    {isEditable ? "✏️" : "🔒"}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              {isEditable ? (
                <>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-md shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <span>💾</span>
                        <span>Save</span>
                      </>
                    )}
                  </button>
                
                  <button
                    type="button" // Important: type="button" prevents form submission
                    onClick={handleCancelClick}
                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    <span>❌</span>
                    <span>Cancel</span>
                  </button>
                </>
              ) : (
                <button
                  type="button" // Important: type="button" prevents form submission
                  onClick={handleEditClick}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-md shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span>✏️</span>
                  <span>Edit</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CP_ids;