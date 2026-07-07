import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import prisma from "./config/prisma.js";

import authRoutes from "./routes/authRoutes.js";
import passport from "./config/passport.js";
import cookieParser from "cookie-parser";
import holdingsRoutes from "./routes/holdingsRoutes.js";
import positionsRoutes from "./routes/positionsRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import fundsRoutes from "./routes/fundsRoutes.js";
import marketRoutes from "./routes/marketRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import { startMarketSimulator } from "./services/marketSimulator.js";

dotenv.config();

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

app.use("/api/auth", authRoutes);

app.use("/api/holdings", holdingsRoutes);
app.use("/api/positions", positionsRoutes);
app.use("/api/funds", fundsRoutes);
app.use("/api", ordersRoutes);
app.use("/api/market", marketRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 3002;

async function startServer() {
    try {
        await prisma.$connect();

        console.log("Database connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);

            startMarketSimulator();
        });
    } catch (error) {
        console.error("Database connection failed:", error);

        process.exit(1);
    }
}

startServer();
