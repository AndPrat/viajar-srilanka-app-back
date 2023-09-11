import { type NextFunction, type Request, type Response } from "express";
import Place from "../../../../database/models/Place.js";
import { placesMock } from "../../../../mocks/placesMock.js";
import { getPlaces } from "../placesControllers.js";
import CustomError from "../../../../CustomError/CustomError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given placesControllers controller", () => {
  const req: Partial<Request> = {};
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next: NextFunction = jest.fn();

  describe("When it receives a response", () => {
    test("Then it should call its method status with 200", async () => {
      const expectedStatusCode = 200;

      Place.find = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(placesMock),
      });

      await getPlaces(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its method json with 'Sigiriya' and 'Ahas Namaye Palama'", async () => {
      await getPlaces(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ places: placesMock });
    });
  });

  describe("When it receives a next function and there is an error", () => {
    test("Then it should call teh received next function with a 500 status code and the 'Can't retrieve the places' message ", async () => {
      const expectedError = new CustomError(
        "Can't retrieve the places",
        500,
        "Can't retrieve the places",
      );

      Place.find = jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockRejectedValue(expectedError) });

      await getPlaces(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
