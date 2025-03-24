import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const authMiddleware = (allowedRoles) => async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    console.log("No token", token);
    return res.json({
      success: false,
      message: "Not Authorized, Please Login Again.",
    });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.body.userId = token_decode.id;

    // Fetch the user from the database based on the decoded user ID
    const user = await userModel.findById(token_decode.id);

    // Check if the user exists and has one of the allowed roles
    if (!user || !allowedRoles.includes(user.role)) {
      console.log("User not found");
      return res.json({
        success: false,
        message: "Not Authorized, Permission Denied.",
      });
    }

    // If the user has one of the allowed roles, proceed to the next middleware
    next();
  } catch (error) {
    console.log("Error: ", error);
    res.json({ success: false, message: "Error in Auth Middleware" });
  }
};

export default authMiddleware;
