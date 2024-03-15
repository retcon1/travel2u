import express from "express";
import { addFavourite, getFavourites, removeFavourite } from "../controllers/favourites.controller.js";
import verifyToken from "../middlewares/authJwt.js";
const router = express.Router();

// Add favourite to user
router.patch("/", verifyToken, addFavourite);

// Remove favourite from user
router.delete("/", verifyToken, removeFavourite);

// Get favourites from user
router.get("/", verifyToken, getFavourites);

export default router;
