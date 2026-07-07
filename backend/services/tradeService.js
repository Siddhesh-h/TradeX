export const buyDelivery = async ({
    tx,
    userId,
    symbol,
    quantity,
    executionPrice,
    orderValue,
}) => {
    const account = await tx.account.findUnique({
        where: {
            userId,
        },
    });

    if (!account) {
        throw new Error("ACCOUNT_NOT_FOUND");
    }

    if (account.availableCash < orderValue) {
        throw new Error("INSUFFICIENT_FUNDS");
    }

    const existingHolding = await tx.holding.findUnique({
        where: {
            userId_name: {
                userId,
                name: symbol,
            },
        },
    });

    if (existingHolding) {
        const oldInvestment = existingHolding.avg * existingHolding.qty;

        const newInvestment = executionPrice * quantity;

        const newQty = existingHolding.qty + quantity;

        const newAverage = (oldInvestment + newInvestment) / newQty;

        await tx.holding.update({
            where: {
                id: existingHolding.id,
            },

            data: {
                qty: newQty,
                avg: newAverage,
            },
        });
    } else {
        await tx.holding.create({
            data: {
                name: symbol,
                qty: quantity,
                avg: executionPrice,
                userId,
            },
        });
    }

    await tx.account.update({
        where: {
            userId,
        },

        data: {
            availableCash: {
                decrement: orderValue,
            },
        },
    });
};

export const sellDelivery = async ({
    tx,
    userId,
    symbol,
    quantity,
    orderValue,
}) => {
    const holding = await tx.holding.findUnique({
        where: {
            userId_name: {
                userId,
                name: symbol,
            },
        },
    });

    if (!holding) {
        throw new Error("HOLDING_NOT_FOUND");
    }

    if (holding.qty < quantity) {
        throw new Error("INSUFFICIENT_QUANTITY");
    }

    const remainingQty = holding.qty - quantity;

    if (remainingQty === 0) {
        await tx.holding.delete({
            where: {
                id: holding.id,
            },
        });
    } else {
        await tx.holding.update({
            where: {
                id: holding.id,
            },

            data: {
                qty: remainingQty,
            },
        });
    }

    await tx.account.update({
        where: {
            userId,
        },

        data: {
            availableCash: {
                increment: orderValue,
            },
        },
    });
};

export const buyIntraday = async ({
    tx,
    userId,
    symbol,
    quantity,
    executionPrice,
    orderValue,
}) => {
    const account = await tx.account.findUnique({
        where: {
            userId,
        },
    });

    if (!account) {
        throw new Error("ACCOUNT_NOT_FOUND");
    }

    if (account.availableCash < orderValue) {
        throw new Error("INSUFFICIENT_FUNDS");
    }

    const existingPosition = await tx.position.findUnique({
        where: {
            userId_name_product: {
                userId,
                name: symbol,
                product: "INTRADAY",
            },
        },
    });

    if (existingPosition) {
        const oldInvestment = existingPosition.avg * existingPosition.qty;

        const newInvestment = executionPrice * quantity;

        const newQty = existingPosition.qty + quantity;

        const newAverage = (oldInvestment + newInvestment) / newQty;

        await tx.position.update({
            where: {
                id: existingPosition.id,
            },

            data: {
                qty: newQty,
                avg: newAverage,
            },
        });
    } else {
        await tx.position.create({
            data: {
                product: "INTRADAY",
                name: symbol,
                qty: quantity,
                avg: executionPrice,
                userId,
            },
        });
    }

    await tx.account.update({
        where: {
            userId,
        },

        data: {
            availableCash: {
                decrement: orderValue,
            },
        },
    });
};

export const sellIntraday = async ({
    tx,
    userId,
    symbol,
    quantity,
    orderValue,
}) => {
    const position = await tx.position.findUnique({
        where: {
            userId_name_product: {
                userId,
                name: symbol,
                product: "INTRADAY",
            },
        },
    });

    if (!position) {
        throw new Error("POSITION_NOT_FOUND");
    }

    if (position.qty < quantity) {
        throw new Error("INSUFFICIENT_POSITION_QUANTITY");
    }

    const remainingQty = position.qty - quantity;

    if (remainingQty === 0) {
        await tx.position.delete({
            where: {
                id: position.id,
            },
        });
    } else {
        await tx.position.update({
            where: {
                id: position.id,
            },

            data: {
                qty: remainingQty,
            },
        });
    }

    await tx.account.update({
        where: {
            userId,
        },

        data: {
            availableCash: {
                increment: orderValue,
            },
        },
    });
};
