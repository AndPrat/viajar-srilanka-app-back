import { type Request } from "express";
import { type PlaceStructure } from "../../../database/models/types.js";

export interface AuthRequest
  extends Request<
    Record<string, unknown>,
    Record<string, unknown>,
    Partial<Omit<PlaceStructure, "_id" | "user">>
  > {
  userId?: string;
}
export interface AuthRequestWithBooleanBody
  extends Request<Record<string, unknown>, Record<string, unknown>, string> {
  userId?: string;
}
