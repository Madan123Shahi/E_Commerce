const User = require("../models/user");
const sendOTP = require("../utils/twilio");
// const { storeOTP } = require("../utils/storeOTP");
const jwt = require("jsonwebtoken");

// Single Export
const register = async (req, res) => {
  const { name, contact, password } = req.body;
  const generateOTP = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // First we will check if the customer already exists or not via unique contact info
    const userExists = await User.findOne({ contact });
    if (userExists)
      return res.status(400).json({
        success: false,
        message: "User already exists with the same email or number",
      });

    const otp = generateOTP();
    // const otpExpiry = Date.now() + 10 * 60 * 1000;

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

    await sendOTP(contact, otp);

    const tempToken = jwt.sign(
      {
        name,
        contact,
        password,
        otp,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res.status(201).json({
      success: true,
      message: "OTP sent Successfully, please verify to complete registration",
      token: tempToken,
      otp,
      // user: {
      //   id: user._id,
      //   name: user.name,
      //   contact: user.contact,
      //   otp: user.otp,
      //   password: user.password,
      // },
    });
  } catch (error) {
    console.error("Registration Error", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = register;
// module.exports.storeOTP = this.storeOTP;
