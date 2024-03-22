import express from "express";
import { loginUser, registerUser, changePassword } from "../controllers/auth.controller.js";
import validateUser from "../middlewares/validateUser.js";
import verifyToken from "../middlewares/authJwt.js";
const router = express.Router();

// Creating user
router.post("/signup", registerUser);

router.post("/login", validateUser, loginUser);

router.patch("/change-pass", [validateUser, verifyToken], changePassword);

export default router;
