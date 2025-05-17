import mongoose from "mongoose";
import User from './DBmodel.js'
const mongoURI = "mongodb+srv://soumikghatak7063:wRAnpdxpPJu4uFXc@algotracks.ulibk4v.mongodb.net/?retryWrites=true&w=majority&appName=algotracks";
mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Connection failed:", err));


