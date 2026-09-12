import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully.");

    const adminName = "Ziveline Admin";
    const adminEmail = "admin@ziveline.com";
    const adminPassword = "Admin@123456";

    const existingUser = await User.findOne({
      email: adminEmail.toLowerCase(),
    });

    if (existingUser) {
      if (existingUser.role === "admin") {
        console.log("Admin account already exists.");
      } else {
        existingUser.role = "admin";
        await existingUser.save();

        console.log("Existing user has been promoted to admin.");
      }

      await mongoose.connection.close();
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    const admin = await User.create({
      name: adminName,
      email: adminEmail.toLowerCase(),
      password: hashedPassword,
      role: "admin",
    });

    console.log("\n=================================");
    console.log("ADMIN CREATED SUCCESSFULLY");
    console.log("=================================");
    console.log(`Name: ${admin.name}`);
    console.log(`Email: ${admin.email}`);
    console.log(`Role: ${admin.role}`);
    console.log(`Password: ${adminPassword}`);
    console.log("=================================\n");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("\nCreate Admin Error:", error.message);

    await mongoose.connection.close();

    process.exit(1);
  }
};

createAdmin();