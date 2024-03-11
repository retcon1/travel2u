import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).json({ message: "Username Taken" });

  try {
    const user = new User({
      username: username,
      password: password,
    });
    const newUser = await user.save();
    res.status(201).json({ newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.status(404).json({ message: "Username not found" });

  const valid = await bcrypt.compare(password, user.password);
  
  if (valid) return res.status(200).json({ user });

  return res.status(400).json({ message: "Incorrect Password" });
};
