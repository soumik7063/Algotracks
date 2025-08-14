import { useEffect, useRef, useState } from "react";

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

const formatTimeRemaining = (seconds) => {
  if (seconds <= 0) {
    return "Started";
  }

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor((seconds % 3600) % 60); // Corrected calculation for seconds

  const pad = (num) => String(num).padStart(2, '0');

  if (days > 0) {
    return `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(remainingSeconds)}s`;
  } else if (hours > 0) {
    return `${pad(hours)}h ${pad(minutes)}m ${pad(remainingSeconds)}s`;
  } else if (minutes > 0) {
    return `${pad(minutes)}m ${pad(remainingSeconds)}s`;
  } else {
    return `${pad(remainingSeconds)}s`;
  }
};
const ContestCard = ({ contest, updateBookmark, isBookmarkLoading ,bookmarked}) => {
  // console.log(contest)
   const [timeRemaining, setTimeRemaining] = useState(() => {
    const now = Math.floor(Date.now() / 1000);
    return contest.startTimeSeconds - now;
  });

  const intervalRef = useRef(null);

  useEffect(() => {
    if (timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prevTime => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            clearInterval(intervalRef.current); 
            return 0; 
          }
          return newTime;
        });
      }, 1000); 
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [contest.startTimeSeconds, timeRemaining]); 
  const displayTime = formatTimeRemaining(timeRemaining);
  const hours = Math.floor(contest.durationSeconds / 3600);
  const minutes = Math.floor((contest.durationSeconds % 3600) / 60);
  return (
    <div
      key={contest.id}
      className="bg-gradient-to-r from-[#1b1a1a] via-[#203542] to-[#5A5D85] border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="md:flex">
        <div className="md:flex-shrink-0 flex items-center justify-center bg-white text-blue-700 font-semibold p-4 md:w-32">
          <div className="text-center">
            <div className="text-sm uppercase tracking-wide">Starts in</div>
            <div className="text-lg font-bold">{displayTime}</div>
          </div>
        </div>

        <div className="p-4 md:p-6 flex-1">
          <a
            href={`https://codeforces.com/contest/${contest.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg md:text-xl font-semibold text-white hover:text-blue-800 hover:underline transition mb-2 inline-block"
          >
            {contest.name}
          </a>
          <div className="flex justify-between">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 w-full">
              <div>
                <span className="block text-sm text-white">Start Time</span>
                <span className="font-medium text-white">
                  {formatDate(contest.startTimeSeconds)}
                </span>
              </div>

              <div>
                <span className="block text-sm text-gray-200">Duration</span>
                <span className="font-medium text-white">{`${hours}h ${minutes}m`}</span>
              </div>

              <div>
                <span className="block text-sm text-white">Contest ID</span>
                <span className="font-medium text-white">{contest.id}</span>
              </div>
            </div>
            <div
              onClick={() => updateBookmark(contest)}
              className="text-3xl font-bold cursor-pointer"
              style={{
                color: bookmarked[contest.id] ? "#FFD700" : "#808080",
              }}
            >
              ★
              {isBookmarkLoading ? (
                <span className="text-base">saving... </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;
