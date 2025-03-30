const User = require("../models/user");
// const { storeOTP } = require("../utils/storeOTP");
const jwt = require("jsonwebtoken");

const verifyUser = async (req, res) => {
  // const { id, otp } = req.body;
  const { token, otp } = req.body;
  // const data = storeOTP.get(contact);
  try {
    // const user = await User.findById(id);
    if (!token) {
      return res.status(400).json({
        Success: false,
        Message: "Token is required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.otp !== otp) {
      res.status(400).json({ Success: false, Message: "Invalid OTP" });
    }

    const newUser = await User.create({
      name: decoded.name,
      contact: decoded.contact,
      // password: decoded.password,
      // otp: decoded.otp,
      isVerified: true,
    });

    // storeOTP.delete(contact);
    res.status(200).json({
      Success: true,
      Message: "User verified and registered successfully",
      id: newUser._id,
      name: newUser.name,
      contact: newUser.contact,
      // password: newUser.password,
      // otp: newUser.otp,
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "OTP expired. Please register again.",
      });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({
        success: false,
        message: "Invalid or tampered token.",
      });
    }
    console.error("OTP Verification Error", error);

    return res
      .status(500)
      .json({ Success: false, Message: "Internal Server Error" });
  }
};

module.exports = verifyUser;
