import request from "supertest";
import app from "../..";

describe("Given a GET '/flowers' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should responde wiht status 404 with 'Endpoint not found' message", async () => {
      const expectedStatusCode = 404;
      const flowersPath = "/flowers";
      const expectedEndpointNotFound = "Endpoint not found";

      const response = await request(app)
        .get(flowersPath)
        .expect(expectedStatusCode);

      expect(response.body).toHaveProperty("error", expectedEndpointNotFound);
    });
  });
});
