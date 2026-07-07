import prisma from "../config/prisma.js";

import { getLivePrice } from "../services/marketSimulator.js";

export const getAllPositions = async (req, res) => {
    try {
        const positions = await prisma.position.findMany({
            where: {
                userId: req.userId,
            },
        });

        const symbols = positions.map((position) => position.name);

        const stocks = await prisma.stock.findMany({
            where: {
                symbol: {
                    in: symbols,
                },
            },
        });

        const stockMap = new Map(stocks.map((stock) => [stock.symbol, stock]));

        const result = positions.map((position) => {
            const stock = stockMap.get(position.name);

            const currentPrice = stock
                ? (getLivePrice(stock.symbol) ?? stock.price)
                : position.avg;

            const previousClose = stock?.previousClose ?? currentPrice;

            const pnl = (currentPrice - position.avg) * position.qty;

            const netChange =
                ((currentPrice - position.avg) / position.avg) * 100;

            const dayChange =
                previousClose > 0
                    ? ((currentPrice - previousClose) / previousClose) * 100
                    : 0;

            return {
                id: position.id,
                product: position.product,
                name: position.name,
                qty: position.qty,
                avg: position.avg,
                price: currentPrice,

                pnl: Number(pnl.toFixed(2)),

                net: `${netChange >= 0 ? "+" : ""}${netChange.toFixed(2)}%`,

                day: `${dayChange >= 0 ? "+" : ""}${dayChange.toFixed(2)}%`,

                isLoss: dayChange < 0,
            };
        });

        return res.status(200).json(result);
    } catch (error) {
        console.error("Get positions error:", error);

        return res.status(500).json({
            message: "Failed to fetch positions",
        });
    }
};
