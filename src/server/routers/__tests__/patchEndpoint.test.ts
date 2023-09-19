import admin from "firebase-admin";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDatabase from "../../../database/connectToDatabase.js";
import Place from "../../../database/models/Place.js";
import User from "../../../database/models/User.js";
import { idPlace2, placeByIdMock } from "../../../mocks/placesMock.js";
import tokenMock from "../../../mocks/tokenMock.js";
import userMock from "../../../mocks/userMock.js";
import app from "../../index.js";

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

describe("Given a PATCH 'places/:placeId' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with status 200 with 'Ahas Namaye Palama' place", async () => {
      const expectedStatusCode = 200;
      const path = `/places/${idPlace2}`;

      await User.create(userMock);
      await Place.create(placeByIdMock);

      const response = await request(app)
        .get(path)
        .set("Authorization", "Bearer token")
        .expect(expectedStatusCode);

      expect(response.body.place).toHaveProperty("name", placeByIdMock.name);
    });
  });
});
