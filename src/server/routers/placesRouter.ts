import express from "express";
import {
  addPlace,
  deletePlaceById,
  getPlaceById,
  getPlaces,
  modifyPlaceById,
} from "../controllers/placesControllers/placesControllers.js";
import paths from "./paths/paths.js";

const placesRouter = express.Router();

placesRouter.get(paths.root, getPlaces);
placesRouter.get(paths.placeId, getPlaceById);
placesRouter.delete(paths.deletePlaces, deletePlaceById);
placesRouter.post(paths.root, addPlace);
placesRouter.patch(paths.modifyId, modifyPlaceById);

export default placesRouter;
