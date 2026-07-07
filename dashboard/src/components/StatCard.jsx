import React from "react";

export default function StatCard({ title, value, subtitle, color = "slate" }) {
    const colors = {
        slate: "bg-white border-slate-200 text-slate-800",
        green: "bg-green-50 border-green-200 text-green-600",
        blue: "bg-blue-50 border-blue-200 text-[#387ed1]",
        red: "bg-red-50 border-red-200 text-red-500",
    };

    return (
        <div className={`rounded-2xl border p-6 shadow-sm ${colors[color]}`}>
            <p className="text-sm opacity-70">{title}</p>

            <h2 className="text-3xl font-bold mt-3">{value}</h2>

            {subtitle && <p className="mt-2 text-sm opacity-70">{subtitle}</p>}
        </div>
    );
}
