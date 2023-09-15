import admin from "firebase-admin";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDatabase from "../../../database/connectToDatabase";
import Place from "../../../database/models/Place.js";
import User from "../../../database/models/User.js";
import { placeMock } from "../../../mocks/placesMock.js";
import tokenMock from "../../../mocks/tokenMock";
import userMock from "../../../mocks/userMock.js";
import app from "../../index.js";
import paths from "../paths/paths.js";

jest.mock("firebase-admin");

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await Place.deleteMany();
  await User.deleteMany();
});

admin.auth = jest.fn().mockReturnValue({
  verifyIdToken: jest.fn().mockResolvedValue(tokenMock),
});

describe("Given a POST '/places' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with status 201 with 'Sigiriya' place", async () => {
      const expectNewPlace = placeMock;
      const expectedStatusCode = 201;
      const path = paths.places;

      await User.create(userMock);

      const response = await request(app)
        .post(path)
        .set("Authorization", "Bearer token")
        .send(expectNewPlace)
        .expect(expectedStatusCode);

      expect(response.body.place).toHaveProperty("name", expectNewPlace.name);
    });
  });
});
