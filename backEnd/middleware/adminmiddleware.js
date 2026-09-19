const adminMiddleware = (req, res, next) => {
  try {
    // User must be authenticated first
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    // Only admin users can access protected admin routes
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges are required.",
      });
    }

    return next();
  } catch (error) {
    console.error(
      "ACV Plus Admin Middleware Error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Admin authorization failed.",
    });
  }
};

export default adminMiddleware;