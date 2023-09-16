import admin from "firebase-admin";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDatabase from "../../../database/connectToDatabase";
import Place from "../../../database/models/Place.js";
import User from "../../../database/models/User.js";
import {
  idPlace2,
  placeByIdMock,
  placesMock,
} from "../../../mocks/placesMock.js";
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

admin.auth = jest.fn().mockReturnValue({
  verifyIdToken: jest.fn().mockResolvedValue(tokenMock),
});

User.findOne = jest.fn().mockReturnValue({
  exec: jest.fn().mockResolvedValue(userMock),
});

describe("Given a GET 'places/:placeId' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with status 200 with 'Sigiriya'", async () => {
      const expectedStatusCode = 200;
      const path = `${paths.places}/${idPlace2}`;

      await User.create(userMock);
      await Place.create(placesMock);

      const response = await request(app)
        .get(path)
        .set("Authorization", "Bearer token")
        .expect(expectedStatusCode);

      expect(response.body.place).toHaveProperty("name", placeByIdMock.name);
    });
  });
});
