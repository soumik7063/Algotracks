import React from 'react'
import Benifits from './Benifits'
import { fadeIn } from '../framer_motion/variant'
import { motion } from "framer-motion";
import { CiBookmarkCheck } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { VscAccount } from "react-icons/vsc";
import { LuBrain } from "react-icons/lu";
const Feature = () => {
  return (
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

          <div className="grid md:grid-cols-4 gap-8">
            <Benifits heading="Track Profiles" logo={<VscAccount/>} text="Track all your competitive programming profiles in one place. See your ratings, solved problems, and progress across platforms." />
            <Benifits heading="Upcoming Contests" logo={<SlCalender/>} text="Never miss a coding contest again. Get a comprehensive calendar of upcoming contests from all major platforms." />
            <Benifits heading="Bookmark Contests" logo={<CiBookmarkCheck/>} text="Bookmark interesting contests and get reminders before they start. Organize your competitive programming schedule efficiently." />
            <Benifits heading="Question Recomendation" logo={<LuBrain/>} text="Automatic Question recomender finds your rating and checks in which topics you feel difficulty and based on this calculation provide some questions" />
          </div>
        </motion.div>
      </section>
  )
}

export default Feature