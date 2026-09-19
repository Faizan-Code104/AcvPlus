import User from "../models/User.js";

/*
  GET USER PROFILE
  Returns the currently authenticated user's profile.
*/
export const getUserProfile = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const user = await User.findById(req.user._id).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error(
      "ACV Plus Get User Profile Error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Server error while fetching profile.",
    });
  }
};

/*
  GET ALL USERS
  ADMIN ONLY
*/
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error(
      "ACV Plus Get All Users Error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch users.",
    });
  }
};