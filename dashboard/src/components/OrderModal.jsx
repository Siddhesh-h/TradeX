import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { toast } from "sonner";

export default function OrderModal({ stock, mode, onClose }) {
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [product, setProduct] = useState("DELIVERY");

    const isBuy = mode === "BUY";

    const { refreshDashboardData } = useAuth();

    useEffect(() => {
        setQuantity(1);
        setProduct("DELIVERY");
        setError("");
    }, [stock, mode]);

    const estimatedOrderValue = Number(quantity || 0) * Number(stock.price);

    const handleOrder = async () => {
        try {
            setLoading(true);
            setError("");

            const order = {
                symbol: stock.name,
                qty: Number(quantity),
                mode,
                product,
            };

            const response = await api.post("/newOrder", order);

            toast.success(`${mode === "BUY" ? "Buy" : "Sell"} order executed`, {
                description: `${quantity} share${
                    Number(quantity) > 1 ? "s" : ""
                } of ${stock.name}`,
            });

            refreshDashboardData();

            onClose();
        } catch (error) {
            console.error(error);

            setError(error.response?.data?.message || "Failed to place order");
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
                        <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-semibold ${
                                isBuy
                                    ? "bg-blue-100 text-[#387ed1]"
                                    : "bg-orange-100 text-orange-600"
                            }`}
                        >
                            {stock.name.slice(0, 2)}
                        </div>

                        <div className="min-w-0">
                            <h2 className="truncate text-base font-bold text-slate-800 sm:text-lg">
                                {isBuy ? "Buy" : "Sell"} {stock.name}
                            </h2>

                            <p className="text-sm text-slate-400">
                                NSE · Market Order
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

                {/* Current Market Price */}

                <div className="flex shrink-0 items-center justify-between gap-4 bg-slate-50 px-4 py-3 sm:px-6">
                    <span className="text-sm text-slate-500">
                        Current market price
                    </span>

                    <span className="shrink-0 font-semibold text-slate-800">
                        ₹{Number(stock.price).toFixed(2)}
                    </span>
                </div>

                {/* Content */}

                <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">
                    {/* Quantity */}

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-600">
                            Quantity
                        </label>

                        <input
                            type="number"
                            min="1"
                            step="1"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#387ed1] focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-600">
                            Product
                        </label>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setProduct("DELIVERY")}
                                className={`rounded-xl border px-3 py-3 text-left transition sm:px-4 ${
                                    product === "DELIVERY"
                                        ? "border-[#387ed1] bg-blue-50"
                                        : "border-slate-200 hover:bg-slate-50"
                                }`}
                            >
                                <p
                                    className={`text-sm font-semibold ${
                                        product === "DELIVERY"
                                            ? "text-[#387ed1]"
                                            : "text-slate-700"
                                    }`}
                                >
                                    Delivery
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                    Long-term holding
                                </p>
                            </button>

                            <button
                                type="button"
                                onClick={() => setProduct("INTRADAY")}
                                className={`rounded-xl border px-3 py-3 text-left transition sm:px-4 ${
                                    product === "INTRADAY"
                                        ? "border-orange-400 bg-orange-50"
                                        : "border-slate-200 hover:bg-slate-50"
                                }`}
                            >
                                <p
                                    className={`text-sm font-semibold ${
                                        product === "INTRADAY"
                                            ? "text-orange-600"
                                            : "text-slate-700"
                                    }`}
                                >
                                    Intraday
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                    Same-day position
                                </p>
                            </button>
                        </div>
                    </div>

                    {/* Order Summary */}

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-start justify-between gap-4">
                            <span className="text-sm text-slate-500">
                                Estimated order value
                            </span>

                            <span className="break-words text-right font-semibold text-slate-800">
                                ₹
                                {estimatedOrderValue.toLocaleString("en-IN", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                            <span className="text-sm text-slate-500">
                                Execution price
                            </span>

                            <span className="text-sm font-medium text-slate-700">
                                Market price
                            </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                            <span className="text-sm text-slate-500">
                                Product
                            </span>

                            <span className="text-sm font-semibold text-slate-700">
                                {product}
                            </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                            <span className="text-sm text-slate-500">
                                Order type
                            </span>

                            <span
                                className={`font-bold ${
                                    isBuy ? "text-[#387ed1]" : "text-orange-600"
                                }`}
                            >
                                {mode}
                            </span>
                        </div>
                    </div>

                    {/* Error */}

                    {error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Buttons */}

                    <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                        <button
                            onClick={handleOrder}
                            disabled={
                                loading ||
                                !Number.isInteger(Number(quantity)) ||
                                Number(quantity) <= 0
                            }
                            className={`flex-1 cursor-pointer rounded-xl py-3 font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${
                                isBuy
                                    ? "bg-[#387ed1] hover:bg-blue-700"
                                    : "bg-orange-500 hover:bg-orange-600"
                            }`}
                        >
                            {loading
                                ? "Placing..."
                                : `${isBuy ? "Buy" : "Sell"} ${stock.name}`}
                        </button>

                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="cursor-pointer rounded-xl border border-slate-200 px-6 py-3 font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                        >
                            Cancel
                        </button>
                    </div>

                    <p className="text-center text-xs leading-5 text-slate-400">
                        Final execution value is calculated using the market
                        price on the server.
                    </p>
                </div>
            </div>
        </div>
    );
}
