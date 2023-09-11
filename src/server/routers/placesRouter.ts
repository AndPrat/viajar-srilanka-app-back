import express from "express";
import paths from "./paths/paths.js";
import { getPlaces } from "../controllers/placesControllers/placesControllers.js";

const placesRouter = express.Router();

placesRouter.get(paths.root, getPlaces);

export default placesRouter;
