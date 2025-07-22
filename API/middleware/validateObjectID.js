import mongoose from "mongoose";

export const validateObjectID = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: "Invalid ID format. Must be a 24-character hex string." });
  }
  next();
};
