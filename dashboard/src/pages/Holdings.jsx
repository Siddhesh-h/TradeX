import React, { useEffect, useState } from "react";
import api from "../services/api.js";
import { useAuth } from "../context/AuthContext";

export default function Holdings() {
    const [holdings, setHoldings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { dataVersion } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const fetchHoldings = async () => {
            try {
                const response = await api.get("/holdings");

                if (isMounted) {
                    setHoldings(response.data);
                }
            } catch (error) {
                console.error(error);
                setError("Unable to load holdings");
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchHoldings();

        const interval = setInterval(fetchHoldings, 5000);

        return () => {
            isMounted = false;

            clearInterval(interval);
        };
    }, [dataVersion]);

    const totalInvestment = holdings.reduce(
        (acc, stock) => acc + stock.avg * stock.qty,
        0,
    );

    const currentValue = holdings.reduce(
        (acc, stock) => acc + stock.price * stock.qty,
        0,
    );

    const totalPNL = currentValue - totalInvestment;

    const totalPNLPercent =
        totalInvestment > 0
            ? ((totalPNL / totalInvestment) * 100).toFixed(2)
            : "0.00";

    if (loading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-slate-500">Loading holdings...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Header */}

            <div>
                <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                    Holdings
                </h1>

                <p className="mt-2 text-slate-500">
                    {holdings.length} Stocks in your portfolio
                </p>
            </div>

            <p className="text-xs text-slate-400 sm:hidden">
                Swipe horizontally to view all holding details.
            </p>

            {/* Table */}

            <div className="overflow-x-auto overscroll-x-contain rounded-2xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full min-w-[1000px]">
                    <thead className="bg-slate-50">
                        <tr className="text-left text-sm text-slate-500">
                            <th className="px-4 py-4 lg:px-6">Instrument</th>
                            <th className="px-4 py-4 lg:px-6">Qty</th>
                            <th className="px-4 py-4 lg:px-6">Avg.</th>
                            <th className="px-4 py-4 lg:px-6">LTP</th>
                            <th className="px-4 py-4 lg:px-6">Current Value</th>
                            <th className="px-4 py-4 lg:px-6">P&amp;L</th>
                            <th className="px-4 py-4 lg:px-6">Net Chg.</th>
                            <th className="px-4 py-4 lg:px-6">Day Chg.</th>
                        </tr>
                    </thead>

                    <tbody>
                        {holdings.map((stock) => {
                            const investment = stock.avg * stock.qty;

                            const curValue = stock.price * stock.qty;

                            const pnl = curValue - investment;

                            const isProfit = pnl >= 0;

                            const pnlClass = isProfit
                                ? "text-green-600"
                                : "text-red-500";

                            // We removed isLoss from the database,
                            // so calculate day movement from stock.day.
                            const isDayLoss = parseFloat(stock.day) < 0;

                            const dayClass = isDayLoss
                                ? "text-red-500"
                                : "text-green-600";

                            return (
                                <tr
                                    key={stock.id}
                                    className="border-t border-slate-100 transition hover:bg-slate-50"
                                >
                                    {/* Instrument */}

                                    <td className="px-4 py-5 lg:px-6">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-[#387ed1]">
                                                {stock.name.slice(0, 2)}
                                            </div>

                                            <div>
                                                <p className="font-semibold text-slate-800">
                                                    {stock.name}
                                                </p>

                                                <p className="text-xs text-slate-400">
                                                    NSE
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Qty */}

                                    <td className="px-4 lg:px-6">
                                        {stock.qty}
                                    </td>

                                    {/* Avg */}

                                    <td className="px-4 lg:px-6">
                                        ₹{stock.avg.toFixed(2)}
                                    </td>

                                    {/* LTP */}

                                    <td className="px-4 lg:px-6 font-medium">
                                        ₹{stock.price.toFixed(2)}
                                    </td>

                                    {/* Current Value */}

                                    <td className="px-4 lg:px-6 font-semibold">
                                        ₹{curValue.toFixed(2)}
                                    </td>

                                    {/* P&L */}

                                    <td
                                        className={`px-4 font-semibold lg:px-6 ${pnlClass}`}
                                    >
                                        ₹{pnl.toFixed(2)}
                                    </td>

                                    {/* Net Change */}

                                    <td
                                        className={`px-4 font-semibold lg:px-6 ${pnlClass}`}
                                    >
                                        {stock.net}
                                    </td>

                                    {/* Day Change */}

                                    <td
                                        className={`px-4 font-semibold lg:px-6 ${dayClass}`}
                                    >
                                        {stock.day}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Summary Cards */}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <p className="text-sm text-slate-500">Total Investment</p>

                    <h2 className="mt-3 break-words text-2xl font-bold sm:text-3xl">
                        ₹{totalInvestment.toFixed(2)}
                    </h2>
                </div>

                <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <p className="text-sm text-slate-500">Current Value</p>

                    <h2 className="mt-3 break-words text-2xl font-bold sm:text-3xl">
                        ₹{currentValue.toFixed(2)}
                    </h2>
                </div>

                <div
                    className={`min-w-0 rounded-2xl border p-5 shadow-sm sm:p-6 ${
                        totalPNL >= 0
                            ? "border-green-200 bg-green-50"
                            : "border-red-200 bg-red-50"
                    }`}
                >
                    <p
                        className={`text-sm ${
                            totalPNL >= 0 ? "text-green-700" : "text-red-700"
                        }`}
                    >
                        Overall P&amp;L
                    </p>

                    <h2
                        className={`mt-3 break-words text-2xl font-bold sm:text-3xl ${
                            totalPNL >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                    >
                        {totalPNL >= 0 ? "+" : "-"}₹
                        {Math.abs(totalPNL).toFixed(2)}
                    </h2>

                    <p
                        className={`mt-2 font-medium ${
                            totalPNL >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                    >
                        {totalPNL >= 0 ? "+" : ""}
                        {totalPNLPercent}%
                    </p>
                </div>
            </div>
        </div>
    );
}
