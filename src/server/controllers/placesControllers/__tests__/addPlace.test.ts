import {
  type NextFunction,
  type Request,
  type Response,
} from "express-serve-static-core";
import CustomError from "../../../../CustomError/CustomError";
import Place from "../../../../database/models/Place.js";
import { placeMock, placesMock } from "../../../../mocks/placesMock.js";
import { addPlace } from "../placesControllers";

beforeEach(() => {
  jest.clearAllMocks();
});

const req: Partial<Request> = {
  body: placesMock,
};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next: NextFunction = jest.fn();

describe("Given a addPlace controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its method status whith 201", async () => {
      const expectedStatusCode = 201;
      Place.create = jest.fn().mockReturnValue({
        exec: jest.fn(),
      });

      await addPlace(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  test("Then it should call its method json with 'Sigiriya' place added successfully", async () => {
    Place.create = jest.fn().mockResolvedValue(placeMock);

    const expectedPlace = { place: placeMock };

    await addPlace(req as Request, res as Response, next);

    expect(res.json).toHaveBeenCalledWith(expectedPlace);
  });

  describe("When it receives a next function and there is an error", () => {
    test("Then it should call the received next function with a 500 status code and the 'No se ha podido añadir el lugar' message", async () => {
      const expectedError = new CustomError(
        "No se ha podido añadir el lugar",
        500,
        "No se ha podido añadir el lugar",
      );

      Place.create = jest.fn().mockRejectedValue(expectedError);

      await addPlace(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
