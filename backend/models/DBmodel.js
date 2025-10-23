import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";

// const mongoURI = "mongodb+srv://ghataksoumik7063:NQQfSrObh8sJFM45@algotracks.79l0nt1.mongodb.net/?retryWrites=true&w=majority&appName=algotracks";

// mongoose.connect(mongoURI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ Connection failed:", err));

const CodeforceSchema = new mongoose.Schema({

})
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
    token:{
      type:String,
      default:""
    },
    bookmarks: {
      Codeforce:{type: [Object],default:[]},
      Codechef:{type: [String],default:[]},
      Leetcode:{type: [Object],default:[]},
      Atcoder:{type: [String],default:[]},
    },
    cpProfiles: {
      Codeforce: { type: String, default: "" },
      Leetcode: { type: String, default: "" },
      Codechef: { type: String, default: "" },
      Atcoder: { type: String, default: "" },
    },
    cfProblems: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
