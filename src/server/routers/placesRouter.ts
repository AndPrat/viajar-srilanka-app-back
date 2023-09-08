import express from "express";
import paths from "./paths/paths.js";

const placesRouter = express.Router();

placesRouter.get(paths.root, placesRouter);

export default placesRouter;
