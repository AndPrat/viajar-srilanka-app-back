import {
  type Request,
  type Response,
  type NextFunction,
} from "express-serve-static-core";
import Place from "../../../../database/models/Place.js";
import { getPlaceById } from "../placesControllers";
import { idPlace } from "../../../../mocks/placesMock.js";
import CustomError from "../../../../CustomError/CustomError.js";

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

describe("Given a getPlaceById controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its method status with 200", async () => {
      const expectedStatusCode = 200;
      Place.findById = jest.fn().mockReturnValue({
        exec: jest.fn(),
      });

      await getPlaceById(req as Request, res as Response, res as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  test("Then it should call the received next funcion with a 404 status code and the 'No se ha podido obtener el lugar' message", async () => {
    const expectedError = new CustomError(
      "No se ha podido obtener el lugar",
      404,
      "No se ha podido obtener el lugar",
    );

    Place.findById = jest.fn().mockReturnValue({
      exec: jest.fn().mockRejectedValue(expectedError),
    });

    await getPlaceById(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(expectedError);
  });
});
