import express from "express";
import { registerUser } from "../controllers/auth.controller.js";
const router = express.Router();

// Creating user
router.post("/signup", registerUser);

export default router;