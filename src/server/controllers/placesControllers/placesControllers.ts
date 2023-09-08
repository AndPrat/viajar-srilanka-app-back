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

    const places = await Place.find<PlaceStructure>({ user: _id }).exec();

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
