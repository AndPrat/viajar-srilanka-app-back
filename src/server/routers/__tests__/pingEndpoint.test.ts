import request from "supertest";
import app from "../..";

describe("Given a GET '/' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with status 200 with '🏓 pong' message", async () => {
      const expectedStatusCode = 200;
      const path = "/";
      const expectedMessage = "🏓 pong";

      const response = await request(app).get(path).expect(expectedStatusCode);

      expect(response.body).toHaveProperty("message", expectedMessage);
    });
  });
});

describe("Given a GET '/ping' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should responde wiht status 404 with 'Endpoint not found' message", async () => {
      const expectedStatusCode = 404;
      const path = "/ping";
      const expectedEndpointNotFound = "Endpoint not found";

      const response = await request(app).get(path).expect(expectedStatusCode);

      expect(response.body).toHaveProperty("error", expectedEndpointNotFound);
    });
  });
});
