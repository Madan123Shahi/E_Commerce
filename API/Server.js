import express from "express";
import { config } from "dotenv";
config({ debug: false });
import { connectDB } from "./config/connect.js";
import userRoute from "./routes/userR.js";
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json()); // To parse json bodies
app.use(express.urlencoded({ extended: true })); // to parse form data

// Routes
app.use("/api/users", userRoute);

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running successfully at PORT ${PORT}`);
    });
  } catch (error) {
    console.log(`Server Error:${error.message}`);
  }
};

start();
