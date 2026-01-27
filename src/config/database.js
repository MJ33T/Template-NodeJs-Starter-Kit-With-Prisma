import dotenv from "dotenv";
import mongoose from "mongoose";
import ApiError from "../errors/ApiError.js";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI + "/" + process.env.MONGO_DB_NAME,
    );
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};
