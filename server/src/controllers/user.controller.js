import User from "../models/user.models.js";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  const isUser = await User.findOne({ _id: req.user._id });

  if (!isUser) {
    return res.status(401);
  }

  return res.json({
    user: {
      fullName: isUser.fullName,
      email: isUser.email,
      _id: isUser._id,
    },
  });
};

export const updateUser = async (req, res) => {
  try {
    const { user } = req.user;

    const { email, fullName } = req.body;

    const updateduser = await User.findByIdAndUpdate(
      user._id,
      { email, fullName },
      { new: true }
    );

    if (!updateduser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updateduser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
