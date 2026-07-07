import { useEffect, useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { toast } from "sonner";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function ExitPositionModal({ position, onClose }) {
    const { refreshDashboardData } = useAuth();

    const [quantity, setQuantity] = useState(position.qty);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {
        setQuantity(position.qty);
        setError("");
    }, [position]);

    const exitQuantity = Number(quantity);

    const isValidQuantity =
        Number.isInteger(exitQuantity) &&
        exitQuantity > 0 &&
        exitQuantity <= position.qty;

    const remainingQuantity = isValidQuantity
        ? position.qty - exitQuantity
        : position.qty;

    const estimatedValue = isValidQuantity
        ? exitQuantity * Number(position.price)
        : 0;

    const estimatedPNL = isValidQuantity
        ? (Number(position.price) - Number(position.avg)) * exitQuantity
        : 0;

    const isProfit = estimatedPNL >= 0;

    const handleExit = async () => {
        if (!isValidQuantity) {
            setError(`Quantity must be between 1 and ${position.qty}`);

            return;
        }

        try {
            setLoading(true);
            setError("");

            await api.post("/newOrder", {
                symbol: position.name,
                qty: exitQuantity,
                mode: "SELL",
                product: "INTRADAY",
            });

            toast.success("Position exited successfully", {
                description: `${exitQuantity} share${
                    exitQuantity > 1 ? "s" : ""
                } of ${position.name}`,
            });

            refreshDashboardData();

            onClose();
        } catch (error) {
            console.error("Exit position error:", error);

            setError(
                error.response?.data?.message || "Failed to exit position",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/40 p-3 backdrop-blur-[2px] sm:p-4">
            <div className="flex max-h-[calc(100dvh-24px)] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[calc(100dvh-32px)]">
                {/* Header */}

                <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 px-4 py-4 sm:px-6 sm:py-5">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                            <AlertTriangle size={20} />
                        </div>

                        <div className="min-w-0">
                            <h2 className="text-base font-bold text-slate-800 sm:text-lg">
                                Exit Position
                            </h2>

                            <p className="truncate text-sm text-slate-400">
                                {position.name} · {position.product}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="cursor-pointer rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Position Summary */}

                <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50">
                    <div className="border-r border-slate-200 px-2 py-3 text-center sm:px-4 sm:py-4">
                        <p className="text-xs text-slate-400">Quantity</p>

                        <p className="mt-1 font-semibold text-slate-800">
                            {position.qty}
                        </p>
                    </div>

                    <div className="border-r border-slate-200 px-2 py-3 text-center sm:px-4 sm:py-4">
                        <p className="text-xs text-slate-400">Avg.</p>

                        <p className="mt-1 text-sm font-semibold text-slate-800 sm:text-base">
                            ₹{Number(position.avg).toFixed(2)}
                        </p>
                    </div>

                    <div className="px-2 py-3 text-center sm:px-4 sm:py-4">
                        <p className="text-xs text-slate-400">LTP</p>

                        <p className="mt-1 text-sm font-semibold text-slate-800 sm:text-base">
                            ₹{Number(position.price).toFixed(2)}
                        </p>
                    </div>
                </div>

                {/* Content */}

                <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">
                    {/* Exit Quantity */}

                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-600">
                                Exit Quantity
                            </label>

                            <button
                                type="button"
                                onClick={() => setQuantity(position.qty)}
                                className="cursor-pointer text-xs font-semibold text-[#387ed1] hover:underline"
                            >
                                Exit all
                            </button>
                        </div>

                        <input
                            type="number"
                            min="1"
                            max={position.qty}
                            step="1"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                        />

                        <p className="mt-2 text-xs text-slate-400">
                            Maximum available: {position.qty}
                        </p>
                    </div>

                    {/* Exit Summary */}

                    <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-start justify-between gap-4">
                            <span className="text-sm text-slate-500">
                                Exit quantity
                            </span>

                            <span className="break-words text-right font-semibold text-slate-800">
                                {isValidQuantity ? exitQuantity : 0}
                            </span>
                        </div>

                        <div className="flex items-start justify-between gap-4">
                            <span className="text-sm text-slate-500">
                                Remaining quantity
                            </span>

                            <span className="break-words text-right font-semibold text-slate-800">
                                {remainingQuantity}
                            </span>
                        </div>

                        <div className="flex items-start justify-between gap-4">
                            <span className="text-sm text-slate-500">
                                Estimated exit value
                            </span>

                            <span className="break-words text-right font-semibold text-slate-800">
                                ₹
                                {estimatedValue.toLocaleString("en-IN", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </span>
                        </div>

                        <div className="border-t border-slate-200 pt-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-500">
                                    Estimated P&amp;L
                                </span>

                                <span
                                    className={`font-semibold ${
                                        isProfit
                                            ? "text-green-600"
                                            : "text-red-500"
                                    }`}
                                >
                                    {isProfit ? "+" : "-"}₹
                                    {Math.abs(estimatedPNL).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Error */}

                    {error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Warning */}

                    <div className="flex gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4">
                        <AlertTriangle
                            size={18}
                            className="mt-0.5 shrink-0 text-orange-500"
                        />

                        <p className="text-xs leading-5 text-orange-700">
                            This will execute a market SELL order for the
                            selected intraday quantity. The final execution
                            price is determined by the backend live market
                            price.
                        </p>
                    </div>

                    {/* Actions */}

                    <div className="flex gap-3 pt-1">
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 cursor-pointer rounded-xl border border-slate-200 px-3 py-3 font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleExit}
                            disabled={loading || !isValidQuantity}
                            className="flex-1 cursor-pointer rounded-xl bg-orange-500 px-3 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading
                                ? "Exiting..."
                                : remainingQuantity === 0
                                  ? "Exit Position"
                                  : `Exit ${exitQuantity}`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
