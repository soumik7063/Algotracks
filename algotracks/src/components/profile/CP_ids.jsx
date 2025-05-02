import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../AuthContext";

const CP_ids = ({ platform }) => {
  const { isLoggedIn, user, loading } = useContext(AuthContext);
  const [platformId, setPlatformId] = useState("");
  const [isEditable, setIsEditable] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  useEffect(() => {
    if (user && user.cpProfiles && user.cpProfiles[platform]) {
      setPlatformId(user.cpProfiles[platform]);
    }
  }, [user, platform]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsEditable(!isEditable);
    
    if (!isEditable) {
      try {
        const response = await fetch("http://localhost:3000/auth/update", {
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
        console.log(success)
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
      }
    }
  };

  return (
    <div className="mb-4">
      <label className="flex flex-col">
        {errorMsg && (
          <div className="mx-8 mt-4 p-2 bg-red-100 text-red-700 rounded-md text-center">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mx-8 mt-4 p-2 bg-green-100 text-green-700 rounded-md text-center">
            {successMsg}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex justify-between items-center">
          <div>
            <span className="font-medium">{platform} ID: </span>
            <input
              className="border border-gray-300 px-3 py-2 mt-1 text-base rounded-md"
              name={platform}
              value={platformId}
              onChange={(e) => setPlatformId(e.target.value)}
              type="text"
              placeholder={`${platform} ID`}
              disabled={!isEditable}
            />
          </div>
          <button
            type="submit"
            className='px-4 py-2 text-white cursor-pointer border shadow rounded-md bg-green-400'
          >
            Save
          </button>
          <button onClick={()=>setIsEditable((prev)=>!prev)} className="px-4 py-2 text-white cursor-pointer border shadow rounded-md bg-blue-600">Edit</button>
        </form>
      </label>
    </div>
  );
};  

export default CP_ids;