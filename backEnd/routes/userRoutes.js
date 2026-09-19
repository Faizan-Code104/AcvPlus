import express from "express";

import {
  getUserProfile,
  getAllUsers,
} from "../Controllers/usercontroller.js";

import authMiddleware from "../middleware/authmiddleware.js";
import adminMiddleware from "../middleware/adminmiddleware.js";

const router = express.Router();

/*
  ========================================
  ACV PLUS USER ROUTES
  ========================================
*/

/*
  GET CURRENT USER PROFILE

  Protected route.
  User must be logged in.
*/
router.get(
  "/profile",
  authMiddleware,
  getUserProfile
);

/*
  GET ALL USERS

  Admin only.
  User must be authenticated
  and have the "admin" role.
*/
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);

export default router;