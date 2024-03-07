import User from "../models/user.model.js";

export const registerUser = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
