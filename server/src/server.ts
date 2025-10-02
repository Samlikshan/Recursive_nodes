import "reflect-metadata";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

import { connectDB } from "./config/databse";

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    }),
  )
  .catch((err) => console.log("Error conencing databse", err));
