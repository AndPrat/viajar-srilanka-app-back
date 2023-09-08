import { type NextFunction, type Request, type Response } from "express";
import admin from "firebase-admin";
import auth from "./auth.js";
import mongoose from "mongoose";
import { type UserStructure } from "../../../database/models/types.js";
import User from "../../../database/models/User.js";
import CustomError from "../../../CustomError/CustomError.js";

jest.mock("firebase-admin");

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next: NextFunction = jest.fn();

const token = {
  uid: "token",
};

const user: UserStructure = {
  _id: new mongoose.Types.ObjectId().toString(),
  name: "Oscar",
  authId: token.uid,
};

describe("Given an auth middleware", () => {
  describe("When it receives a request with a valid token in the header", () => {
    test("Then it should respond with the next function received", async () => {
      const req: Partial<Request> = {
        header: jest.fn().mockReturnValue("Bearer token"),
      };

      admin.auth = jest.fn().mockReturnValue({
        verifyIdToken: jest.fn().mockResolvedValue(token),
      });

      User.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(user),
      });

      await auth(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe("When it receives a request without user in the header", () => {
    test("Then it should respond with 404 status code and 'User is not found' message", async () => {
      const req: Partial<Request> = {
        header: jest.fn().mockReturnValue("token"),
      };

      admin.auth = jest.fn().mockReturnValue({
        verifyIdToken: jest.fn().mockResolvedValue(token),
      });

      User.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      const error = new CustomError(
        "User is not found",
        404,
        "User is not found",
      );

      await auth(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives a request without token in the header", () => {
    test("Then it should respond with 401 status code and 'Unauthorized' message", async () => {
      const req: Partial<Request> = {
        header: jest.fn().mockReturnValue(undefined),
      };

      admin.auth = jest.fn().mockReturnValue({
        verifyIdToken: jest.fn().mockResolvedValue(token),
      });

      User.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(user),
      });

      const error = new CustomError("Unauthorized", 401, "No token provider");

      await auth(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives a request with invalid token in the header", () => {
    test("Then it should respond with 401 status code and 'Invalid token' message", async () => {
      const req: Partial<Request> = {
        header: jest.fn().mockReturnValue("token"),
      };

      admin.auth = jest.fn().mockReturnValue({
        verifyIdToken: jest.fn().mockRejectedValue(token),
      });

      User.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(user),
      });

      const error = new CustomError("Invalid token", 401, "Invalid token");

      await auth(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
