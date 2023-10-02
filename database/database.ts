import mongoose from "mongoose";
import dotenv from "dotenv";
import findConfig from "find-config";

dotenv.config({ path: findConfig(".env") as string });

mongoose
  .connect(
    `mongodb+srv://tsankovelichkov:${process.env.DATABASE_PASSWORD}@cluster0.omm2s7n.mongodb.net/VBT`
  )
  .then(() => console.log("connect to db"));
