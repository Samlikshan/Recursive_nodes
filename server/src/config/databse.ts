import mongoose from "mongoose";

const options = {
  connectTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MongoUrl = process.env.MONGO_URL!;
console.log(MongoUrl);
export const connectDB = async () => {
  try {
    await mongoose.connect(MongoUrl, options);
    console.log("Databse connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};
