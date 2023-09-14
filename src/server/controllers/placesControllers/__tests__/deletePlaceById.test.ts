import { type NextFunction, type Request, type Response } from "express";
import Place from "../../../../database/models/Place.js";
import { idPlace } from "../../../../mocks/placesMock.js";
import { deletePlaceById } from "../placesControllers.js";
import { type AuthRequest } from "../../../middlewares/auth/types.js";
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

describe("Given deletePlaceById controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its method status with 200", async () => {
      const expectedStatusCode = 200;
      Place.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn(),
      });

      await deletePlaceById(req as AuthRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its method json with 'Sigiriya' place deleted successfully", async () => {
      const expectedMessage = {
        message: "El lugar se ha borrado con éxito",
      };

      await deletePlaceById(req as AuthRequest, res as Response, next);

      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });

  describe("When it receives a next function and there is an error", () => {
    test("Then it should call the received next funcion witu a 500 status code and the 'Can't remove the place' message", async () => {
      const expectedError = new CustomError(
        "No se ha podido borrar el lugar",
        500,
        "No se ha podido borrar el lugar",
      );

      Place.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(expectedError),
      });

      await deletePlaceById(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
