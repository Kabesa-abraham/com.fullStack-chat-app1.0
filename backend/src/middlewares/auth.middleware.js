import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => { //pour verifier si le user et connecter
  try {
    const token = req.cookies.jwt_token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized No Token Provided" });
    }
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded_token) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded_token.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
