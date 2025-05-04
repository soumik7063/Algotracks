import User from '../models/DBmodel.js'


export const updateBookmark = async (req, res) => {
    try {
      const { _id, platform, contestID, operation } = req.body;
  
      if (!_id || !platform || operation === undefined || contestID === undefined) {
        return res.status(400).json({ 
          message: "Missing required fields", 
          success: false 
        });
      }
  
      const existingUser = await User.findById(_id);
      if (!existingUser) {
        return res.status(404).json({ 
          message: "User not found", 
          success: false 
        });
      }
  
      if (operation) {
        const alreadyBookmarked = existingUser.bookmarks.some(
          (b) => b.platform === platform && b.contestID === contestID
        );
        if (!alreadyBookmarked) {
          existingUser.bookmarks.push({ platform, contestID });
        }
      } else {
        existingUser.bookmarks = existingUser.bookmarks.filter(
          (b) => !(b.platform === platform && b.contestID === contestID)
        );
      }
  
      await existingUser.save();
  
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
  