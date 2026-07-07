import prisma from "../config/prisma.js";

import { getLivePrice } from "../services/marketSimulator.js";

export const getAllHoldings = async (req, res) => {
    try {
        const holdings = await prisma.holding.findMany({
            where: {
                userId: req.userId,
            },
        });

        const symbols = holdings.map((holding) => holding.name);

        const stocks = await prisma.stock.findMany({
            where: {
                symbol: {
                    in: symbols,
                },
            },
        });

        const stockMap = new Map(stocks.map((stock) => [stock.symbol, stock]));

        const holdingsWithMarketData = holdings.map((holding) => {
            const stock = stockMap.get(holding.name);

            const currentPrice = stock
                ? (getLivePrice(stock.symbol) ?? stock.price)
                : holding.avg;

            const previousClose = stock?.previousClose ?? currentPrice;

            const netChange =
                ((currentPrice - holding.avg) / holding.avg) * 100;

            const dayChange =
                previousClose > 0
                    ? ((currentPrice - previousClose) / previousClose) * 100
                    : 0;

            const investment = holding.avg * holding.qty;

            const currentValue = currentPrice * holding.qty;

            const pnl = currentValue - investment;

            return {
                id: holding.id,
                name: holding.name,
                qty: holding.qty,
                avg: holding.avg,

                price: currentPrice,

                net: `${netChange >= 0 ? "+" : ""}${netChange.toFixed(2)}%`,

                day: `${dayChange >= 0 ? "+" : ""}${dayChange.toFixed(2)}%`,

                pnl: Number(pnl.toFixed(2)),

                currentValue: Number(currentValue.toFixed(2)),

                isLoss: dayChange < 0,
            };
        });

        return res.status(200).json(holdingsWithMarketData);
    } catch (error) {
        console.error("Get holdings error:", error);

        return res.status(500).json({
            message: "Failed to fetch holdings",
        });
    }
};
