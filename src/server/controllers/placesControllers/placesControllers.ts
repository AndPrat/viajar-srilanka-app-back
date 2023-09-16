import { type NextFunction, type Response } from "express";
import Place from "../../../database/models/Place.js";
import CustomError from "../../../CustomError/CustomError.js";
import { type AuthRequest } from "../../middlewares/auth/types.js";
import { type PlaceStructure } from "../../../database/models/types.js";

export const getPlaces = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const _id = req.userId;

    const places = await Place.find({ user: _id }).exec();

    res.status(200).json({ places });
  } catch (error: unknown) {
    const customError = new CustomError(
      "Can't retrieve the places",
      500,
      (error as Error).message,
    );

    next(customError);
  }
};

export const deletePlaceById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    await Place.findByIdAndDelete(id).exec();

    res.status(200).json({ message: "El lugar se ha borrado con éxito" });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "No se ha podido borrar el lugar",
    );

    next(customError);
  }
};

export const addPlace = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const place = req.body;
    const _id = req.userId;

    const newPlace = await Place.create({ ...place, user: _id?.toString() });

    res.status(201).json({ place: newPlace });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "No se ha podido añadir el lugar",
    );

    next(customError);
  }
};

export const getPlaceById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { placeId } = req.params;

    const place = await Place.findById<PlaceStructure[]>({
      _id: placeId,
    }).exec();

    res.status(200).json({ place });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      404,
      "No se ha podido obtener el lugar",
    );

    next(customError);
  }
};
