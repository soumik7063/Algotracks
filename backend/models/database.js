import mongoose from "mongoose";
import User from './DBmodel.js'
const mongoURI = "mongodb+srv://ghataksoumik7063:NQQfSrObh8sJFM45@algotracks.79l0nt1.mongodb.net/?retryWrites=true&w=majority&appName=algotracks";
mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Connection failed:", err));


