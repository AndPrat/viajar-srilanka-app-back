import express from "express";
import paths from "./paths/paths.js";
import {
  deletePlaceById,
  getPlaces,
} from "../controllers/placesControllers/placesControllers.js";

const placesRouter = express.Router();

placesRouter.get(paths.root, getPlaces);
placesRouter.delete(`${paths.root}:id`, deletePlaceById);

export default placesRouter;
