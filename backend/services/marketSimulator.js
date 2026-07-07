import prisma from "../config/prisma.js";

const livePrices = new Map();

let simulatorInterval = null;

export const initializeMarket = async () => {
    const stocks = await prisma.stock.findMany();

    livePrices.clear();

    for (const stock of stocks) {
        livePrices.set(stock.symbol, stock.price);
    }

    console.log(`${livePrices.size} simulated stocks loaded`);
};

const updateMarketPrices = () => {
    for (const [symbol, currentPrice] of livePrices) {
        const movementPercent = Math.random() * 0.6 - 0.3;

        const priceChange = currentPrice * (movementPercent / 100);

        const newPrice = Math.max(
            1,
            Number((currentPrice + priceChange).toFixed(2)),
        );

        livePrices.set(symbol, newPrice);
    }

    console.log("Simulated market tick");
};

export const getLivePrice = (symbol) => {
    return livePrices.get(symbol);
};

export const getAllLivePrices = () => {
    return livePrices;
};

export const startMarketSimulator = async () => {
    if (simulatorInterval) {
        return;
    }

    await initializeMarket();

    simulatorInterval = setInterval(updateMarketPrices, 5000);

    console.log("Simulated market engine started");
};

export const stopMarketSimulator = () => {
    if (!simulatorInterval) {
        return;
    }

    clearInterval(simulatorInterval);

    simulatorInterval = null;
};
