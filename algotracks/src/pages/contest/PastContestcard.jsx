import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../framer_motion/variant.js";
const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
const PastContestcard = ({contest}) => {
  const hours = Math.floor(contest.durationSeconds / 3600);
  const minutes = Math.floor((contest.durationSeconds % 3600) / 60);
  return (
    <motion.div
    variants={fadeIn(`up`, 0.1)}
    initial="hidden"
    whileInView="show"
    viewport={{ once: false, amount: 0 }}
      key={contest.id}
      className="bg-gradient-to-r from-[#212122] via-[#343865] to-[#121b44] border border-gray-500 rounded-lg overflow-hidden hover:shadow-sm transition-shadow"
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <a
            href={`https://codeforces.com/contest/${contest.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-md font-medium text-white hover:text-blue-500 hover:underline transition"
          >
            {contest.name}
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 text-sm">
          <div className="text-gray-400">
            <span className="font-medium">Date:</span>{" "}
            {formatDate(contest.startTimeSeconds)}
          </div>
          <div className="text-gray-400">
            <span className="font-medium">Duration:</span>{" "}
            {`${hours}h ${minutes}m`}
          </div>
          <div className="text-gray-400">
            <span className="font-medium">ID:</span> {contest.id}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PastContestcard;
