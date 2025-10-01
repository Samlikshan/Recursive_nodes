import express from "express";
import cors from "cors";
import morgan from "morgan";

import { corsConfig } from "./config/configs";

const app = express();

app.use(morgan("dev"));
app.use(cors(corsConfig));

app.get("/", (_req, res) => {
  res.status(200).json({ message: "Backend is running" });
});

export default app;
