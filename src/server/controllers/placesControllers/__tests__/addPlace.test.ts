import {
  type NextFunction,
  type Request,
  type Response,
} from "express-serve-static-core";
import Place from "../../../../database/models/Place.js";
import { idPlace } from "../../../../mocks/placesMock.js";
import { addPlace } from "../placesControllers";
import { type AuthRequest } from "../../../middlewares/auth/types";
import CustomError from "../../../../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

const req: Partial<Request> = {
  params: {
    id: idPlace,
  },
};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next: NextFunction = jest.fn();

describe("Given a addPlace controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its method status whith 200", async () => {
      const expectedStatusCode = 200;
      Place.create = jest.fn().mockReturnValue({
        exec: jest.fn(),
      });

      await addPlace(req as AuthRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  test("Then it should call its method json with 'Sigiriya' place added successfully", async () => {
    const expectedMessage = {
      message: "El lugar se ha añadido con éxito",
    };

    await addPlace(req as AuthRequest, res as Response, next);

    expect(res.json).toHaveBeenCalledWith(expectedMessage);
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
