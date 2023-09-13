import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import admin from "firebase-admin";
import { idPlace } from "../../../mocks/placesMock.js";
import connectToDatabase from "../../../database/connectToDatabase.js";
import tokenMock from "../../../mocks/tokenMock";
import User from "../../../database/models/User.js";
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

User.findOne = jest.fn().mockReturnValue({
  exec: jest.fn().mockResolvedValue(userMock),
});

describe("Given a DELETE '/' lugares/:lugaresId  ", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with status 200 with 'Sigiriya' and 'Ahas Namaye Palama' objects", async () => {
      const expectedMessage = "The place has been successfully removed";
      const expectedStatusCode = 200;
      const path = `/lugares/"${idPlace}`;

      const response = await request(app)
        .delete(path)
        .set("Authorization", "Bearer token")
        .expect(expectedStatusCode);

      expect(response.body).toHaveProperty("message", expectedMessage);
    });
  });
});
