import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../../../database/connectToDatabase.js";
import mongoose from "mongoose";
import admin from "firebase-admin";
import app from "../..";
import { placesMock } from "../../../mocks/placesMock.js";
import { type PlaceStructure } from "../../../database/models/types.js";
import User from "../../../database/models/User.js";
import Place from "../../../database/models/Place.js";
import tokenMock from "../../../mocks/tokenMock.js";
import userMock from "../../../mocks/userMock.js";

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

admin.auth = jest.fn().mockReturnValue({
  verifyIdToken: jest.fn().mockResolvedValue(tokenMock),
});

User.findOne = jest.fn().mockReturnValue({
  exec: jest.fn().mockResolvedValue(userMock),
});

describe("Given a GET '/' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with status 200 with 'Sigiriya' and 'Ahas Namaye Palama' objects", async () => {
      const expectedStatusCode = 200;
      const path = "/lugares";

      await User.create(userMock);
      await Place.create(placesMock);

      const response = await request(app)
        .get(path)
        .set("Authorization", "Bearer token")
        .expect(expectedStatusCode);

      const responseBody = response.body as { places: PlaceStructure[] };

      responseBody.places.forEach((place: PlaceStructure, placesPosition) => {
        expect(place).toHaveProperty("name", placesMock[placesPosition].name);
      });
    });
  });
});
