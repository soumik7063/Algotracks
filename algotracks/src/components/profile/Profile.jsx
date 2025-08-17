import React, { useContext, useState } from "react";
import CodeforceProfile from "./CodeforceProfile";
import LeetcodeProfile from "./LeetcodeProfile";
import UpdateProfile from "./UpdateProfile";
import { AuthContext } from "../../AuthContext";
import {motion} from 'framer-motion'
import {fadeIn}  from '../../framer_motion/variant.js'
import {  useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const {isLoggedIn, checkLoginStatus,isLoading } = useContext(AuthContext);
  const handelToggle = async() => {
     window.location.reload();
     try {
        setTimeout( async() => {
          await checkLoginStatus()
        }, 500);
     } catch (error) {
      console.log(error)
     } 
  };
  return (
    
    <div className="bg-gray-800">
      <div className="flex justify-between ">
        {
          !isLoggedIn && navigate('/signup')
        }
        <div className="mt-20 border w-fit text-white px-4 py-2 max-w-[1200px] font-semibold cursor-pointer mx-auto rounded-md bg-blue-600 hover:scale-105 transition-all duration-300 drop-shadow-2xl">
          <button onClick={()=>setToggle((prev)=>!prev)}>Update Profile</button>
        </div>
        <div className="mt-20 text-white border w-fit px-4 py-2 max-w-[1200px] font-semibold cursor-pointer mx-auto rounded-md bg-gradient-to-l bg-blue-600 hover:scale-105 transition-all duration-300 shadow-2xl">
          <button onClick={handelToggle} >{isLoading ?'Refreshing...':'Refresh'}</button>
        </div>
      </div>
      {toggle ? (
        <UpdateProfile />
      ) : (
        <motion.div
         variants={fadeIn(`down`, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0 }}
         className="bg-gray-700 grid grid-cols-1 md:grid-cols-2 mx-2 p-4">
          <CodeforceProfile />
          <LeetcodeProfile />
        </motion.div>
      )}
    </div>
  );
};

export default Profile;
