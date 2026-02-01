import { errorLogger } from "../config/logger.js";
import prisma from "../config/prisma.js";
export const testController = async (req, res) => {
  // try {
  //   // simple query – replace `user` with any existing model
  //   const result = await prisma.user.findMany();
  //   res.json({
  //     message: "Prisma is working 🚀",
  //     db: result,
  //   });
  // } catch (error) {
  //   errorLogger.error("Prisma test failed", { error });
  //   res.status(500).json({
  //     message: "Prisma test failed ❌",
  //     error: error.message,
  //   });
  // }
  try {
    const user = await prisma.user.create({
      data: {
        name: "Test User",
        email: `test_${Date.now()}@example.com`, // avoid unique conflict
      },
    });
    res.json({
      message: "User created successfully 🚀",
      user,
    });
  } catch (error) {
    errorLogger.error(error.message);
    res.status(500).json({
      message: "Prisma create failed ❌",
      error: error.message,
    });
  }
};
