import express from "express";
import { addFavourite } from "../controllers/favourites.controller.js";
import verifyToken from "../middlewares/authJwt.js";
const router = express.Router();

// Add favourite to user
router.patch("/", verifyToken, addFavourite);

// Get one user
router.get("/:id", async (req, res) => {
  res.send(req.params.id);
});

// Update user
router.patch("/", async (req, res) => {});

export default router;
