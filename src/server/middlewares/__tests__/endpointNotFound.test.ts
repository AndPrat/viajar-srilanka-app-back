import { type Request, type Response, type NextFunction } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import { endpointNotFound } from "../errors";

const req: Partial<Request> = {};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next: Partial<NextFunction> = jest.fn();

describe("Given a endpointNotFound middleware", () => {
  describe("When it receives a next Function", () => {
    test("Then it should call the next function with code status 400 and 'Endpoint not found' message", () => {
      const expectedEndpointNotFound = new CustomError(
        "Endpoint not found",
        404,
        "Endpoint not found",
      );

      endpointNotFound(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedEndpointNotFound);
    });
  });
});
