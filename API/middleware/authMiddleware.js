import jwt from "jsonwebtoken";
import User from "../models/userM.js";

export const protect = async (req, res, next) => {
  let token;
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  )
    return res.status(401).json({ message: "Not Authorized, No Token" });
  try {
    // get token
    token = req.headers.authorization.split(" ")[1];

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // get user id from token
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      res.status(400).json({ message: "No User Found" });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Not authorised, Token failed" });
  }
};
