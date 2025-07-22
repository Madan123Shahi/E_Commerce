import crypto from "crypto";
import jwt from "jsonwebtoken";

export const generateOTP = () => {
  try {
    const otp = crypto.randomInt(100000, 999999);
    return otp.toString().padStart(6, "0");
  } catch (error) {
    console.error(`Error generating OTP:${error}`);
  }
};

export const generateToken = (payload, expiresIn = "5m") => {
  if (!process.env.JWT_SECRET) {
    throw new Error(`JWT_SECRET is not defined in Environment Variables`);
  }
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
    algorithm: "HS256",
  });
};

export const verifyToken = (token) => {
  const JWT_ERRORS = {
    JsonWebTokenError: "Invalid Token",
    TokenExpiredError: "Token Expired",
  };
  try {
    if (!token) {
      throw new Error(`No Token Provided`);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error(JWT_ERRORS[error.name] || "Token Verification Failed");
  }
};
