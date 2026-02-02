import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorLogger } from "../../config/logger.js";
import prisma from "../../config/prisma.js";
import { validate } from "../../middleware/validationMiddleware.js";
import responseHelper from "../../utils/responseHelper.js";
import {
  appUserLoginSchema,
  appUserRegistrationOtpSchema,
} from "../../validation/App/appUserAuthValidation.js";

export const registerUser = async (req, res) => {
  const result = await validate(appUserRegistrationOtpSchema, req.body, res);

  const { name, email, password } = result;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return responseHelper.failed(res, "Email already registered", 400);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    // Generate JWT token
    const payload = { id: newUser.id, email: newUser.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await prisma.userToken.create({
      data: { userId: newUser.id, token, expiresAt, revoked: false },
    });

    const responseData = {
      user_id: newUser.id,
      token,
      expires_at: expiresAt,
    };

    return responseHelper.success(
      res,
      responseData,
      "User registered successfully",
      201,
    );
  } catch (error) {
    errorLogger.error(error.message);
    return responseHelper.failed(res, error, 500);
  }
};

export const loginUser = async (req, res) => {
  const result = await validate(appUserLoginSchema, req.body, res);
  try {
    const { email, password } = result;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return responseHelper.failed(res, "User not found", 404);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return responseHelper.failed(res, "Invalid credentials", 401);

    // Generate new hashed token
    // const { token, expiresAt } = generateToken(user.id);
    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await prisma.userToken.create({
      data: { userId: user.id, token, expiresAt, revoked: false },
    });

    const responseData = {
      user_id: user.id,
      token,
      expires_at: expiresAt,
    };

    return responseHelper.success(res, responseData, "Login successful", 200);
  } catch (error) {
    errorLogger.error("Login Error: ", error.message);
    return responseHelper.failed(res, error.message, 500);
  }
};

export const userProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    if (!user) return responseHelper.failed(res, "User not found", 404);

    return responseHelper.success(res, user, "User profile", 200);
  } catch (error) {
    errorLogger.error("User Profile Error: ", error.message);
    return responseHelper.failed(res, error.message, 500);
  }
};

export const logoutUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return responseHelper.failed(res, "Token missing", 401);
    }

    const token = authHeader.split(" ")[1];

    const existingToken = await prisma.userToken.findFirst({
      where: { token, revoked: false },
    });

    if (!existingToken) {
      return responseHelper.failed(res, "Invalid or already logged out", 401);
    }

    await prisma.userToken.update({
      where: { id: existingToken.id },
      data: { revoked: true },
    });

    return responseHelper.success(res, null, "Logout successful", 200);
  } catch (error) {
    errorLogger.error(error.message);
    return responseHelper.failed(res, "Logout failed", 500);
  }
};
