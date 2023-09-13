import { type NextFunction, type Response } from "express";
import Place from "../../../database/models/Place.js";
import CustomError from "../../../CustomError/CustomError.js";
import { type AuthRequest } from "../../middlewares/auth/types.js";

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
    const { placeId } = req.params;

    await Place.findByIdAndDelete(placeId).exec();

    res
      .status(200)
      .json({ message: "The place has been successfully removed" });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Can't remove the place",
    );

    next(customError);
  }
};
