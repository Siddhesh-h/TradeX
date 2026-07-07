import prisma from "../config/prisma.js";

export const getFunds = async (req, res) => {
    try {
        const account = await prisma.account.findUnique({
            where: {
                userId: req.userId,
            },

            select: {
                availableCash: true,
                usedMargin: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!account) {
            return res.status(404).json({
                message: "Trading account not found",
            });
        }

        res.status(200).json(account);
    } catch (error) {
        console.error("Get funds error:", error);

        res.status(500).json({
            message: "Failed to fetch funds",
        });
    }
};

export const addFunds = async (req, res) => {
    try {
        const amount = Number(req.body.amount);

        if (!Number.isFinite(amount) || amount <= 0) {
            return res.status(400).json({
                message: "Enter a valid amount",
            });
        }

        const result = await prisma.$transaction(async (tx) => {
            const account = await tx.account.findUnique({
                where: {
                    userId: req.userId,
                },
            });

            if (!account) {
                throw new Error("ACCOUNT_NOT_FOUND");
            }

            const updatedAccount = await tx.account.update({
                where: {
                    userId: req.userId,
                },

                data: {
                    availableCash: {
                        increment: amount,
                    },
                },
            });

            const transaction = await tx.fundTransaction.create({
                data: {
                    amount,
                    type: "DEPOSIT",
                    userId: req.userId,
                },
            });

            return {
                account: updatedAccount,
                transaction,
            };
        });

        res.status(200).json({
            message: "Funds added successfully",
            ...result,
        });
    } catch (error) {
        console.error("Add funds error:", error);

        if (error.message === "ACCOUNT_NOT_FOUND") {
            return res.status(404).json({
                message: "Trading account not found",
            });
        }

        res.status(500).json({
            message: "Failed to add funds",
        });
    }
};

export const withdrawFunds = async (req, res) => {
    try {
        const amount = Number(req.body.amount);

        if (!Number.isFinite(amount) || amount <= 0) {
            return res.status(400).json({
                message: "Enter a valid amount",
            });
        }

        const result = await prisma.$transaction(async (tx) => {
            const account = await tx.account.findUnique({
                where: {
                    userId: req.userId,
                },
            });

            if (!account) {
                throw new Error("ACCOUNT_NOT_FOUND");
            }

            if (account.availableCash < amount) {
                throw new Error("INSUFFICIENT_FUNDS");
            }

            const updatedAccount = await tx.account.update({
                where: {
                    userId: req.userId,
                },

                data: {
                    availableCash: {
                        decrement: amount,
                    },
                },
            });

            const transaction = await tx.fundTransaction.create({
                data: {
                    amount,
                    type: "WITHDRAWAL",
                    userId: req.userId,
                },
            });

            return {
                account: updatedAccount,
                transaction,
            };
        });

        res.status(200).json({
            message: "Withdrawal successful",
            ...result,
        });
    } catch (error) {
        console.error("Withdraw funds error:", error);

        if (error.message === "ACCOUNT_NOT_FOUND") {
            return res.status(404).json({
                message: "Trading account not found",
            });
        }

        if (error.message === "INSUFFICIENT_FUNDS") {
            return res.status(400).json({
                message: "Insufficient available balance",
            });
        }

        res.status(500).json({
            message: "Failed to withdraw funds",
        });
    }
};

export const getFundTransactions = async (req, res) => {
    try {
        const transactions = await prisma.fundTransaction.findMany({
            where: {
                userId: req.userId,
            },

            orderBy: {
                createdAt: "desc",
            },
        });

        res.status(200).json(transactions);
    } catch (error) {
        console.error("Get fund transactions error:", error);

        res.status(500).json({
            message: "Failed to fetch fund transactions",
        });
    }
};
