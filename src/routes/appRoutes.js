import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  userProfile,
} from "../controllers/AppControllers/AuthController.js";
import auth from "../middleware/authMiddleware.js";
const router = express.Router();

//Login and Registration Routes
router.post("/registration", registerUser);
router.post("/login", loginUser);

// Auth folded routes
router.get("/profile", auth, userProfile);

router.post("/logout", auth, logoutUser);

export const appRoutes = router;
