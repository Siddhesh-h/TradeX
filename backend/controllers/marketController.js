import prisma from "../config/prisma.js";

import { getLivePrice } from "../services/marketSimulator.js";

export const getStocks = async (req, res) => {
    try {
        const stocks = await prisma.stock.findMany({
            orderBy: {
                symbol: "asc",
            },
        });

        const marketData = stocks.map((stock) => {
            const currentPrice = getLivePrice(stock.symbol) ?? stock.price;

            const change = currentPrice - stock.previousClose;

            const percentChange =
                stock.previousClose > 0
                    ? (change / stock.previousClose) * 100
                    : 0;

            return {
                id: stock.id,
                name: stock.symbol,
                companyName: stock.companyName,
                exchange: stock.exchange,

                price: currentPrice,

                previousClose: stock.previousClose,

                change: Number(change.toFixed(2)),

                percent: `${
                    percentChange >= 0 ? "+" : ""
                }${percentChange.toFixed(2)}%`,

                isDown: percentChange < 0,
            };
        });

        return res.status(200).json(marketData);
    } catch (error) {
        console.error("Get market stocks error:", error);

        return res.status(500).json({
            message: "Failed to fetch market data",
        });
    }
};
