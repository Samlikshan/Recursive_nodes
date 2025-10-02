import express from "express";
import cors from "cors";
import morgan from "morgan";
import indexRoutes from "./presentation/routes/index";

import { corsConfig } from "./config/configs";
import { globalErrorHandler } from "./presentation/middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors(corsConfig));

app.use("/api", indexRoutes);

app.use(globalErrorHandler);

export default app;
