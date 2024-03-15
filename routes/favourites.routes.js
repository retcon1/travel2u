import express from "express";
import { addFavourite, removeFavourite } from "../controllers/favourites.controller.js";
import verifyToken from "../middlewares/authJwt.js";
const router = express.Router();

// Add favourite to user
router.patch("/", verifyToken, addFavourite);

// Remove favourite from user
router.delete("/", verifyToken, removeFavourite);

export default router;
