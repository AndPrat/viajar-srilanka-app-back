import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();
app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(
  cors({
    origin: [process.env.ORIGIN_PROD!, process.env.ORIGIN_LOCAL!],
  }),
);

export default app;
