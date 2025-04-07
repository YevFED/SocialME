import User from "../models/user.models.js";

export const getUser = async (req, res) => {
  const { user } = req.user;

  const isUser = await User.findOne({ _id: user._id });

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

export const editUser = async (req, res) => {
  try {
    const { user } = req.user;

    const { newEmail, newName } = req.body;

    const updateduser = await User.findByIdAndUpdate(
      user._id,
      { email: newEmail, fullName: newName },
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
