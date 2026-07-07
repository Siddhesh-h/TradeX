import React from "react";
import {
    BarChart3,
    TrendingUp,
    Newspaper,
    Smartphone,
    Code2,
    Wallet,
    ArrowUpRight,
} from "lucide-react";

const apps = [
    {
        title: "TradeX Pro",
        description: "Advanced web trading platform with powerful charts.",
        icon: <TrendingUp size={32} />,
        color: "bg-blue-50 text-[#387ed1]",
    },
    {
        title: "TradeX Invest",
        description: "Invest in stocks, ETFs and mutual funds effortlessly.",
        icon: <Wallet size={32} />,
        color: "bg-green-50 text-green-600",
    },
    {
        title: "Market Scanner",
        description: "Discover trending stocks using smart filters.",
        icon: <BarChart3 size={32} />,
        color: "bg-purple-50 text-purple-600",
    },
    {
        title: "TradeX News",
        description: "Latest financial news and market insights.",
        icon: <Newspaper size={32} />,
        color: "bg-orange-50 text-orange-500",
    },
    {
        title: "TradeX API",
        description: "Build trading apps with secure developer APIs.",
        icon: <Code2 size={32} />,
        color: "bg-red-50 text-red-500",
    },
    {
        title: "Mobile App",
        description: "Trade and track your portfolio from anywhere.",
        icon: <Smartphone size={32} />,
        color: "bg-cyan-50 text-cyan-600",
    },
];

export default function Apps() {
    return (
        <div className="space-y-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-800">
                    TradeX Ecosystem
                </h1>

                <p className="mt-2 text-slate-500">
                    Everything you need for investing and trading, all in one
                    place.
                </p>
            </div>

            {/* Apps Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {apps.map((app) => (
                    <div
                        key={app.title}
                        className="group bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                    >
                        <div
                            className={`h-16 w-16 rounded-2xl flex items-center justify-center ${app.color}`}
                        >
                            {app.icon}
                        </div>

                        <h2 className="mt-6 text-xl font-semibold text-slate-800">
                            {app.title}
                        </h2>

                        <p className="mt-3 text-slate-500 leading-7">
                            {app.description}
                        </p>

                        <button className="mt-6 flex items-center gap-2 text-[#387ed1] font-medium group-hover:gap-3 transition-all">
                            Explore
                            <ArrowUpRight size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
