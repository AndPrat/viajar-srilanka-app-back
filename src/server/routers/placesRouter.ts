import express from "express";
import {
  addPlace,
  deletePlaceById,
  getPlaceById,
  getPlaces,
} from "../controllers/placesControllers/placesControllers.js";
import paths from "./paths/paths.js";

const placesRouter = express.Router();

placesRouter.get(paths.root, getPlaces);
placesRouter.delete(paths.deletePlaces, deletePlaceById);
placesRouter.post(paths.root, addPlace);
placesRouter.get(paths.placeId, getPlaceById);

export default placesRouter;
