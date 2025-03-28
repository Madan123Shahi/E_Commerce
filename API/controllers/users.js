const User = require("../models/user");

const register = async (req, res) => {
  try {
    const { name, contact, password } = req.body;
    // First we will check if the customer already exists or not via unique contact info
    const userExists = await User.findOne({ contact });
    if (userExists)
      return res.status(400).json({
        success: false,
        message: "User already exists with the same email or number",
      });
    const user = await User.create({
      name,
      contact,
      password,
    });
    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: {
        id: user._id,
        name: user.name,
        contact: user.contact,
        password: user.password,
      },
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
