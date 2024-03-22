import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username and password are required" });

  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).json({ message: "Username Taken" });

  try {
    const newUser = await User.create({
      username: username,
      password: password,
      favourites: [],
    });

    const responseUser = newUser.toObject();
    delete responseUser.password;

    const token = jwt.sign({ id: newUser.id }, process.env.SECRET, { expiresIn: 86400 });
    res.status(201).json({ newUser: { ...responseUser, token } });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = res.user;

    const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 86400 });

    const userCopy = user.toObject();
    delete userCopy.password;

    return res.status(200).json({ user: { ...userCopy, token } });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword) return res.status(400).json({ message: "New password is invalid" });

    const user = res.user;

    user.password = newPassword;

    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
