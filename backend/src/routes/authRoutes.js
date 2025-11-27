// backend/src/routes/authRoutes.js
import express from "express";
import { registerUser, loginUser, verifyEmail, getUserProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify-email", verifyEmail); // Neue Route
router.get("/profile", protect, getUserProfile);

export default router;