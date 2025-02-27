import { generateToken } from "../lib/utils.js";
import User from "../models/user.models.js";
import bcrypt from "bcrypt";
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (password.lenght < 8) {
      return res
        .status(400)
        .json({ massage: "Password may have min 8 symbols" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Email already taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      //JWT Token creating

      generateToken(newUser._id, res);
      await newUser.save();

      return res.status(201).json({ newUser });
    } else {
      return res.status(400).json({ massage: "Eternal server error" });
    }
  } catch (error) {
    return res.status(400).json({ message: "error on creating user" + error });
  }
};

export const login = (req, res) => {
  res.send("lets login");
};
export const logout = (req, res) => {
  res.send("lets logout");
};
