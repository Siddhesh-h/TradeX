import "dotenv/config";

import app from "./app.js";
import prisma from "./config/prisma.js";

import { startMarketSimulator } from "./services/marketSimulator.js";

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
