import { User } from "../models/User.Model.js";
import { phoneSMS } from "../utils/communicationsServices.js";
import {
  generateOTP,
  generateToken,
  verifyToken,
} from "../utils/tokenService.js";

export const PhoneRegistration = async (req, res) => {
  const { phone } = req.body;

  try {
    if (!phone) {
      return res.status(400).json({ message: "Phone field is required" });
    }
    const userExists = await User.findOne({ phone });
    if (userExists) {
      return res
        .status(400)
        .json({ message: `User already exists with ${phone}` });
    }
    const otp = generateOTP();
    const tokenPayload = { phone, otp, purpose: "Phone_Verification" };
    const token = generateToken(tokenPayload);
    const message = `Your Verification Code is:${otp}`;
    // const sms = await phoneSMS(phone, message);
    // if (!sms.success) {
    //   return res.status(500).json({ message: "Failed to send OTP" });
    // }
    return res
      .status(200)
      .json({ message: "OTP sent successfull", token, otp });
  } catch (error) {
    console.error(`Registration Error:${error.message}`);
    return res.status(500).json({ message: "Registration Failed" });
  }
};

export const verifyOTP = async (req, res) => {
  const { otp, token } = req.body;
  // console.log(otp, token);
  try {
    if (!otp || !token) {
      return res.status(400).json("OTP and Token field are required");
    }
    const decoded = verifyToken(token);
    // console.log(decoded);
    if (decoded.purpose !== "Phone_Verification") {
      return res.status(400).json({ error: "Invalid Token Purpose" });
    }
    if (decoded.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }
    console.log(decoded.otp);
    const newUser = await User.create({
      phone: decoded.phone,
      phoneVerified: true,
    });
    console.log(newUser);
    // New authtoken for authorization
    const authToken = generateToken(
      {
        userID: newUser._id,
        purpose: "Authentication",
      },
      "7d"
    );
    return res.status(200).json({
      message: "Number Registered Successfully",
      user: { phone: newUser.phone, _id: newUser._id },
      token: authToken,
    });
  } catch (error) {
    console.error(`OTP Verification Error:${error.message}`);
    return res
      .status(400)
      .json({ error: `OTP Verification Error:${error.message}` });
  }
};

export const EmailRegistration = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email Field is required" });
  try {
    const user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ error: `User already exists with ${email}` });
    const otp = generateOTP();
    const emailPayload = { email, otp, purpose: "Email_Verification" };
    const token = generateToken(emailPayload);
    return res
      .status(200)
      .json({ message: "Token Generated Successfully", token, otp });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ error: `Registration Error:${error.message}` });
  }
};

export const VerifyEOTP = async (req, res) => {
  const { otp, token } = req.body;
  if (!otp || !token)
    return res.status(400).json({ error: "All fields are required" });
  const decoded = await verifyToken(token);
  if (decoded.purpose !== "Email_Verification")
    return res.status(400).json({ error: "Invalid Token Purpose" });
  if (decoded.otp !== otp)
    return res.status(400).json({ error: "Invalid OTP" });
};
