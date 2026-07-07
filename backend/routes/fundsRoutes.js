import express from "express";

import {
    getFunds,
    addFunds,
    withdrawFunds,
    getFundTransactions,
} from "../controllers/fundsController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getFunds);

router.post("/add", protect, addFunds);

router.post("/withdraw", protect, withdrawFunds);

router.get("/transactions", protect, getFundTransactions);

export default router;
