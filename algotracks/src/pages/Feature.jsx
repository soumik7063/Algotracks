import React from 'react'
import { fadeIn } from '../framer_motion/variant'
import { motion } from "framer-motion";
import { CiBookmarkCheck } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { VscAccount } from "react-icons/vsc";
import { LuBrain } from "react-icons/lu";

const benefits = [
  {
    heading: "Track Profiles",
    logo: <VscAccount />,
    text: "Track all your competitive programming profiles in one place. See your ratings, solved problems, and progress across platforms.",
    accent: "from-blue-500 to-cyan-400",
    glow: "rgba(59,130,246,0.15)",
  },
  {
    heading: "Upcoming Contests",
    logo: <SlCalender />,
    text: "Never miss a coding contest again. Get a comprehensive calendar of upcoming contests from all major platforms.",
    accent: "from-violet-500 to-purple-400",
    glow: "rgba(139,92,246,0.15)",
  },
  {
    heading: "Bookmark Contests",
    logo: <CiBookmarkCheck />,
    text: "Bookmark interesting contests and get reminders before they start. Organize your competitive programming schedule efficiently.",
    accent: "from-emerald-500 to-teal-400",
    glow: "rgba(16,185,129,0.15)",
  },
  {
    heading: "Question Recommendation",
    logo: <LuBrain />,
    text: "Smart recommender finds your weak topics based on your rating and past performance, then surfaces targeted practice questions.",
    accent: "from-rose-500 to-pink-400",
    glow: "rgba(244,63,94,0.15)",
  },
];

const Benefits = ({ heading, text, logo, accent, glow }) => {
  return (
    <motion.div
      variants={fadeIn('up', 0.15)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      className="group relative rounded-2xl border border-slate-800 bg-[#080f1e] p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-slate-700"
      style={{ boxShadow: `0 0 0 0 ${glow}`, transition: 'box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = `0 8px 40px ${glow}`}
      onMouseLeave={e => e.currentTarget.style.boxShadow = `0 0 0 0 ${glow}`}
    >
      {/* Top gradient bar */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Icon container */}
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${accent} bg-opacity-10 mb-5 text-2xl text-white shadow-lg`}>
        {logo}
      </div>

      <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
        {heading}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed">
        {text}
      </p>

      {/* Subtle corner glow */}
      <div
        className={`absolute -bottom-8 -right-8 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${accent}`}
        style={{ filter: 'blur(32px)' }}
      />
    </motion.div>
  );
};

const Feature = () => {
  return (
    <section className="relative py-24 px-4 bg-[#050d1a] overflow-hidden">

      {/* Background ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-blue-600 opacity-[0.06] blur-[80px] rounded-full pointer-events-none" />

      <motion.div
        variants={fadeIn('down', 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Section label */}
        <div className="flex justify-center mb-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 px-4 py-1.5 rounded-full border border-blue-500/25 bg-blue-500/10">
            Platform Features
          </span>
        </div>

        <h2 className="text-4xl font-extrabold text-center mb-4 text-white tracking-tight">
          Why Use Our Platform?
        </h2>
        <p className="text-center text-slate-500 text-base mb-14 max-w-xl mx-auto">
          Everything you need to stay ahead in competitive programming — all in one place.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b) => (
            <Benefits key={b.heading} {...b} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Feature;