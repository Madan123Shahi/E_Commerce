import mongoose from "mongoose";
export const connectDB = async () => {
  if (!process.env.MONGO_URI)
    throw new Error(`Environment Variable is not set for mongoDB`);
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database Connected Successfully`);
  } catch (error) {
    console.log(`Error Connecting Database:${error.message}`);
    throw new Error(`Database Connection Error`);
  }
};
