const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("User already exists");
  const user = await User.create({
    name,
    email,
    phone,
    passwor,
  });
});
