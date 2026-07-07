import { useEffect, useState } from "react";
import {
    ArrowDownToLine,
    ArrowUpFromLine,
    Wallet,
    Landmark,
} from "lucide-react";
import FundModal from "../components/FundModal";
import { useAuth } from "../context/AuthContext";

import api from "../services/api";

export default function Funds() {
    const [funds, setFunds] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [modalType, setModalType] = useState(null);

    const { refreshUser } = useAuth();

    useEffect(() => {
        const fetchFundsData = async () => {
            try {
                const [fundsResponse, transactionsResponse] = await Promise.all(
                    [api.get("/funds"), api.get("/funds/transactions")],
                );

                setFunds(fundsResponse.data);

                setTransactions(transactionsResponse.data);
            } catch (error) {
                console.error(error);

                setError(
                    error.response?.data?.message || "Unable to load funds",
                );
            } finally {
                setLoading(false);
            }
        };

        fetchFundsData();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-slate-500">Loading funds...</p>
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

    const totalBalance = funds.availableCash + funds.usedMargin;

    const handleFundSuccess = async (updatedAccount) => {
        setFunds(updatedAccount);

        try {
            const response = await api.get("/funds/transactions");

            setTransactions(response.data);

            await refreshUser();
        } catch (error) {
            console.error("Failed to refresh fund data:", error);
        }
    };

    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Header */}

            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                        Funds
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Manage and monitor your trading balance
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:flex">
                    <button
                        onClick={() => setModalType("deposit")}
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#387ed1] px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:px-5"
                    >
                        <ArrowDownToLine size={18} />
                        Add funds
                    </button>

                    <button
                        onClick={() => setModalType("withdraw")}
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:px-5"
                    >
                        <ArrowUpFromLine size={18} />
                        Withdraw
                    </button>
                </div>
            </div>

            {/* Balance Cards */}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                <FundCard
                    icon={<Wallet size={22} />}
                    title="Available Cash"
                    value={funds.availableCash}
                    description="Available for new trades"
                />

                <FundCard
                    icon={<Landmark size={22} />}
                    title="Used Margin"
                    value={funds.usedMargin}
                    description="Currently used in trades"
                />

                <FundCard
                    icon={<Wallet size={22} />}
                    title="Total Balance"
                    value={totalBalance}
                    description="Total account balance"
                />
            </div>

            {/* Account Details */}

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Margin Overview */}

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                            Margin Overview
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Current trading fund allocation
                        </p>
                    </div>

                    <div className="mt-6 space-y-5">
                        <FundRow
                            label="Available Cash"
                            value={funds.availableCash}
                            highlight
                        />

                        <FundRow label="Used Margin" value={funds.usedMargin} />

                        <div className="border-t border-slate-100" />

                        <FundRow label="Total Balance" value={totalBalance} />
                    </div>
                </div>

                {/* Account Overview */}

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <h2 className="text-lg font-semibold text-slate-800">
                        Account Overview
                    </h2>

                    <div className="mt-6 min-w-0 rounded-2xl bg-slate-50 p-4 sm:p-6">
                        <p className="text-sm text-slate-500">
                            Available for trading
                        </p>

                        <h3 className="mt-2 break-words text-2xl font-bold text-slate-800 sm:text-3xl lg:text-4xl">
                            ₹
                            {funds.availableCash.toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </h3>

                        <div className="mt-6 border-t border-slate-200 pt-5">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-500">
                                    Funds in use
                                </span>

                                <span className="font-semibold text-slate-700">
                                    ₹
                                    {funds.usedMargin.toLocaleString("en-IN", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </span>
                            </div>
                        </div>

                        <p className="mt-5 text-sm leading-6 text-slate-500">
                            Your available balance and used margin update
                            automatically when trades are executed or positions
                            are exited.
                        </p>
                    </div>
                </div>
            </div>

            {/* Transaction History */}

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                            Transaction History
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Your recent deposits and withdrawals
                        </p>
                    </div>

                    <span className="self-start rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                        {transactions.length} transactions
                    </span>
                </div>

                {transactions.length === 0 ? (
                    <div className="flex min-h-[220px] flex-col items-center justify-center px-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                            <Wallet size={22} className="text-slate-400" />
                        </div>

                        <p className="mt-4 font-medium text-slate-700">
                            No transactions yet
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                            Deposits and withdrawals will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto overscroll-x-contain">
                        <table className="w-full min-w-[700px]">
                            <thead className="bg-slate-50">
                                <tr className="text-left text-sm text-slate-500">
                                    <th className="px-4 py-4 sm:px-6">
                                        Transaction
                                    </th>

                                    <th className="px-4 py-4 sm:px-6">Type</th>

                                    <th className="px-4 py-4 sm:px-6">Date</th>

                                    <th className="px-4 py-4 sm:px-6 text-right">
                                        Amount
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {transactions.map((transaction) => {
                                    const isDeposit =
                                        transaction.type === "DEPOSIT";

                                    return (
                                        <tr
                                            key={transaction.id}
                                            className="border-t border-slate-100 transition hover:bg-slate-50"
                                        >
                                            <td className="px-4 py-4 sm:px-6">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                                                            isDeposit
                                                                ? "bg-green-50 text-green-600"
                                                                : "bg-orange-50 text-orange-600"
                                                        }`}
                                                    >
                                                        {isDeposit ? (
                                                            <ArrowDownToLine
                                                                size={18}
                                                            />
                                                        ) : (
                                                            <ArrowUpFromLine
                                                                size={18}
                                                            />
                                                        )}
                                                    </div>

                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-700">
                                                            {isDeposit
                                                                ? "Funds Added"
                                                                : "Funds Withdrawn"}
                                                        </p>

                                                        <p className="mt-0.5 text-xs text-slate-400">
                                                            TRX-FUND-
                                                            {transaction.id}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-4 py-4 sm:px-6">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                        isDeposit
                                                            ? "bg-green-50 text-green-600"
                                                            : "bg-orange-50 text-orange-600"
                                                    }`}
                                                >
                                                    {transaction.type}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4 sm:px-6 text-sm text-slate-500">
                                                {new Date(
                                                    transaction.createdAt,
                                                ).toLocaleString("en-IN", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </td>

                                            <td
                                                className={`px-4 py-4 text-right font-semibold sm:px-6 ${
                                                    isDeposit
                                                        ? "text-green-600"
                                                        : "text-orange-600"
                                                }`}
                                            >
                                                {isDeposit ? "+" : "-"}₹
                                                {transaction.amount.toLocaleString(
                                                    "en-IN",
                                                    {
                                                        minimumFractionDigits: 2,
                                                    },
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal */}
            {modalType && (
                <FundModal
                    type={modalType}
                    onClose={() => setModalType(null)}
                    onSuccess={handleFundSuccess}
                />
            )}
        </div>
    );
}

function FundCard({ icon, title, value, description }) {
    return (
        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#387ed1]">
                {icon}
            </div>

            <p className="mt-5 text-sm text-slate-500">{title}</p>

            <h2 className="mt-2 break-words text-2xl font-bold text-slate-800 sm:text-3xl">
                ₹
                {value.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                })}
            </h2>

            <p className="mt-2 text-xs text-slate-400">{description}</p>
        </div>
    );
}

function FundRow({ label, value, highlight = false }) {
    return (
        <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-slate-500">{label}</p>

            <p
                className={`break-words text-right font-semibold ${
                    highlight ? "text-[#387ed1]" : "text-slate-700"
                }`}
            >
                ₹
                {value.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                })}
            </p>
        </div>
    );
}
