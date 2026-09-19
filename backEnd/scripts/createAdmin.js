import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    console.log("Connecting to MongoDB...");

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not configured.");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully.");

    /*
      ACV PLUS ADMIN CREDENTIALS

      Change these values before running
      the script if needed.
    */
    const adminName = "ACV Plus Admin";
    const adminEmail = "admin@acvplus.us";
    const adminPassword = "Admin@123456";

    // Check if admin/user already exists
    const existingUser = await User.findOne({
      email: adminEmail.toLowerCase(),
    });

    if (existingUser) {
      if (existingUser.role === "admin") {
        console.log("ACV Plus admin account already exists.");
      } else {
        existingUser.role = "admin";

        await existingUser.save();

        console.log(
          "Existing user has been promoted to admin."
        );
      }

      return;
    }

    // Hash admin password
    const hashedPassword = await bcrypt.hash(
      adminPassword,
      12
    );

    // Create ACV Plus admin
    const admin = await User.create({
      name: adminName,
      email: adminEmail.toLowerCase(),
      password: hashedPassword,
      role: "admin",
    });

    console.log("");
    console.log("=================================");
    console.log("ACV PLUS ADMIN CREATED SUCCESSFULLY");
    console.log("=================================");
    console.log(`Name: ${admin.name}`);
    console.log(`Email: ${admin.email}`);
    console.log(`Role: ${admin.role}`);
    console.log("=================================");
    console.log("");
  } catch (error) {
    console.error(
      "ACV Plus Create Admin Error:",
      error.message
    );

    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
  }
};

createAdmin();