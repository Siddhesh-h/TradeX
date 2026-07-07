import { useEffect, useState } from "react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import ExitPositionModal from "../components/ExitPositionModal";

export default function Positions() {
    const { dataVersion } = useAuth();

    const [positions, setPositions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedPosition, setSelectedPosition] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchPositions = async () => {
            try {
                const response = await api.get("/positions");

                if (isMounted) {
                    setPositions(response.data);
                    setError("");
                }
            } catch (error) {
                console.error("Failed to fetch positions:", error);

                if (isMounted) {
                    setError("Unable to load positions");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchPositions();

        const interval = setInterval(fetchPositions, 5000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [dataVersion]);

    const totalInvestment = positions.reduce(
        (total, stock) => total + stock.avg * stock.qty,
        0,
    );

    const currentValue = positions.reduce(
        (total, stock) => total + stock.price * stock.qty,
        0,
    );

    const totalPNL = positions.reduce(
        (total, stock) => total + Number(stock.pnl || 0),
        0,
    );

    const totalPNLPercent =
        totalInvestment > 0
            ? ((totalPNL / totalInvestment) * 100).toFixed(2)
            : "0.00";

    if (loading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-slate-500">Loading positions...</p>
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
                    Positions
                </h1>

                <p className="mt-2 text-slate-500">
                    {positions.length} Open Positions
                </p>
            </div>

            {/* Empty State */}

            {positions.length === 0 ? (
                <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:min-h-[300px]">
                    <div className="text-center">
                        <h2 className="text-lg font-semibold text-slate-700">
                            No open positions
                        </h2>

                        <p className="mt-2 text-sm text-slate-400">
                            Your intraday positions will appear here.
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    <p className="text-xs text-slate-400 sm:hidden">
                        Swipe horizontally to view position details and exit
                        actions.
                    </p>
                    {/* Table */}

                    <div className="overflow-x-auto overscroll-x-contain rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <table className="w-full min-w-[1050px]">
                            <thead className="bg-slate-50">
                                <tr className="text-left text-sm text-slate-500">
                                    <th className="px-4 py-4 lg:px-6">
                                        Product
                                    </th>

                                    <th className="px-4 py-4 lg:px-6">
                                        Instrument
                                    </th>

                                    <th className="px-4 py-4 lg:px-6">Qty</th>

                                    <th className="px-4 py-4 lg:px-6">Avg.</th>

                                    <th className="px-4 py-4 lg:px-6">LTP</th>

                                    <th className="px-4 py-4 lg:px-6">
                                        P&amp;L
                                    </th>

                                    <th className="px-4 py-4 lg:px-6">
                                        Net Chg.
                                    </th>

                                    <th className="px-4 py-4 lg:px-6">
                                        Day Chg.
                                    </th>

                                    <th className="px-4 py-4 lg:px-6">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {positions.map((stock) => {
                                    const pnl = Number(stock.pnl || 0);

                                    const pnlClass =
                                        pnl >= 0
                                            ? "text-green-600"
                                            : "text-red-500";

                                    const dayClass = stock.isLoss
                                        ? "text-red-500"
                                        : "text-green-600";

                                    return (
                                        <tr
                                            key={stock.id}
                                            className="border-t border-slate-100 transition hover:bg-slate-50"
                                        >
                                            {/* Product */}

                                            <td className="px-4 py-5 lg:px-6">
                                                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
                                                    {stock.product}
                                                </span>
                                            </td>

                                            {/* Instrument */}

                                            <td className="px-4 lg:px-6">
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
                                                ₹{Number(stock.avg).toFixed(2)}
                                            </td>

                                            {/* LTP */}

                                            <td className="px-4 lg:px-6 font-medium">
                                                ₹
                                                {Number(stock.price).toFixed(2)}
                                            </td>

                                            {/* P&L */}

                                            <td
                                                className={`px-4 font-semibold lg:px-6 ${pnlClass}`}
                                            >
                                                {pnl >= 0 ? "+" : "-"}₹
                                                {Math.abs(pnl).toFixed(2)}
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

                                            {/* Actions */}

                                            <td className="px-4 lg:px-6">
                                                <button
                                                    onClick={() =>
                                                        setSelectedPosition(
                                                            stock,
                                                        )
                                                    }
                                                    className="cursor-pointer rounded-lg border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600 transition hover:bg-orange-100"
                                                >
                                                    Exit
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Summary */}

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                            <p className="text-sm text-slate-500">
                                Position Value
                            </p>

                            <h2 className="mt-3 break-words text-2xl font-bold sm:text-3xl">
                                ₹
                                {totalInvestment.toLocaleString("en-IN", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </h2>
                        </div>

                        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                            <p className="text-sm text-slate-500">
                                Current Value
                            </p>

                            <h2 className="mt-3 break-words text-2xl font-bold sm:text-3xl">
                                ₹
                                {currentValue.toLocaleString("en-IN", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
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
                                    totalPNL >= 0
                                        ? "text-green-700"
                                        : "text-red-700"
                                }`}
                            >
                                Overall P&amp;L
                            </p>

                            <h2
                                className={`mt-3 break-words text-2xl font-bold sm:text-3xl ${
                                    totalPNL >= 0
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                {totalPNL >= 0 ? "+" : "-"}₹
                                {Math.abs(totalPNL).toFixed(2)}
                            </h2>

                            <p
                                className={`mt-2 font-medium ${
                                    totalPNL >= 0
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                {totalPNL >= 0 ? "+" : ""}
                                {totalPNLPercent}%
                            </p>
                        </div>
                    </div>
                </>
            )}

            {selectedPosition && (
                <ExitPositionModal
                    position={selectedPosition}
                    onClose={() => setSelectedPosition(null)}
                />
            )}
        </div>
    );
}
