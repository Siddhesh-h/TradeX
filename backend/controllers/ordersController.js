import prisma from "../config/prisma.js";

import { getLivePrice } from "../services/marketSimulator.js";

import {
    buyDelivery,
    sellDelivery,
    buyIntraday,
    sellIntraday,
} from "../services/tradeService.js";

export const createOrder = async (req, res) => {
    try {
        const { symbol, qty, mode, product } = req.body;

        const quantity = Number(qty);

        if (!symbol || !Number.isInteger(quantity) || quantity <= 0) {
            return res.status(400).json({
                message: "Invalid order details",
            });
        }

        if (!["BUY", "SELL"].includes(mode)) {
            return res.status(400).json({
                message: "Invalid order mode",
            });
        }

        if (!["DELIVERY", "INTRADAY"].includes(product)) {
            return res.status(400).json({
                message: "Invalid product type",
            });
        }

        const stock = await prisma.stock.findUnique({
            where: {
                symbol,
            },
        });

        if (!stock) {
            return res.status(404).json({
                message: "Stock not found",
            });
        }

        const executionPrice = getLivePrice(stock.symbol) ?? stock.price;

        const orderValue = executionPrice * quantity;

        const order = await prisma.$transaction(async (tx) => {
            const tradeData = {
                tx,
                userId: req.userId,
                symbol,
                quantity,
                executionPrice,
                orderValue,
            };

            if (product === "DELIVERY" && mode === "BUY") {
                await buyDelivery(tradeData);
            }

            if (product === "DELIVERY" && mode === "SELL") {
                await sellDelivery(tradeData);
            }

            if (product === "INTRADAY" && mode === "BUY") {
                await buyIntraday(tradeData);
            }

            if (product === "INTRADAY" && mode === "SELL") {
                await sellIntraday(tradeData);
            }

            return tx.order.create({
                data: {
                    name: symbol,
                    qty: quantity,
                    price: executionPrice,
                    mode,
                    product,
                    status: "EXECUTED",
                    userId: req.userId,
                },
            });
        });

        return res.status(201).json({
            message: `${mode} ${product} order executed successfully`,
            order,
        });
    } catch (error) {
        console.error("Order execution error:", error);

        const errors = {
            ACCOUNT_NOT_FOUND: "Trading account not found",

            INSUFFICIENT_FUNDS: "Insufficient available cash",

            HOLDING_NOT_FOUND: "You do not own this stock",

            INSUFFICIENT_QUANTITY:
                "You do not have enough delivery shares to sell",

            POSITION_NOT_FOUND:
                "You do not have an open intraday position in this stock",

            INSUFFICIENT_POSITION_QUANTITY:
                "You do not have enough intraday quantity to sell",
        };

        const message = errors[error.message];

        if (message) {
            return res.status(400).json({
                message,
            });
        }

        return res.status(500).json({
            message: "Order execution failed",
        });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            where: {
                userId: req.userId,
            },

            orderBy: {
                createdAt: "desc",
            },
        });

        return res.status(200).json(orders);
    } catch (error) {
        console.error("Get orders error:", error);

        return res.status(500).json({
            message: "Failed to fetch orders",
        });
    }
};
