import User from "../models/userM.js";
import { config } from "dotenv";
config();
export const createAdmin = async () => {
  const admins = [
    {
      name: process.env.ADMIN1_NAME,
      email: process.env.ADMIN1_EMAIL,
      phone: process.env.ADMIN1_PHONE,
      password: process.env.ADMIN1_PASS,
      role: "admin",
    },
    {
      name: process.env.ADMIN2_NAME,
      email: process.env.ADMIN2_EMAIL,
      phone: process.env.ADMIN2_PHONE,
      password: process.env.ADMIN2_PASS,
      role: "admin",
    },
  ];
  try {
    for (const allAdmin of admins) {
      const existAdmin = await User.findOne({
        // email: process.env.ADMIN1_EMAIL,
        email: allAdmin.email,
        role: "admin",
      });
      if (existAdmin) {
        console.log("Admin Already Exists");
      }
      const admin = new User({
        name: allAdmin.name,
        email: allAdmin.email,
        phone: allAdmin.phone,
        password: allAdmin.password,
        role: "admin",
      });
      await admin.save();
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
