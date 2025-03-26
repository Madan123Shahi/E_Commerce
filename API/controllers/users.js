const User = require("../models/user");

const register = async (req, res) => {
  try {
    const { name, contact, password } = req.body;
    // First we will check if the customer already exists or not via unique contact info
    const userExists = await User.findOne({ contact });
    if (userExists)
      res
        .status(400)
        .json({ message: "User already exists with the same email or number" });
    const user = await User.create({
      name,
      contact,
      password,
    });
    res.status(201).json({ message: "User Registered" }, { User: user });
  } catch (error) {
    console.error("Registration Error", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = register;
