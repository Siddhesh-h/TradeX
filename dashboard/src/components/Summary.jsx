import { useEffect, useState } from "react";
import { BriefcaseBusiness, TrendingUp, Wallet } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Summary() {
    const { user, dataVersion } = useAuth();

    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadDashboard = async () => {
            try {
                const response = await api.get("/dashboard/summary");

                if (isMounted) {
                    setSummary(response.data);
                }
            } catch (error) {
                console.error("Dashboard loading error:", error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadDashboard();

        const interval = setInterval(loadDashboard, 5000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [dataVersion]);

    if (loading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-slate-500">Loading dashboard...</p>
            </div>
        );
    }

    const { availableCash, holdings, positions, portfolio } = summary;

    const totalInstruments = holdings.count + positions.count;

    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Welcome */}

            <div>
                <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                    Hi, {user?.name?.split(" ")[0]}!
                </h1>

                <p className="mt-2 text-slate-500">
                    Here's an overview of your trading account.
                </p>
            </div>

            {/* Main Cards */}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                <SummaryCard
                    icon={<Wallet size={22} />}
                    title="Available Cash"
                    value={`₹${availableCash.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}`}
                    subtitle="Available for trading"
                />

                <SummaryCard
                    icon={<BriefcaseBusiness size={22} />}
                    title="Current Value"
                    value={`₹${portfolio.currentValue.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}`}
                    subtitle={`${holdings.count} holdings · ${positions.count} open positions`}
                />

                <SummaryCard
                    icon={<TrendingUp size={22} />}
                    title="Overall P&L"
                    value={`${
                        portfolio.totalPNL >= 0 ? "+" : ""
                    }₹${portfolio.totalPNL.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}`}
                    subtitle={`${
                        portfolio.pnlPercent >= 0 ? "+" : ""
                    }${portfolio.pnlPercent}%`}
                    positive={portfolio.totalPNL >= 0}
                    negative={portfolio.totalPNL < 0}
                />
            </div>

            {/* Portfolio Overview */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                            Portfolio Overview
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Holdings and open position performance
                        </p>
                    </div>

                    <span className="self-start rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#387ed1]">
                        {totalInstruments} Active
                    </span>
                </div>

                <div className="mt-6 grid gap-5 border-t border-slate-100 pt-5 sm:grid-cols-3 sm:gap-8 lg:mt-8 lg:pt-6">
                    <OverviewItem
                        label="Total Exposure"
                        value={portfolio.totalExposure}
                    />

                    <OverviewItem
                        label="Current Value"
                        value={portfolio.currentValue}
                    />

                    <OverviewItem
                        label="Total P&L"
                        value={portfolio.totalPNL}
                        profit={portfolio.totalPNL >= 0}
                    />
                </div>
            </div>

            {/* Breakdown */}

            <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
                <PortfolioBreakdown
                    title="Holdings"
                    count={holdings.count}
                    invested={holdings.investment}
                    current={holdings.currentValue}
                    pnl={holdings.pnl}
                />

                <PortfolioBreakdown
                    title="Intraday Positions"
                    count={positions.count}
                    invested={positions.exposure}
                    current={positions.currentValue}
                    pnl={positions.pnl}
                />
            </div>
        </div>
    );
}

function SummaryCard({ icon, title, value, subtitle, positive, negative }) {
    return (
        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#387ed1]">
                {icon}
            </div>

            <p className="mt-5 text-sm text-slate-500">{title}</p>

            <h2
                className={`mt-2 break-words text-2xl font-bold sm:text-3xl ${
                    positive
                        ? "text-green-600"
                        : negative
                          ? "text-red-500"
                          : "text-slate-800"
                }`}
            >
                {value}
            </h2>

            {subtitle && (
                <p
                    className={`mt-2 text-sm ${
                        positive
                            ? "text-green-600"
                            : negative
                              ? "text-red-500"
                              : "text-slate-400"
                    }`}
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
}

function OverviewItem({ label, value, profit }) {
    return (
        <div>
            <p className="text-sm text-slate-500">{label}</p>

            <p
                className={`mt-2 break-words text-lg font-semibold sm:text-xl ${
                    profit === true
                        ? "text-green-600"
                        : profit === false
                          ? "text-red-500"
                          : "text-slate-800"
                }`}
            >
                {value >= 0 && profit !== undefined ? "+" : ""}₹
                {value.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
            </p>
        </div>
    );
}

function PortfolioBreakdown({ title, count, invested, current, pnl }) {
    const isProfit = pnl >= 0;

    return (
        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="font-semibold text-slate-800">{title}</h3>

                    <p className="mt-1 text-sm text-slate-400">
                        {count} active
                    </p>
                </div>

                <span
                    className={`self-start rounded-full px-3 py-1 text-xs font-semibold ${
                        isProfit
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-500"
                    }`}
                >
                    {isProfit ? "+" : ""}₹
                    {pnl.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-5">
                <div>
                    <p className="text-xs text-slate-400">Exposure</p>

                    <p className="mt-1 font-semibold text-slate-700">
                        ₹
                        {invested.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-slate-400">Current</p>

                    <p className="mt-1 font-semibold text-slate-700">
                        ₹
                        {current.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </p>
                </div>
            </div>
        </div>
    );
}
