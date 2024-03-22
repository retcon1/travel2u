import User from "../models/user.model.js";

export const addFavourite = async (req, res) => {
  const { newFave } = req.body;
  if (!newFave || typeof newFave !== "string") {
    return res.status(400).json({ message: "Invalid favourite" });
  }

  try {
    const user = await User.findOne({ _id: req.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.favourites.push(newFave);
    user.favourites.sort(); // keeps the array alphabetical

    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({ user: userResponse });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const removeFavourite = async (req, res) => {
  const { faveToRemove } = req.body;
  if (!faveToRemove || typeof faveToRemove !== "string") {
    return res.status(400).json({ message: "Invalid favourite" });
  }

  try {
    const user = await User.findOne({ _id: req.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.favourites = user.favourites.filter((fave) => fave !== faveToRemove);

    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({ user: userResponse });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getFavourites = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ favourites: user.favourites });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
