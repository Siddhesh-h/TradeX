import express from "express";
import passport from "../config/passport.js";

import { signup, login, logout, getMe } from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post(
    "/login",
    passport.authenticate("local", {
        session: false,
    }),
    login,
);

router.get("/me", protect, getMe);

router.post("/logout", logout);

export default router;
