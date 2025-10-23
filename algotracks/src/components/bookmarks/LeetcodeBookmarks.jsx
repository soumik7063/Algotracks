import React from "react";
import ContestCard from "./ContestCard";

const LeetcodeBookmarks = ({platform,bookmarks}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 border-b-2 border-green-500 pb-2">
        {platform} Bookmarks
      </h2>
      {bookmarks?.Leetcode?.length > 0 ? (
        bookmarks.Leetcode.map((item, idx) => {
          return <ContestCard key={idx} item={item} />;
        })
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          No {platform} bookmarks yet.
        </p>
      )}
    </div>
  );
};

export default LeetcodeBookmarks;
