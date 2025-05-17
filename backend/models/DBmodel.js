import mongoose from "mongoose";
import bcrypt from "bcrypt";

// const mongoURI = "mongodb+srv://ghataksoumik7063:NQQfSrObh8sJFM45@algotracks.79l0nt1.mongodb.net/?retryWrites=true&w=majority&appName=algotracks";

// mongoose.connect(mongoURI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ Connection failed:", err));
const contestDetails = new mongoose.Schema(
  {
    contestID: {
      type: [Number],
      default: [],
    },
  },
  { _id: false }
);
const bookmarkschema = new mongoose.Schema({
  Codeforce: contestDetails,
  Codechef: contestDetails,
  Leetcode: contestDetails,
  Atcoder: contestDetails,
});
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    bookmarks: {
      Codeforce:{type: [String],default:[]},
      Codechef:{type: [String],default:[]},
      Leetcode:{type: [String],default:[]},
      Atcoder:{type: [String],default:[]},
    },
    cpProfiles: {
      Codeforce: { type: String, default: "" },
      Leetcode: { type: String, default: "" },
      Codechef: { type: String, default: "" },
      Atcoder: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
