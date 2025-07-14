import mongoose from "mongoose";
import { MONGO_URI, NODE_ENV } from "../config/env.js";

export const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Connected to MongoDB in ${NODE_ENV} mode`);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};
