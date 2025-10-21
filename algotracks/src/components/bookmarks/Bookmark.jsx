import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext";
import CodeforceBookmarks from "./CodeforceBookmarks";
import LeetcodeBookmarks from "./LeetcodeBookmarks";

const Bookmark = () => {
  const [greetmsg, setGreetmsg] = useState("");
  const [bookmarks, setBookmarks] = useState(null);
  const { user, isLoading } = useContext(AuthContext);

  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    if (currentHour >= 12 && currentHour < 16) setGreetmsg("Good Afternoon");
    else if (currentHour >= 16 && currentHour <= 23) setGreetmsg("Good Evening");
    else setGreetmsg("Good Morning");
  }, []);

  useEffect(() => {
    if (!user || !user.bookmarks) {
      setBookmarks(null);
      return;
    }

    const copiedBookmarks = JSON.parse(JSON.stringify(user.bookmarks));
    for (const key in copiedBookmarks) {
      if (Array.isArray(copiedBookmarks[key])) {
        copiedBookmarks[key].sort((a, b) => {
          const timeA = a.startTimeSeconds || a.startTime;
          const timeB = b.startTimeSeconds || b.startTime;
          return timeA - timeB;
        });
      }
    }
    setBookmarks(copiedBookmarks);
  }, [user]);

  if (isLoading) {
    return <p className="mt-20 text-center text-gray-500 dark:text-gray-400 text-lg">Loading user data...</p>;
  }

  if (!user) {
    return <p className="mt-20 text-center text-gray-500 dark:text-gray-400 text-lg">No user found. Please log in.</p>;
  }

  if (!bookmarks) {
    return <p className="mt-20 text-center text-gray-500 dark:text-gray-400 text-lg">No bookmarks found. please refresh once</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 sm:p-6 lg:p-8 mt-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {greetmsg} {user?.name || "Guest"} 👋
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CodeforceBookmarks platform="Codeforces" bookmarks={bookmarks} />
          <LeetcodeBookmarks platform="Leetcode" bookmarks={bookmarks} />
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
