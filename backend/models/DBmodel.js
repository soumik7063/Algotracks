import mongoose from "mongoose";
import bcrypt from 'bcrypt'

// const mongoURI = "mongodb+srv://ghataksoumik7063:NQQfSrObh8sJFM45@algotracks.79l0nt1.mongodb.net/?retryWrites=true&w=majority&appName=algotracks";

// mongoose.connect(mongoURI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ Connection failed:", err));


const userSchema = new mongoose.Schema({
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
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    bookmarks: {
      type: [Object], // or [ObjectId] if referencing
      default: []
    },
    cpProfiles: {
        Codeforce: { type: String, default: '' },
        Leetcode: { type: String, default: '' },
        Codechef: { type: String, default: '' },
        Atcoder: { type: String, default: '' },
    }
  }, { timestamps: true });
  

// userSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) return next();
    
//     try {
//       const salt = await bcrypt.genSalt(10);
//       this.password = await bcrypt.hash(this.password, salt);
//       next();
//     } catch (error) {
//       next(error);
//     }
// });

const User = mongoose.model('User',userSchema);
export default User