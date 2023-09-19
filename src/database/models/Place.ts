import { Schema, model } from "mongoose";
import { type PlaceStructure } from "./types.js";

const placeSchema = new Schema<PlaceStructure>({
  name: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  otherRelatedPlace: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    required: true,
  },
});

const Place = model("Place", placeSchema, "places");

export default Place;
