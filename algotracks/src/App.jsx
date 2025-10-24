import React from "react";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Contest from "./pages/Contest";
import CodeforcesContest from "./pages/contest/CodeforcesContest";
import Signup from "./pages/Signup";
import Profile from "./components/profile/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Bookmark from "./components/bookmarks/Bookmark";
import ForgetPassword from "./components/ResetPassword/ForgetPassword";
import Resetpassword from "./components/ResetPassword/Resetpassword";
import ChatBot from "./components/chatbot/ChatBot";
import Recomend from "./components/recomend/Recomend";
const App = () => {
  return (
    <div>
      <Navbar />
      <ChatBot/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route loader={CodeforcesContest} path='/contests' element={<Contest/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
        }></Route>
        <Route path='/bookmarks' element={
          <ProtectedRoute>
            <Bookmark/>
          </ProtectedRoute>
        }></Route>
        <Route path='/recomend' element={
          <ProtectedRoute>
            <Recomend/>
          </ProtectedRoute>
        }></Route>
        <Route path="/forget_password" element={<ForgetPassword/>}></Route>
        <Route path="/reset_password" element={<Resetpassword/>}></Route>
      </Routes>
    </div>
  );
};  

export default App;
