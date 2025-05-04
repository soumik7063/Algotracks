import React, { useContext, useState } from "react";
import CodeforceProfile from "./CodeforceProfile";
import LeetcodeProfile from "./LeetcodeProfile";
import UpdateProfile from "./UpdateProfile";
import { AuthContext } from "../../AuthContext";

const Profile = () => {
  const [toggle, setToggle] = useState(false);
  const { checkLoginStatus,isLoading } = useContext(AuthContext);
  const handelToggle = async() => {
     try {
        setTimeout( async() => {
          await checkLoginStatus()
        }, 500);
     } catch (error) {
      console.log(error)
     } 
  };
  return (
    <div>
      <div className="flex justify-between">
        <div className="mt-20 border w-fit px-4 py-2 max-w-[1200px] font-semibold cursor-pointer mx-auto rounded-md bg-green-200 hover:scale-105 transition-all duration-300 drop-shadow-2xl">
          <button onClick={()=>setToggle((prev)=>!prev)}>Update Profile</button>
        </div>
        <div className="mt-20 border w-fit px-4 py-2 max-w-[1200px] font-semibold cursor-pointer mx-auto rounded-md bg-gradient-to-l bg-yellow-100 hover:scale-105 transition-all duration-300 shadow-2xl">
          <button onClick={handelToggle} >{isLoading ?'Refreshing...':'Refresh'}</button>
        </div>
      </div>
      {toggle ? (
        <UpdateProfile />
      ) : (
        <div>
          <CodeforceProfile />
          <LeetcodeProfile />
        </div>
      )}
    </div>
  );
};

export default Profile;
