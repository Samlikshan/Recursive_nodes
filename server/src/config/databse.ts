import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const url =
      process.env.MONGO_URL || "mongodb://localhost:27017/nodeTreeApp";
    await mongoose.connect(url);
    console.log("Databse connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};
