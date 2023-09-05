import pingController from "../pingController.js";
import { type Request, type Response } from "express";

const req: Partial<Request> = {};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Given PingController controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call its method with 200", () => {
      const expectedStatusCode = 200;

      pingController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its method json with message '🏓 pong'", () => {
      pingController(req as Request, res as Response);
      const message = "🏓 pong";

      expect(res.json).toHaveBeenCalledWith({ message });
    });
  });
});
