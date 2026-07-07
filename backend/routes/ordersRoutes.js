import express from "express";

import { createOrder, getAllOrders } from "../controllers/ordersController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/newOrder", protect, createOrder);

router.get("/orders", protect, getAllOrders);

export default router;
