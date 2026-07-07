import {
    CalendarDays,
    CircleCheck,
    Mail,
    User,
    Wallet,
    Landmark,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Profile() {
    const { user } = useAuth();

    const clientId = `TRX${String(user?.id || 0).padStart(4, "0")}`;

    const joinedDate = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "long",
              year: "numeric",
          })
        : "Not available";

    const availableCash = Number(user?.account?.availableCash || 0);

    const usedMargin = Number(user?.account?.usedMargin || 0);

    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Header */}

            <div>
                <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                    My Profile
                </h1>

                <p className="mt-2 text-slate-500">
                    View your TradeX account information.
                </p>
            </div>

            {/* Profile Header */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:gap-6 sm:text-left">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-2xl font-bold text-[#387ed1]">
                        {getInitials(user?.name)}
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                            <h2 className="break-words text-xl font-bold text-slate-800 sm:text-2xl">
                                {user?.name}
                            </h2>

                            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                                <CircleCheck size={14} />
                                Active
                            </span>
                        </div>

                        <p className="mt-2 text-sm text-slate-500">
                            Client ID:{" "}
                            <span className="font-semibold text-slate-700">
                                {clientId}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Account Information */}

            <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <h2 className="text-lg font-semibold text-slate-800">
                        Personal Information
                    </h2>

                    <div className="mt-6 space-y-5">
                        <ProfileRow
                            icon={<User size={19} />}
                            label="Full Name"
                            value={user?.name || "Not available"}
                        />

                        <ProfileRow
                            icon={<Mail size={19} />}
                            label="Email Address"
                            value={user?.email || "Not available"}
                        />

                        <ProfileRow
                            icon={<Landmark size={19} />}
                            label="Client ID"
                            value={clientId}
                        />

                        <ProfileRow
                            icon={<CalendarDays size={19} />}
                            label="Member Since"
                            value={joinedDate}
                        />
                    </div>
                </div>

                {/* Trading Account */}

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <h2 className="text-lg font-semibold text-slate-800">
                        Trading Account
                    </h2>

                    <div className="mt-6 space-y-5">
                        <AccountRow
                            label="Account Status"
                            value="Active"
                            status
                        />

                        <AccountRow label="Account Type" value="Individual" />

                        <AccountRow
                            label="Available Cash"
                            value={formatCurrency(availableCash)}
                        />

                        <AccountRow
                            label="Used Margin"
                            value={formatCurrency(usedMargin)}
                        />
                    </div>
                </div>
            </div>

            {/* Account Summary */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-start gap-3 sm:items-center">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#387ed1]">
                        <Wallet size={22} />
                    </div>

                    <div>
                        <h2 className="font-semibold text-slate-800">
                            TradeX Account
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Your account is ready for delivery and intraday
                            trading.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProfileRow({ icon, label, value }) {
    return (
        <div className="flex items-start gap-3 border-b border-slate-100 pb-4 last:border-0 last:pb-0 sm:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
                {icon}
            </div>

            <div className="min-w-0">
                <p className="text-xs text-slate-400">{label}</p>

                <p className="mt-1 break-all font-medium text-slate-700 sm:break-words">
                    {value}
                </p>
            </div>
        </div>
    );
}

function AccountRow({ label, value, status = false }) {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
            <span className="text-sm text-slate-500">{label}</span>

            {status ? (
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                    {value}
                </span>
            ) : (
                <span className="break-words text-right font-semibold text-slate-700">
                    {value}
                </span>
            )}
        </div>
    );
}

function getInitials(name = "") {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
}

function formatCurrency(value) {
    return `₹${Number(value).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
}
