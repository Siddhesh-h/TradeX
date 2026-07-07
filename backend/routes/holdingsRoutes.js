import express from "express";

import { getAllHoldings } from "../controllers/holdingsController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllHoldings);

export default router;
