import prisma from "../config/prisma.js";

import { getLivePrice } from "../services/marketSimulator.js";

export const getDashboardSummary = async (req, res) => {
    try {
        const userId = req.userId;

        const [account, holdings, positions] = await Promise.all([
            prisma.account.findUnique({
                where: {
                    userId,
                },
            }),

            prisma.holding.findMany({
                where: {
                    userId,
                },
            }),

            prisma.position.findMany({
                where: {
                    userId,
                },
            }),
        ]);

        if (!account) {
            return res.status(404).json({
                message: "Trading account not found",
            });
        }

        // --------------------------------
        // Get all required stock symbols
        // --------------------------------

        const symbols = [
            ...new Set([
                ...holdings.map((holding) => holding.name),

                ...positions.map((position) => position.name),
            ]),
        ];

        const stocks =
            symbols.length > 0
                ? await prisma.stock.findMany({
                      where: {
                          symbol: {
                              in: symbols,
                          },
                      },
                  })
                : [];

        const stockMap = new Map(stocks.map((stock) => [stock.symbol, stock]));

        // --------------------------------
        // Holdings calculations
        // --------------------------------

        let holdingsInvestment = 0;
        let holdingsCurrentValue = 0;

        for (const holding of holdings) {
            const stock = stockMap.get(holding.name);

            const currentPrice = stock
                ? (getLivePrice(stock.symbol) ?? stock.price)
                : holding.avg;

            holdingsInvestment += holding.avg * holding.qty;

            holdingsCurrentValue += currentPrice * holding.qty;
        }

        const holdingsPNL = holdingsCurrentValue - holdingsInvestment;

        // --------------------------------
        // Position calculations
        // --------------------------------

        let positionsExposure = 0;
        let positionsCurrentValue = 0;

        for (const position of positions) {
            const stock = stockMap.get(position.name);

            const currentPrice = stock
                ? (getLivePrice(stock.symbol) ?? stock.price)
                : position.avg;

            positionsExposure += position.avg * position.qty;

            positionsCurrentValue += currentPrice * position.qty;
        }

        const positionsPNL = positionsCurrentValue - positionsExposure;

        // --------------------------------
        // Combined values
        // --------------------------------

        const totalExposure = holdingsInvestment + positionsExposure;

        const currentValue = holdingsCurrentValue + positionsCurrentValue;

        const totalPNL = holdingsPNL + positionsPNL;

        const pnlPercent =
            totalExposure > 0 ? (totalPNL / totalExposure) * 100 : 0;

        // --------------------------------
        // Response
        // --------------------------------

        return res.status(200).json({
            availableCash: account.availableCash,

            usedMargin: account.usedMargin,

            holdings: {
                count: holdings.length,

                investment: Number(holdingsInvestment.toFixed(2)),

                currentValue: Number(holdingsCurrentValue.toFixed(2)),

                pnl: Number(holdingsPNL.toFixed(2)),
            },

            positions: {
                count: positions.length,

                exposure: Number(positionsExposure.toFixed(2)),

                currentValue: Number(positionsCurrentValue.toFixed(2)),

                pnl: Number(positionsPNL.toFixed(2)),
            },

            portfolio: {
                totalExposure: Number(totalExposure.toFixed(2)),

                currentValue: Number(currentValue.toFixed(2)),

                totalPNL: Number(totalPNL.toFixed(2)),

                pnlPercent: Number(pnlPercent.toFixed(2)),
            },
        });
    } catch (error) {
        console.error("Dashboard summary error:", error);

        return res.status(500).json({
            message: "Failed to load dashboard summary",
        });
    }
};
