import express from "express";
import { getUserProfile, getAllUsers } from "../Controllers/usercontroller.js";
import authMiddleware from "../middleware/authmiddleware.js";
import adminMiddleware from "../middleware/adminmiddleware.js";

const router = express.Router();

// Protected User Profile Route
router.get("/profile", authMiddleware, getUserProfile);

// Admin — list all users
router.get("/", authMiddleware, adminMiddleware, getAllUsers);

export default router;