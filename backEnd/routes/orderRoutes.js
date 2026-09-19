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
  ACV PLUS ORDER ROUTES

  Important:
  Specific routes must remain before
  parameter-based routes.
*/

/*
  CREATE ORDER

  Guest checkout is allowed.
  Authenticated users can also be associated
  with an order when authentication is available.
*/
router.post("/", createOrder);

/*
  GET CURRENT USER'S ORDERS
*/
router.get(
  "/mine",
  authMiddleware,
  getMyOrders
);

/*
  PUBLIC ORDER TRACKING
*/
router.get(
  "/track/:orderNumber",
  trackOrder
);

/*
  GET ALL ORDERS
  ADMIN ONLY
*/
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAllOrders
);

/*
  UPDATE ORDER STATUS
  ADMIN ONLY
*/
router.put(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  updateOrderStatus
);

export default router;