import mongoose from "mongoose";
import { type PlaceStructure } from "../database/models/types.js";

export const idPlace = new mongoose.Types.ObjectId().toString();
export const idPlace2 = new mongoose.Types.ObjectId().toString();
export const authId = new mongoose.Types.ObjectId().toString();

export const placeIdMock = "6508c222f6d43ea8156ef659";

export const placesMock: PlaceStructure[] = [
  {
    _id: idPlace,
    name: "Sigiriya",
    subtitle: "Templo de la roca del león",
    location: "Matale",
    schedule: "8h a 17h",
    otherRelatedPlace: "Mirador Pidurangala",
    description:
      "La inmensa e imponente Roca del León o Lion Rock de Sigiriya, nacida de una erupción volcánica, emerge como un titán en el paisaje de la ciudad, que ineludiblemente ha ligado su historia a ella.",
    image:
      "https://images.squarespace-cdn.com/content/v1/6298cb774cf3830bc9b342bf/e0ec3d17-bb76-4f83-920c-f57579d2e813/Sigiriya+Rock.jpg",
    user: authId,
    isFavorite: false,
  },
  {
    _id: idPlace2,
    name: "Ahas Namaye Palama",
    subtitle: "Tren de Kandy a Ella",
    location: "Ella",
    schedule: "7h a 20h",
    otherRelatedPlace: "Recorrido de tren de Kandy a Ella",
    description:
      "Viajar en tren por Sri Lanka ofrece una de las experiencias más mágicas del mundo. Con los años, los viajeros han optado por replicar a los residentes y salir con precaución del tren para disfrutar mejor de las vistas y de una sensación increíble.",
    image:
      "https://www.magazinespain.com/wp-content/uploads/2019/08/sri-lanka-tren-nuwara-eliya-a-ella-portada.jpg",
    user: authId,
    isFavorite: false,
  },
];

export const deletePlacesMock: PlaceStructure[] = [
  {
    _id: idPlace,
    name: "Sigiriya",
    subtitle: "Templo de la roca del león",
    location: "Matale",
    schedule: "8h a 17h",
    otherRelatedPlace: "Mirador Pidurangala",
    description:
      "La inmensa e imponente Roca del León o Lion Rock de Sigiriya, nacida de una erupción volcánica, emerge como un titán en el paisaje de la ciudad, que ineludiblemente ha ligado su historia a ella.",
    image:
      "https://images.squarespace-cdn.com/content/v1/6298cb774cf3830bc9b342bf/e0ec3d17-bb76-4f83-920c-f57579d2e813/Sigiriya+Rock.jpg",
    user: authId,
    isFavorite: false,
  },
  {
    _id: idPlace2,
    name: "Ahas Namaye Palama",
    subtitle: "Tren de Kandy a Ella",
    location: "Ella",
    schedule: "7h a 20h",
    otherRelatedPlace: "Recorrido de tren de Kandy a Ella",
    description:
      "Viajar en tren por Sri Lanka ofrece una de las experiencias más mágicas del mundo. Con los años, los viajeros han optado por replicar a los residentes y salir con precaución del tren para disfrutar mejor de las vistas y de una sensación increíble.",
    image:
      "https://www.magazinespain.com/wp-content/uploads/2019/08/sri-lanka-tren-nuwara-eliya-a-ella-portada.jpg",
    user: authId,
    isFavorite: false,
  },
];

export const placeMock: Partial<PlaceStructure> = {
  name: "Sigiriya",
  subtitle: "Templo de la roca del león",
  location: "Matale",
  schedule: "8h a 17h",
  otherRelatedPlace: "Mirador Pidurangala",
  description:
    "La inmensa e imponente Roca del León o Lion Rock de Sigiriya, nacida de una erupción volcánica, emerge como un titán en el paisaje de la ciudad, que ineludiblemente ha ligado su historia a ella.",
  image:
    "https://images.squarespace-cdn.com/content/v1/6298cb774cf3830bc9b342bf/e0ec3d17-bb76-4f83-920c-f57579d2e813/Sigiriya+Rock.jpg",
  isFavorite: false,
};

export const placeByIdMock: PlaceStructure = {
  _id: idPlace2,
  name: "Ahas Namaye Palama",
  subtitle: "Tren de Kandy a Ella",
  location: "Ella",
  schedule: "7h a 20h",
  otherRelatedPlace: "Recorrido de tren de Kandy a Ella",
  description:
    "Viajar en tren por Sri Lanka ofrece una de las experiencias más mágicas del mundo. Con los años, los viajeros han optado por replicar a los residentes y salir con precaución del tren para disfrutar mejor de las vistas y de una sensación increíble.",
  image:
    "https://www.magazinespain.com/wp-content/uploads/2019/08/sri-lanka-tren-nuwara-eliya-a-ella-portada.jpg",
  user: authId,
  __v: 0,
  isFavorite: false,
};

export const placePatch: PlaceStructure = {
  _id: "6508c222f6d43ea8156ef659",
  name: "Ahas Namaye Palama",
  subtitle: "Tren de Kandy a Ella",
  location: "Ella",
  schedule: "7h a 20h",
  otherRelatedPlace: "Recorrido de tren de Kandy a Ella",
  description:
    "Viajar en tren por Sri Lanka ofrece una de las experiencias más mágicas del mundo. Con los años, los viajeros han optado por replicar a los residentes y salir con precaución del tren para disfrutar mejor de las vistas y de una sensación increíble.",
  image:
    "https://www.magazinespain.com/wp-content/uploads/2019/08/sri-lanka-tren-nuwara-eliya-a-ella-portada.jpg",
  user: authId,
  __v: 0,
  isFavorite: false,
};
