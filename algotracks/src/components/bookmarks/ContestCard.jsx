 const formatDate = (timestamp) => {
    const actualTimestamp =
      String(timestamp).length === 10 ? timestamp * 1000 : timestamp;
    const date = new Date(actualTimestamp);
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
const getTimeRemaining = (startTime) => {
    const actualStartTime =
      String(startTime).length === 10 ? startTime * 1000 : startTime;
    const now = Date.now(); // Current time in milliseconds
    const timeRemaining = Math.floor((actualStartTime - now) / 1000); // Remaining time in seconds

    if (timeRemaining <= 0) return "Started";

    const days = Math.floor(timeRemaining / 86400);
    const hours = Math.floor((timeRemaining % 86400) / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);

    if (days > 0) {
      return `${days}d ${hours}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

const ContestCard = ({ item }) => {
    const contestName =  item.name ;
    const contestStartTime = item.startTimeSeconds ;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 transform transition-transform duration-200 hover:scale-105">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {contestName}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
          <span className="font-medium">Starts:</span>{" "}
          {formatDate(contestStartTime)}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          <span className="font-medium">Remaining:</span>{" "}
          {getTimeRemaining(contestStartTime)}
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full text-sm transition duration-300">
          Notify 🔔
        </button>
      </div>
    );
  };

  export default ContestCard;