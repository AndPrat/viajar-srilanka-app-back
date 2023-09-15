import express from "express";
import paths from "./paths/paths.js";
import {
  addPlace,
  deletePlaceById,
  getPlaces,
} from "../controllers/placesControllers/placesControllers.js";

const placesRouter = express.Router();

placesRouter.get(paths.root, getPlaces);
placesRouter.delete(paths.deletePlaces, deletePlaceById);
placesRouter.post(paths.root, addPlace);

export default placesRouter;
