import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const validateUser = async (req, res, next) => {
  let user;
  const { username, password } = req.body;
  try {
    user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "Username not found" });

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.status(400).json({ message: "Incorrect Password" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
};

export default validateUser;
