import React from "react";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Contest from "./pages/Contest";
import CodeforcesContest from "./pages/contest/codeforcesContest";
import Signup from "./pages/Signup";
import Profile from "./components/profile/Profile";
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route loader={CodeforcesContest} path='/contests' element={<Contest/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
      </Routes>
    </div>
  );
};  

export default App;
