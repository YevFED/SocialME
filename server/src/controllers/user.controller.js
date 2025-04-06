import User from "../models/user.models.js";

export const getUser = async (req, res) => {
  const isUser = await User.findOne({ _id: req.user._id });

  if (!isUser) {
    return res.status(401);
  }

  return res.json({
    user: {
      fullName: isUser.fullName,
      email: isUser.email,
    },
  });
};
