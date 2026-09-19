import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    // ==============================
    // Check JWT configuration
    // ==============================
    if (!process.env.JWT_SECRET) {
      console.error(
        "ACV Plus Auth Error: JWT_SECRET is not configured."
      );

      return res.status(500).json({
        success: false,
        message: "Server authentication configuration error.",
      });
    }

    // ==============================
    // Get Authorization header
    // ==============================
    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required.",
      });
    }

    // ==============================
    // Extract token
    // ==============================
    const token = authHeader
      .slice(7)
      .trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required.",
      });
    }

    // ==============================
    // Verify token
    // ==============================
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (!decoded?.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
    }

    // ==============================
    // Find authenticated user
    // ==============================
    const user = await User.findById(
      decoded.id
    ).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User account not found.",
      });
    }

    // Attach authenticated user
    // to the current request
    req.user = user;

    return next();
  } catch (error) {
    console.error(
      "ACV Plus Auth Middleware Error:",
      error.message
    );

    // Expired JWT
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message:
          "Your session has expired. Please log in again.",
      });
    }

    // Invalid / malformed JWT
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Authentication failed.",
    });
  }
};

export default authMiddleware;