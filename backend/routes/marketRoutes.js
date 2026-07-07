import express from "express";

import { getStocks } from "../controllers/marketController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stocks", protect, getStocks);

export default router;
