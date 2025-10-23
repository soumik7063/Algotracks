import React from 'react'
import { fadeIn } from '../framer_motion/variant'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
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
              className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:text-gray-00 hover:bg-blue-500 hover:bg-opacity-10 transition"
            >
              Upcoming Contests
            </Link>
          </div>
        </motion.div>
      </section>
  )
}

export default HeroSection