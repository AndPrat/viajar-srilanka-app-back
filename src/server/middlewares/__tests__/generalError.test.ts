import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import { generalError } from "../errors.js";

beforeAll(() => {
  jest.clearAllMocks();
});

const req: Partial<Request> = {};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next: NextFunction = jest.fn();

describe("Given a generalError middleware", () => {
  describe("When it receives a response code status 404 and 'Sri Lanka place not found' message", () => {
    const errorMessage = new CustomError(
      "Sri Lanka place not found",
      404,
      "Sri Lanka place not found",
    );

    test("Then it should call its method json with error message 'Sri Lanka place not found'", () => {
      const expectedStatusode = 404;

      generalError(errorMessage, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusode);
    });
  });

  describe("When it receives a response and an error with no status code", () => {
    test("Then it should call the reveices response status method with code 500", () => {
      const expectedStatusode = 500;
      const error = new Error();

      generalError(error as CustomError, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusode);
    });
  });
});
