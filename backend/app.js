import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import passport from "./config/passport.js";

import authRoutes from "./routes/authRoutes.js";
import holdingsRoutes from "./routes/holdingsRoutes.js";
import positionsRoutes from "./routes/positionsRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import fundsRoutes from "./routes/fundsRoutes.js";
import marketRoutes from "./routes/marketRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();

app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:5174"],
        credentials: true,
    }),
);

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(cookieParser());

app.use(passport.initialize());

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "TradeX API is running",
    });
});

app.use("/api/auth", authRoutes);

app.use("/api/holdings", holdingsRoutes);

app.use("/api/positions", positionsRoutes);

app.use("/api/funds", fundsRoutes);

app.use("/api", ordersRoutes);

app.use("/api/market", marketRoutes);

app.use("/api/dashboard", dashboardRoutes);

export default app;
