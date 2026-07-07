import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { LineChart } from "lucide-react";

import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Profile from "./Profile";

import Summary from "../components/Summary";
import WatchList from "../components/WatchList";

const Dashboard = () => {
    const [isMarketOpen, setIsMarketOpen] = useState(false);

    return (
        <div className="relative flex min-h-0 flex-1 overflow-hidden">
            {/* Desktop WatchList */}

            <div className="hidden shrink-0 lg:block">
                <WatchList />
            </div>

            {/* Main Content */}

            <main className="min-w-0 flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
                {/* Mobile Market Button */}

                <div className="mb-5 lg:hidden">
                    <button
                        onClick={() => setIsMarketOpen(true)}
                        className="flex cursor-pointer items-center gap-2 rounded-xl bg-[#387ed1] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                    >
                        <LineChart size={18} />
                        Market Watch
                    </button>
                </div>

                <Routes>
                    <Route path="/" element={<Summary />} />

                    <Route path="/orders" element={<Orders />} />

                    <Route path="/holdings" element={<Holdings />} />

                    <Route path="/positions" element={<Positions />} />

                    <Route path="/funds" element={<Funds />} />

                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </main>

            {/* Mobile Overlay */}

            {isMarketOpen && (
                <div
                    className="fixed inset-0 z-[70] bg-slate-900/40 backdrop-blur-[2px] lg:hidden"
                    onClick={() => setIsMarketOpen(false)}
                />
            )}

            {/* Mobile Market Drawer */}

            <div
                className={`
                    fixed bottom-0 left-0 top-0 z-[80]
                    w-[90%] max-w-[380px]
                    bg-white shadow-2xl
                    transition-transform duration-300
                    lg:hidden
                    ${isMarketOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <WatchList mobile onClose={() => setIsMarketOpen(false)} />
            </div>
        </div>
    );
};

export default Dashboard;
