import { useEffect, useState } from "react";
import { ArrowDownLeft, ArrowUpRight, ClipboardList } from "lucide-react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Orders() {
    const { dataVersion } = useAuth();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const fetchOrders = async () => {
            try {
                const response = await api.get("/orders");

                if (isMounted) {
                    setOrders(response.data);
                    setError("");
                }
            } catch (error) {
                console.error("Failed to fetch orders:", error);

                if (isMounted) {
                    setError("Unable to load orders");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchOrders();

        return () => {
            isMounted = false;
        };
    }, [dataVersion]);

    if (loading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-slate-500">Loading orders...</p>
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
                    Orders
                </h1>

                <p className="mt-2 text-slate-500">
                    View your executed trading activity.
                </p>
            </div>

            {/* Empty State */}

            {orders.length === 0 ? (
                <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:min-h-[360px]">
                    <div className="max-w-sm text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#387ed1]">
                            <ClipboardList size={26} />
                        </div>

                        <h2 className="mt-5 text-lg font-semibold text-slate-800">
                            No orders yet
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Your delivery and intraday orders will appear here
                            after execution.
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    {/* Order Stats */}

                    <div className="grid gap-4 sm:grid-cols-3">
                        <OrderStat label="Total Orders" value={orders.length} />

                        <OrderStat
                            label="Buy Orders"
                            value={
                                orders.filter((order) => order.mode === "BUY")
                                    .length
                            }
                        />

                        <OrderStat
                            label="Sell Orders"
                            value={
                                orders.filter((order) => order.mode === "SELL")
                                    .length
                            }
                        />
                    </div>

                    {/* Mobile Scroll Hint */}

                    <p className="text-xs text-slate-400 sm:hidden">
                        Swipe horizontally to view all order details.
                    </p>

                    {/* Orders Table */}

                    <div className="overflow-x-auto overscroll-x-contain rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <table className="w-full min-w-[1000px]">
                            <thead className="bg-slate-50">
                                <tr className="text-left text-sm text-slate-500">
                                    <th className="px-4 py-4 lg:px-6">
                                        Instrument
                                    </th>

                                    <th className="px-4 py-4 lg:px-6">Type</th>

                                    <th className="px-4 py-4 lg:px-6">
                                        Product
                                    </th>

                                    <th className="px-4 py-4 lg:px-6">Qty</th>

                                    <th className="px-4 py-4 lg:px-6">Price</th>

                                    <th className="px-4 py-4 lg:px-6">
                                        Order Value
                                    </th>

                                    <th className="px-4 py-4 lg:px-6">
                                        Status
                                    </th>

                                    <th className="px-4 py-4 lg:px-6">
                                        Executed At
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map((order) => {
                                    const orderValue =
                                        Number(order.price) * Number(order.qty);

                                    const isBuy = order.mode === "BUY";

                                    return (
                                        <tr
                                            key={order.id}
                                            className="border-t border-slate-100 transition hover:bg-slate-50"
                                        >
                                            {/* Instrument */}

                                            <td className="px-4 py-5 lg:px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-[#387ed1]">
                                                        {order.name.slice(0, 2)}
                                                    </div>

                                                    <div>
                                                        <p className="font-semibold text-slate-800">
                                                            {order.name}
                                                        </p>

                                                        <p className="text-xs text-slate-400">
                                                            NSE
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* BUY / SELL */}

                                            <td className="px-4 lg:px-6">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                                                        isBuy
                                                            ? "bg-blue-50 text-[#387ed1]"
                                                            : "bg-orange-50 text-orange-600"
                                                    }`}
                                                >
                                                    {isBuy ? (
                                                        <ArrowDownLeft
                                                            size={14}
                                                        />
                                                    ) : (
                                                        <ArrowUpRight
                                                            size={14}
                                                        />
                                                    )}

                                                    {order.mode}
                                                </span>
                                            </td>

                                            {/* Product */}

                                            <td className="px-6">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                        order.product ===
                                                        "INTRADAY"
                                                            ? "bg-orange-50 text-orange-600"
                                                            : "bg-slate-100 text-slate-600"
                                                    }`}
                                                >
                                                    {order.product}
                                                </span>
                                            </td>

                                            {/* Quantity */}

                                            <td className="px-6 font-medium text-slate-700">
                                                {order.qty}
                                            </td>

                                            {/* Price */}

                                            <td className="px-6 text-slate-700">
                                                ₹
                                                {Number(
                                                    order.price,
                                                ).toLocaleString("en-IN", {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })}
                                            </td>

                                            {/* Order Value */}

                                            <td className="px-6 font-semibold text-slate-800">
                                                ₹
                                                {orderValue.toLocaleString(
                                                    "en-IN",
                                                    {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    },
                                                )}
                                            </td>

                                            {/* Status */}

                                            <td className="px-6">
                                                <StatusBadge
                                                    status={order.status}
                                                />
                                            </td>

                                            {/* Date */}

                                            <td className="px-6">
                                                <p className="text-sm font-medium text-slate-700">
                                                    {new Date(
                                                        order.createdAt,
                                                    ).toLocaleDateString(
                                                        "en-IN",
                                                    )}
                                                </p>

                                                <p className="mt-1 text-xs text-slate-400">
                                                    {new Date(
                                                        order.createdAt,
                                                    ).toLocaleTimeString(
                                                        "en-IN",
                                                        {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        },
                                                    )}
                                                </p>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}

function OrderStat({ label, value }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <p className="text-sm text-slate-500">{label}</p>

            <p className="mt-2 text-2xl font-bold text-slate-800">{value}</p>
        </div>
    );
}

function StatusBadge({ status }) {
    const styles = {
        EXECUTED: "bg-green-50 text-green-600",
        PENDING: "bg-amber-50 text-amber-600",
        REJECTED: "bg-red-50 text-red-500",
        CANCELLED: "bg-slate-100 text-slate-500",
    };

    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                styles[status] || "bg-slate-100 text-slate-500"
            }`}
        >
            {status}
        </span>
    );
}
