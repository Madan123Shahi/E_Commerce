import User from "../models/userM.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "5m" });
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

export const getUsers = async (req, res) => {
  // const { email, phone } = req.body;
  try {
    // const user = await User.findOne({ $or: [{ email }, { phone }] });
    // console.log(req.user._id);
    const user = await User.find({});
    if (!user) {
      return res.status(400).json({ message: `User doesn't exists` });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(`Server Error:${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

// Get a single user by ID and Admin can also access User
export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password -__v");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isOwner = req.user._id.toString() === id;
    const isAdmin = req.user.role === "admin";
    if (!isOwner && !isAdmin) {
      return res
        .status(403)
        .json({ message: "Not Authorised to access this user" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const logIn = async (req, res) => {
  const { email, phone, password } = req.body;
  if ((!email && !phone) || !password) {
    return res
      .status(400)
      .json({ message: "Email/Phone and Password is required" });
  }
  try {
    const user = await User.findOne({ $or: [{ email }, { phone }] }).select(
      "+password"
    );
    // console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const isMatch = await user.matchPassword(password);
    // console.log(isMatch);
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
  // const { name, email, phone, password } = req.body;
  const { id } = req.params;
  try {
    // const user = await User.findOne({ $or: [{ email }, { phone }] });
    const user = await User.findById(id);
    const isOwner = req.user._id.toString() == id;
    const isAdmin = req.user.role === "admin";
    if (!isAdmin && !isOwner) {
      return res.status(403).json("Not authorized to access other user");
    }
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
  const { id } = req.params;
  const isOwner = req.user._id === id;
  const isAmdin = req.user.role === "admin";
  try {
    if (!isOwner && !isAmdin) {
      return res
        .status(403)
        .json({ error: "Forbiddon: can not access other user" });
    }
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(400).json({ error: "User Not Found" });
    }
    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};
