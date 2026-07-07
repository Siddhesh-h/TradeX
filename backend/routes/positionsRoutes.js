import express from "express";

import { getAllPositions } from "../controllers/positionsController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllPositions);

export default router;
