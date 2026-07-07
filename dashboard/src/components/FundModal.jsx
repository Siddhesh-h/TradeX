import { useState } from "react";
import { ArrowDownToLine, ArrowUpFromLine, X } from "lucide-react";
import { toast } from "sonner";

import api from "../services/api";

export default function FundModal({ type, onClose, onSuccess }) {
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isDeposit = type === "deposit";

    const handleSubmit = async (e) => {
        e.preventDefault();

        const numericAmount = Number(amount);

        if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
            setError("Enter a valid amount");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const endpoint = isDeposit ? "/funds/add" : "/funds/withdraw";

            const response = await api.post(endpoint, {
                amount: numericAmount,
            });

            await onSuccess(response.data.account);

            toast.success(
                isDeposit
                    ? "Funds added successfully"
                    : "Withdrawal successful",
                {
                    description: `₹${numericAmount.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}`,
                },
            );

            onClose();
        } catch (error) {
            setError(error.response?.data?.message || "Transaction failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-900/40 p-3 backdrop-blur-sm sm:p-4">
            <div className="flex max-h-[calc(100dvh-24px)] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[calc(100dvh-32px)]">
                {/* Header */}

                <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-6 sm:py-5">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#387ed1]">
                            {isDeposit ? (
                                <ArrowDownToLine size={20} />
                            ) : (
                                <ArrowUpFromLine size={20} />
                            )}
                        </div>

                        <div className="min-w-0">
                            <h2 className="font-semibold text-slate-800">
                                {isDeposit ? "Add Funds" : "Withdraw Funds"}
                            </h2>

                            <p className="mt-0.5 text-xs leading-4 text-slate-400">
                                {isDeposit
                                    ? "Add money to your trading account"
                                    : "Withdraw available cash"}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="cursor-pointer rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6"
                >
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Amount
                    </label>

                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-slate-500">
                            ₹
                        </span>

                        <input
                            type="number"
                            min="1"
                            step="1"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            required
                            className="w-full rounded-xl border border-slate-200 py-3.5 pl-10 pr-4 text-lg font-semibold outline-none transition focus:border-[#387ed1] focus:ring-2 focus:ring-blue-100 sm:py-4"
                        />
                    </div>

                    {/* Quick amounts */}

                    <div className="mt-4 grid grid-cols-3 gap-2">
                        {[1000, 5000, 10000].map((value) => (
                            <button
                                key={value}
                                type="button"
                                disabled={loading}
                                onClick={() => setAmount(String(value))}
                                className="flex-1 cursor-pointer rounded-lg border border-slate-200 py-2 text-xs font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#387ed1] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                ₹{value.toLocaleString("en-IN")}
                            </button>
                        ))}
                    </div>

                    {error && (
                        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-6 w-full cursor-pointer rounded-xl bg-[#387ed1] py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading
                            ? "Processing..."
                            : isDeposit
                              ? "Add Funds"
                              : "Withdraw Funds"}
                    </button>
                </form>
            </div>
        </div>
    );
}
