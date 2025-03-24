import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import fs from "fs";

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exist. Please register to continue.",
      });
    }

    // Check password
    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.json({
        success: false,
        message: "Invalid email or password!",
      });
    }

    // Update lastLoginDate
    user.lastLoginDate = new Date();
    await user.save();

    const token = createToken(user._id);
    res.json({
      success: true,
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.json({ success: false, message: "Error logging in user" });
  }
};

// To Create JWT Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};

// Register User
const registerUser = async (req, res) => {
  const { name, password, email, role } = req.body;

  try {
    const exists = await userModel.findOne({ email });

    // Check if user already exists
    if (exists) {
      return res.json({
        success: false,
        message: "User already exists. Please login to continue!",
      });
    }

    // Validate email and strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password should be at least 8 characters long",
      });
    }

    // Hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Save user in database
    const user = await newUser.save();

    // Create JWT token for user
    const token = createToken(user._id);

    res.json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.json({ success: false, message: "Error registering user" });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ success: false, message: "No users found" });
    }
    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if password is included in updateData
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    // Check if profile picture is uploaded
    if (req.file) {
      // Delete old profile picture if exists
      if (updateData.profilePicture) {
        fs.unlink(`uploads/${updateData.profilePicture}`, (err) => {
          if (err) console.log("Error deleting old profile picture:", err);
        });
      }

      updateData.profilePicture = req.file.filename;
    }

    // Update lastLoginDate if user is updating other information
    updateData.lastLoginDate = new Date();

    const updatedUser = await userModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Delete profile picture if exists
    if (user.profilePicture) {
      fs.unlink(`uploads/${user.profilePicture}`, (err) => {
        if (err) console.log("Error deleting profile picture:", err);
      });
    }

    return res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export {
  loginUser,
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
