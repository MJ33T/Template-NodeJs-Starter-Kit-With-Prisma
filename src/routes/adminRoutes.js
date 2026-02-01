import express from "express";
import { testController } from "../controllers/TestController.js";

const router = express.Router();

router.post("/test", testController);

export const adminRoutes = router;
