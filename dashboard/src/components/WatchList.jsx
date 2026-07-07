import { useState, useRef, useEffect } from "react";
import api from "../services/api";
import OrderModal from "./OrderModal";

import {
    Search,
    MoreHorizontal,
    TrendingUp,
    TrendingDown,
    BarChart3,
    Bell,
    Star,
    Building2,
    ChartCandlestick,
    X,
} from "lucide-react";

export default function WatchList({ mobile = false, onClose }) {
    const [search, setSearch] = useState("");
    const [openMenu, setOpenMenu] = useState(null);
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedOrder, setSelectedOrder] = useState(null);

    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenMenu(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        let isMounted = true;

        const fetchStocks = async () => {
            try {
                const response = await api.get("/market/stocks");

                if (isMounted) {
                    setStocks(response.data);
                    setError("");
                }
            } catch (error) {
                console.error("Failed to fetch stocks:", error);

                if (isMounted) {
                    setError("Failed to load market data");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchStocks();

        const interval = setInterval(fetchStocks, 5000);

        return () => {
            isMounted = false;

            clearInterval(interval);
        };
    }, []);

    const filteredStocks = stocks.filter((stock) =>
        stock.name.toLowerCase().includes(search.toLowerCase()),
    );

    if (loading) {
        return (
            <aside
                className={`flex h-full items-center justify-center bg-white ${
                    mobile ? "w-full" : "w-[360px] border-r border-slate-200"
                }`}
            >
                <p className="text-sm text-slate-500">Loading market...</p>
            </aside>
        );
    }

    if (error) {
        return (
            <aside
                className={`flex h-full items-center justify-center bg-white ${
                    mobile ? "w-full" : "w-[360px] border-r border-slate-200"
                }`}
            >
                <p className="text-sm text-red-500">{error}</p>
            </aside>
        );
    }

    return (
        <>
            <aside
                className={`flex h-full flex-col bg-white ${
                    mobile ? "w-full" : "w-[360px] border-r border-slate-200"
                }`}
            >
                {mobile && (
                    <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
                        <div>
                            <h2 className="font-semibold text-slate-800">
                                Market Watch
                            </h2>

                            <p className="mt-1 text-xs text-slate-400">
                                Select a stock to buy or sell
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100"
                            aria-label="Close market watch"
                        >
                            <X size={20} />
                        </button>
                    </div>
                )}
                {/* Search */}

                <div className="p-4 border-b border-slate-200">
                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search stocks..."
                            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-16 outline-none focus:ring-2 focus:ring-[#387ed1]"
                        />

                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                            {filteredStocks.length}/50
                        </span>
                    </div>
                </div>

                {/* Stocks */}

                <div className="flex-1 overflow-y-auto">
                    {filteredStocks.map((stock, index) => (
                        <div
                            key={stock.name}
                            className="group relative border-b border-slate-100 px-5 py-4 hover:bg-slate-50 transition"
                        >
                            {/* Stock */}

                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-2 h-2 rounded-full ${
                                            stock.isDown
                                                ? "bg-red-500"
                                                : "bg-green-500"
                                        }`}
                                    />

                                    <h3
                                        className={`font-semibold ${
                                            stock.isDown
                                                ? "text-red-500"
                                                : "text-green-600"
                                        }`}
                                    >
                                        {stock.name}
                                    </h3>
                                </div>

                                <div className="text-right">
                                    <div
                                        className={`flex items-center justify-end gap-1 text-sm ${
                                            stock.isDown
                                                ? "text-red-500"
                                                : "text-green-600"
                                        }`}
                                    >
                                        {stock.isDown ? (
                                            <TrendingDown size={14} />
                                        ) : (
                                            <TrendingUp size={14} />
                                        )}

                                        {stock.percent}
                                    </div>

                                    <p className="mt-1 text-sm text-slate-700">
                                        ₹{stock.price}
                                    </p>
                                </div>
                            </div>

                            {/* Hover Toolbar */}

                            <div
                                className={`mt-4 flex items-center gap-2 transition-all duration-200 ${mobile ? "opacity-100" : "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"}`}
                            >
                                <button
                                    onClick={() =>
                                        setSelectedOrder({
                                            stock,
                                            mode: "BUY",
                                        })
                                    }
                                    className="flex-1 cursor-pointer rounded-lg bg-[#387ed1] py-2 text-sm font-medium text-white hover:bg-blue-700"
                                >
                                    Buy
                                </button>

                                <button
                                    onClick={() =>
                                        setSelectedOrder({
                                            stock,
                                            mode: "SELL",
                                        })
                                    }
                                    className="flex-1 cursor-pointer rounded-lg bg-orange-500 py-2 text-sm font-medium text-white hover:bg-orange-600"
                                >
                                    Sell
                                </button>

                                <button
                                    onClick={() =>
                                        setOpenMenu(
                                            openMenu === index ? null : index,
                                        )
                                    }
                                    className="rounded-lg border border-slate-200 p-2 hover:bg-slate-100"
                                >
                                    <MoreHorizontal size={18} />
                                </button>
                            </div>

                            {/* Dropdown */}

                            {openMenu === index && (
                                <div
                                    ref={menuRef}
                                    className="absolute right-5 top-24 z-20 w-56 rounded-xl border border-slate-200 bg-white shadow-xl overflow-hidden"
                                >
                                    <button className="flex w-full items-center gap-3 px-4 py-3 hover:bg-slate-50">
                                        <ChartCandlestick size={18} />
                                        Chart
                                    </button>

                                    <button className="flex w-full items-center gap-3 px-4 py-3 hover:bg-slate-50">
                                        <BarChart3 size={18} />
                                        Market Depth
                                    </button>

                                    <button className="flex w-full items-center gap-3 px-4 py-3 hover:bg-slate-50">
                                        <Bell size={18} />
                                        Create Alert
                                    </button>

                                    <button className="flex w-full items-center gap-3 px-4 py-3 hover:bg-slate-50">
                                        <Star size={18} />
                                        Add to Favorites
                                    </button>

                                    <button className="flex w-full items-center gap-3 px-4 py-3 hover:bg-slate-50">
                                        <Building2 size={18} />
                                        Company Details
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </aside>
            {selectedOrder && (
                <OrderModal
                    stock={selectedOrder.stock}
                    mode={selectedOrder.mode}
                    onClose={() => setSelectedOrder(null)}
                />
            )}
        </>
    );
}
