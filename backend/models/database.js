import mongoose from "mongoose";
import User from './DBmodel.js'
const mongoURI = "mongodb+srv://soumikghatak7063:83ClFwdmKwTEcikj@algotracks.ulibk4v.mongodb.net/";
// const mongoURI = "mongodb+srv://ghataksoumik7063:Fge8pq9HVW5jnOHM@algotracks.79l0nt1.mongodb.net/";

mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Connection failed:", err));


