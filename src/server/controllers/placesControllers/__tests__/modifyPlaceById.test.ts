import {
  type Request,
  type Response,
  type NextFunction,
} from "express-serve-static-core";
import Place from "../../../../database/models/Place.js";
import { idPlace, placeByIdMock } from "../../../../mocks/placesMock.js";
import { modifyPlaceById } from "../placesControllers.js";
import CustomError from "../../../../CustomError/CustomError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

const req: Partial<Request> = {
  body: placeByIdMock,
  params: {
    id: idPlace,
  },
};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next: NextFunction = jest.fn();

describe("Given a modifyPlaceById controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its method status with 200", async () => {
      const expectedStatusCode = 200;
      Place.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn(),
      });

      await modifyPlaceById(
        req as Request,
        res as Response,
        res as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  test("Then it should call the received next function a 404 status code and the 'No se ha podido añadir a favoritos' message", async () => {
    const expectedError = new CustomError(
      "No se ha podido añadir a favoritos",
      304,
      "No se ha podido añadir a favoritos",
    );

    Place.findByIdAndUpdate = jest.fn().mockReturnValue({
      exec: jest.fn().mockRejectedValue(expectedError),
    });

    await modifyPlaceById(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(expectedError);
  });
});
