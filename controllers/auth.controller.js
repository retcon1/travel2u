import User from "../models/user.model.js";

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
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
