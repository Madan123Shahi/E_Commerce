import User from "../models/userM.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const registerUser = async (req, res) => {
  const { name, email, phone, password, role, isActive } = req.body;
  if (!name || !email || !phone || !password) {
    console.log("All fields are required");
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) {
      const emailExists = userExists.email === email;
      const field = emailExists ? "Email" : "Phone Number";
      console.log(
        `User already exists with ${field}:${emailExists ? email : phone}`
      );

      return res.status(400).json({
        message: `User already exists with ${field}:${
          emailExists ? email : phone
        }`,
      });
    }
    const user = await User.create({
      name,
      email,
      phone,
      password,
      role,
      isActive,
    });
    return res.status(201).json({
      message: "User Created Successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isActive: user.isActive,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.log(`Server Error:${error.message}`);

    return res.status(500).json({ message: `Server Error:${error.message}` });
  }
};

export const getUser = async (req, res) => {
  const { email, phone } = req.body;
  try {
    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (!user) {
      return res.status(400).json({ message: `User doesn't exists` });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(`Server Error:${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

export const logIn = async (req, res) => {
  console.log("Logged In started");
  const { email, phone, password } = req.body;
  if ((!email && !phone) || !password) {
    return res
      .status(400)
      .json({ message: "Email/Phone and Password is required" });
  }
  console.log("All fields are provided");
  try {
    const user = await User.findOne({ $or: [{ email }, { phone }] }).select(
      "+password"
    );
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const isMatch = await user.matchPassword(password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: "Password Doesn't Match" });
    }
    const token = generateToken(user._id);
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
      });
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteUser = async (req, res) => {
  const { email, phone } = req.body;
  try {
    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // Soft Delete recommended for production
    user.isActive = false;
    await user.save();
    return res.status(200).json("User deleted Successfully");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
