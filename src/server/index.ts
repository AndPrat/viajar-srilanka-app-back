import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { endpointNotFound, generalError } from "./middlewares/errors.js";

const corsOptions = {
  origin: [process.env.ORIGIN_PROD!, process.env.ORIGIN_LOCAL!],
};

const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(cors(corsOptions));

app.use(endpointNotFound);

app.use(generalError);

export default app;
