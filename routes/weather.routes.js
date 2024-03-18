import express from "express";
import { getWeather } from "../controllers/weather.controller.js";
const router = express.Router();

// Get weather for next 5 days
router.get("/:location", getWeather);

// Return 400 status for missing location parameter
router.get("/", (req, res) => {
  res.status(400).json({ message: "Location parameter is missing" });
});

export default router;
