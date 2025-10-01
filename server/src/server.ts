import app from "./app";
import dotenv from "dotenv";
import "reflect-metadata";
import { connectDB } from "./config/databse";

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB().then(() =>
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  }),
);
