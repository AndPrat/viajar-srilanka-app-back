import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { endpointNotFound, generalError } from "./middlewares/errors/errors.js";
import pingController from "./controllers/ping/pingController.js";
import paths from "./routers/paths/paths.js";
import auth from "./middlewares/auth/auth.js";
import placesRouter from "./routers/placesRouter.js";

const corsOptions = {
  origin: [process.env.ORIGIN_PROD!, process.env.ORIGIN_LOCAL!],
};

const app = express();

app.disable("x-powered-by");

app.use(express.json());

app.use(morgan("dev"));

app.use(cors(corsOptions));

app.get(paths.root, pingController);

app.use(paths.places, auth, placesRouter);

app.use(endpointNotFound);

app.use(generalError);

export default app;
