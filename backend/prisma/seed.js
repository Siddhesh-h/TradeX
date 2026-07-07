import prisma from "../config/prisma.js";

const stocks = [
    {
        symbol: "INFY",
        companyName: "Infosys",
        price: 1555.45,
        previousClose: 1580.74,
    },
    {
        symbol: "ONGC",
        companyName: "ONGC",
        price: 116.8,
        previousClose: 116.91,
    },
    {
        symbol: "TCS",
        companyName: "Tata Consultancy Services",
        price: 3194.8,
        previousClose: 3202.81,
    },
    {
        symbol: "KPITTECH",
        companyName: "KPIT Technologies",
        price: 266.45,
        previousClose: 257.34,
    },
    {
        symbol: "QUICKHEAL",
        companyName: "Quick Heal Technologies",
        price: 308.55,
        previousClose: 309.01,
    },
    {
        symbol: "WIPRO",
        companyName: "Wipro",
        price: 577.75,
        previousClose: 575.91,
    },
    {
        symbol: "M&M",
        companyName: "Mahindra & Mahindra",
        price: 779.8,
        previousClose: 779.88,
    },
    {
        symbol: "RELIANCE",
        companyName: "Reliance Industries",
        price: 2112.4,
        previousClose: 2082.41,
    },
    {
        symbol: "HUL",
        companyName: "Hindustan Unilever",
        price: 512.4,
        previousClose: 507.13,
    },
];

async function seedStocks() {
    try {
        for (const stock of stocks) {
            await prisma.stock.upsert({
                where: {
                    symbol: stock.symbol,
                },

                update: {
                    companyName: stock.companyName,
                    price: stock.price,
                    previousClose: stock.previousClose,
                },

                create: stock,
            });
        }

        console.log("Stocks seeded successfully");
    } catch (error) {
        console.error("Stock seed failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

seedStocks();
