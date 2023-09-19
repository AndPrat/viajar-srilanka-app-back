import { type PathsStructure } from "./types.js";

const paths: PathsStructure = {
  root: "/",
  places: "/places",
  deletePlaces: "/:id",
  placeId: "/:placeId",
  modifyId: "/:placeId",
};

export default paths;
