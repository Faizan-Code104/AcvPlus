import express from "express";

import {
  createOrder,
  getMyOrders,
  trackOrder,
  getAllOrders,
  updateOrderStatus,
} from "../Controllers/ordercontroller.js";

import authMiddleware from "../middleware/authmiddleware.js";
import adminMiddleware from "../middleware/adminmiddleware.js";

const router = express.Router();

/*
  IMPORTANT:
  Specific routes must come BEFORE /:id-style routes
*/

router.post("/", (req, res, next) => {
  console.log("✅ GUEST ORDER ROUTE REACHED");
  next();
}, createOrder);

router.get("/mine", authMiddleware, getMyOrders);

router.get("/track/:orderNumber", trackOrder);

router.get("/", authMiddleware, adminMiddleware, getAllOrders);

router.put(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  updateOrderStatus
);

export default router;