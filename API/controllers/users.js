const User = require("../models/user");
const sendOTP = require("../utils/twilio");
// const { storeOTP } = require("../utils/storeOTP");
// const jwt = require("jsonwebtoken");
const { signToken, verifyToken } = require("../utils/jwt");
const logger = require("../utils/logger");

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();
// Single Export
exports.register = async (req, res, next) => {
  const { name, contact, password } = req.body;
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  const isNumber = /^(\+\d{1,3}[- ]?)?\d{10}$/.test(contact);
  if (!name || !contact || !password) {
    logger.warn("Register:Missing Required Fields");
    return res
      .status(400)
      .json({ Success: false, Message: "All Fields Required" });
  }
  try {
    // First we will check if the customer already exists or not via unique contact info
    const userExists = await User.findOne({ contact });
    if (userExists) {
      logger.warn(
        `Register:User is already exists with the Contact ${contact}`
      );
      return res.status(400).json({
        success: false,
        message: `Register:User is already exists with the Contact ${contact}`,
      });
    }
    const otp = generateOTP();
    const otpExpiry = Date.now() + 10 * 60 * 1000;
    // await sendOTP(contact, otp);
    logger.info(`OTP Sent for the Contact ${contact} with ${otp}`);

    // const user = await User.create({
    //   name,
    //   contact,
    //   password,
    //   otp,
    //   otpExpiry,
    // });
    // storeOTP.set(contact, {
    //   name,
    //   contact,
    //   password,
    //   otp,
    //   otpExpiry,
    // });

    // const tempToken = jwt.sign(
    //   {
    //     name,
    //     contact,
    //     password,
    //     otp,
    //   },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1d" }
    // );
    if (isNumber) {
      await sendOTP(contact, otp);
    }
    const token = signToken({
      name,
      contact,
      otp,
      password,
      otpExpiry,
    });

    // set Cookie
    res.cookie("Token", token, {
      httpOnly: false, // IF front end needs to read it
      secure: process.env.NODE_ENV === "production", // Use https in production
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 24 days
    });

    logger.info(`Temp Token Generated for the Contact ${contact}`);
    return res.status(201).json({
      success: true,
      message: "OTP sent Successfully, please verify to complete registration",
      token,
      // Don't send OTP in production Envvironment
      ...(process.env.NODE_ENV !== "production" && { otp }),
      // user: {
      //   id: user._id,
      //   name: user.name,
      //   contact: user.contact,
      //   otp: user.otp,
      //   password: user.password,
      // },
    });
  } catch (error) {
    logger.error(`Registration Error:${error.message}`);
    // return res.status(500).json({
    //   success: false,
    //   message: "Internal Server Error",
    // });
    next(error);
  }
};

exports.verifyUser = async (req, res, next) => {
  const { token, otp } = req.body;

  if (!token || !otp) {
    logger.warn(`Verify:Missing OTP Or Token`);
    console.log(token, otp);
    return res
      .status(400)
      .json({ Success: false, Message: "Token And OTP Required" });
  }
  try {
    const decoded = verifyToken(token);
    console.log(decoded);

    if (decoded.otp !== otp || Date.now() > decoded.otpExpiry) {
      logger.warn(`Verify:OTP Mismatch Or Expired for ${decoded.contact}`);
      return res
        .status(400)
        .json({ Success: false, Message: "Invalid OTP or OTP Expired" });
    }
    const user = await User.create({
      name: decoded.name,
      contact: decoded.contact,
      password: decoded.password,
      isVerified: true,
    });
    console.log(user);
    logger.info(`User Created Successfully:${user._id}`);
    return res.status(201).json({
      Success: true,
      Message: "User Verified And Registered Successfully",
      user: {
        id: user._id,
        name: user.name,
        contact: user.contact,
      },
    });
  } catch (error) {
    // if (error.name === "ValidationError")
    //   return res.status(400).json({ Success: false, Message: error.message });
    // if (error.name === "TokenExpiredError")
    //   return res.status(401).json({
    //     Success: false,
    //     Message: "Token Expired.Please try again to register",
    //   });
    // if (error.name === "JsonWebTokenError")
    //   return res
    //     .status(401)
    //     .json({ Success: false, Message: "Invalid or Tampered Token" });
    logger.error(`OTP ${otp} verification Error:${error.message}`);
    console.error(`OTP ${otp} verification Error`, error.message);
    next(error);

    //   return res
    //     .status(500)
    //     .json({ Success: false, Message: "Internal Server Error" });
    // }
  }
};

// module.exports = register;
// module.exports.storeOTP = this.storeOTP;

exports.contactChecker = async (req, res, next) => {
  const { contact } = req.body;
  try {
    if (!contact) {
      logger.warn(`Contact Field is Missing`);
      return res
        .status(400)
        .json({ Success: false, Message: "Contact Field is Missing" });
    }
    const user = await User.findOne({ contact });
    if (user) {
      logger.warn(`User is already exists with ${contact}`);
      return res.status(400).json({
        Success: false,
        Message: `User is already exists with ${contact}`,
      });
    }
    logger.info(`Create new User with this ${contact}`);
    res
      .status(200)
      .json({ Success: true, Message: `Create new User with this ${contact}` });
  } catch (error) {
    logger.error(`Contact Error:${error.message}`);
    next(error);
  }
};
