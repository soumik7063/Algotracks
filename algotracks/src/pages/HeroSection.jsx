import React from 'react'
import { fadeIn } from '../framer_motion/variant'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#050d1a] text-white py-28 px-4 mt-5">

      {/* Ambient glow orbs */}
      <div className="absolute top-[-80px] left-[-80px] w-[420px] h-[420px] rounded-full bg-blue-600 opacity-10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-60px] right-[-60px] w-[360px] h-[360px] rounded-full bg-indigo-500 opacity-10 blur-[100px] pointer-events-none" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <motion.div
        variants={fadeIn('down', 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0 }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Badge pill */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium tracking-wide">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          Competitive Programming Tracker
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
          Track Your{' '}
          <span className="relative inline-block">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #38bdf8 100%)',
              }}
            >
              CP Journey
            </span>
            {/* Underline accent */}
            <span
              className="absolute left-0 -bottom-1 h-[3px] w-full rounded-full opacity-60"
              style={{
                backgroundImage: 'linear-gradient(90deg, #60a5fa, #a78bfa)',
              }}
            />
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Your all-in-one platform for monitoring progress across{' '}
          <span className="text-white font-medium">Codeforces</span>,{' '}
          <span className="text-white font-medium">LeetCode</span>,{' '}
          <span className="text-white font-medium">CodeChef</span>, and more.
          Never miss a contest and keep all your profiles in one place.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/profile"
            className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_28px_rgba(96,165,250,0.4)]"
            style={{
              background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
            }}
          >
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M13 5v14" />
            </svg>
            View Your Dashboard
          </Link>

          <Link
            to="/contests"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm border border-slate-600 text-slate-300 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-blue-500/50 hover:text-white hover:bg-white/10"
          >
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Upcoming Contests
          </Link>
        </div>

        {/* Platform logos row */}
        <div className="mt-14 flex flex-wrap justify-center items-center gap-6">
          <span className="text-xs text-slate-600 uppercase tracking-widest">Supports</span>
          {['Codeforces', 'LeetCode', 'CodeChef', 'AtCoder', 'HackerRank'].map((platform) => (
            <span
              key={platform}
              className="text-xs font-semibold text-slate-500 px-3 py-1.5 rounded-md border border-slate-700 bg-slate-800/50 hover:text-slate-300 hover:border-slate-600 transition-colors duration-200 cursor-default"
            >
              {platform}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;