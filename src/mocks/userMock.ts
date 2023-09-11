import mongoose from "mongoose";
import { type UserStructure } from "../database/models/types.js";
import tokenMock from "./tokenMock.js";

const userMock: UserStructure = {
  _id: new mongoose.Types.ObjectId().toString(),
  name: "Oscar",
  authId: tokenMock.uid,
};

export default userMock;
