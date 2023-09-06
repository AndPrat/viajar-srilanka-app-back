import { type NextFunction, type Request, type Response } from "express";
import Place from "../../../database/models/Place.js";
import CustomError from "../../../CustomError/CustomError.js";

export const getPlaces = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const places = await Place.find().exec();

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
