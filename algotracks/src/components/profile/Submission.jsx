import { Link } from "react-router-dom";
import {motion} from 'framer-motion'
import {fadeIn}  from '../../framer_motion/variant.js'
const formateTime = (milliseconds) => {
  const date = new Date(milliseconds*1000);
  return date.toLocaleTimeString();
};

const formateDate = (milliseconds) => {
  const date = new Date(milliseconds*1000);
  return date.toLocaleDateString();
};

export const Submission = ({ title, time, status }) => {
  return (
    <motion.div 
    variants={fadeIn(`up`, 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0 }}
    className="grid grid-cols-5 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4  items-center">
      <div className="col-span-2">
        <h3 className="text-lg  font-semibold text-gray-900 dark:text-white truncate">
          <Link  
          target="_blank"
          rel="noopener noreferrer"
          to={`https://leetcode.com/problems/${String(title).toLowerCase().replace(/ /g,"-")}/description/`}>{title}</Link>
        </h3>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
          {formateDate(time)}
        </p>
       </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {formateTime(time)}
        </p>
      </div>
      <div className="text-center">
        <p className={`${(status === "Accepted") ? "text-green-400" : "text-red-400"} text-sm font-medium`}>
          {status}
        </p>
      </div>
    </motion.div>
  );
};