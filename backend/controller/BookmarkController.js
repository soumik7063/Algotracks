import User from '../models/DBmodel.js';

const validPlatforms = ['Codeforce', 'Codechef', 'Leetcode', 'Atcoder'];

export const updateBookmark = async (req, res) => {
  try {
    const { _id, platform, contestID, operation } = req.body;

    if (!_id || !platform || operation === undefined || contestID === undefined) {
      return res.status(400).json({
        message: "Missing required fields",
        success: false
      });
    }

    if (!validPlatforms.includes(platform)) {
      return res.status(400).json({
        message: "Invalid platform name",
        success: false
      });
    }

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    // Ensure the array exists (fallback safety)
    if (!Array.isArray(user.bookmarks[platform])) {
      user.bookmarks[platform] = [];
    }

    if (operation) {
      if (!user.bookmarks[platform].includes(contestID)) {
        user.bookmarks[platform].push(contestID);
      }
    } else {
      console.log(typeof(contestID))
      console.log(user.bookmarks)
      user.bookmarks[platform] = user.bookmarks[platform].filter(id => id !== contestID);
      console.log(user.bookmarks)
    }

    await user.save();

    return res.status(200).json({
      message: "Bookmark list updated successfully",
      success: true,
    });

  } catch (error) {
    console.error("Error in updateBookmark:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};
