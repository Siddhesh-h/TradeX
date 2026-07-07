import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
    LayoutDashboard,
    ShoppingBag,
    Wallet,
    BriefcaseBusiness,
    Landmark,
    ChevronDown,
    User,
    LogOut,
    Menu as MenuIcon,
    X,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const Menu = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navigate = useNavigate();

    const profileRef = useRef(null);

    const { user, logout } = useAuth();

    const menus = [
        {
            name: "Dashboard",
            path: "/",
            icon: LayoutDashboard,
        },
        {
            name: "Orders",
            path: "/orders",
            icon: ShoppingBag,
        },
        {
            name: "Holdings",
            path: "/holdings",
            icon: Wallet,
        },
        {
            name: "Positions",
            path: "/positions",
            icon: BriefcaseBusiness,
        },
        {
            name: "Funds",
            path: "/funds",
            icon: Landmark,
        },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const getInitials = (name) => {
        if (!name) return "TX";

        return name
            .trim()
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    };

    const handleLogout = async () => {
        setIsProfileOpen(false);
        setIsMobileMenuOpen(false);

        await logout();
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="relative flex h-full w-full items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Logo */}

            <NavLink to="/" onClick={closeMobileMenu} className="shrink-0">
                <img
                    src="/images/tradex_logo.png"
                    alt="TradeX"
                    className="h-7 w-auto object-contain sm:h-8"
                />
            </NavLink>

            {/* Desktop Right Section */}

            <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
                {/* Desktop Navigation */}

                <nav className="hidden items-center gap-1 lg:flex">
                    {menus.map((menu) => {
                        const Icon = menu.icon;

                        return (
                            <NavLink
                                key={menu.name}
                                to={menu.path}
                                end={menu.path === "/"}
                                className={({ isActive }) =>
                                    `
                                    flex items-center gap-2
                                    rounded-xl
                                    px-3 py-2.5
                                    text-sm font-medium
                                    transition-all duration-200
                                    ${
                                        isActive
                                            ? "bg-[#387ed1] text-white shadow-sm"
                                            : "text-slate-600 hover:bg-slate-100 hover:text-[#387ed1]"
                                    }
                                    `
                                }
                            >
                                <Icon size={17} />

                                <span>{menu.name}</span>
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Desktop Divider */}

                <div className="hidden h-8 w-px bg-slate-200 lg:block" />

                {/* Profile */}

                <div ref={profileRef} className="relative">
                    <button
                        onClick={() =>
                            setIsProfileOpen((previous) => !previous)
                        }
                        className="
                            flex cursor-pointer items-center gap-2
                            rounded-xl px-2 py-2
                            transition
                            hover:bg-slate-100
                            sm:gap-3 sm:px-3
                        "
                    >
                        {/* Avatar */}

                        <div
                            className="
                                flex h-9 w-9
                                items-center justify-center
                                rounded-full
                                bg-blue-100
                                text-xs font-bold
                                text-[#387ed1]
                                sm:h-10 sm:w-10 sm:text-sm
                            "
                        >
                            {getInitials(user?.name)}
                        </div>

                        {/* User Info - Desktop Only */}

                        <div className="hidden max-w-[140px] text-left lg:block">
                            <p className="truncate text-sm font-semibold text-slate-700">
                                {user?.name || "TradeX User"}
                            </p>

                            <p className="truncate text-xs text-slate-400">
                                TRX
                                {String(user?.id || 0).padStart(4, "0")}
                            </p>
                        </div>

                        <ChevronDown
                            size={17}
                            className={`
                                hidden text-slate-400
                                transition-transform duration-200
                                sm:block
                                ${isProfileOpen ? "rotate-180" : ""}
                            `}
                        />
                    </button>

                    {/* Profile Dropdown */}

                    {isProfileOpen && (
                        <div
                            className="
                                absolute right-0 top-full z-50
                                mt-3 w-64
                                overflow-hidden
                                rounded-2xl
                                border border-slate-200
                                bg-white
                                shadow-xl
                            "
                        >
                            {/* User Header */}

                            <div className="border-b border-slate-100 px-5 py-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="
                                            flex h-11 w-11
                                            shrink-0
                                            items-center justify-center
                                            rounded-full
                                            bg-blue-100
                                            font-bold
                                            text-[#387ed1]
                                        "
                                    >
                                        {getInitials(user?.name)}
                                    </div>

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold text-slate-800">
                                            {user?.name}
                                        </p>

                                        <p className="mt-0.5 truncate text-xs text-slate-400">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Profile Option */}

                            <div className="p-2">
                                <button
                                    onClick={() => {
                                        navigate("/profile");

                                        setIsProfileOpen(false);
                                    }}
                                    className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
                                >
                                    <User size={18} />
                                    My Profile
                                </button>
                            </div>

                            {/* Logout */}

                            <div className="border-t border-slate-100 p-2">
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-500 transition hover:bg-red-50"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}

                <button
                    onClick={() => setIsMobileMenuOpen((previous) => !previous)}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 lg:hidden"
                    aria-label="Toggle navigation menu"
                >
                    {isMobileMenuOpen ? (
                        <X size={21} />
                    ) : (
                        <MenuIcon size={21} />
                    )}
                </button>
            </div>

            {/* Mobile Navigation */}

            {isMobileMenuOpen && (
                <div className="absolute left-0 right-0 top-full z-40 border-b border-slate-200 bg-white p-4 shadow-lg lg:hidden">
                    <nav className="grid gap-1">
                        {menus.map((menu) => {
                            const Icon = menu.icon;

                            return (
                                <NavLink
                                    key={menu.name}
                                    to={menu.path}
                                    end={menu.path === "/"}
                                    onClick={closeMobileMenu}
                                    className={({ isActive }) =>
                                        `
                                        flex items-center gap-3
                                        rounded-xl
                                        px-4 py-3
                                        text-sm font-medium
                                        transition
                                        ${
                                            isActive
                                                ? "bg-blue-50 text-[#387ed1]"
                                                : "text-slate-600 hover:bg-slate-50"
                                        }
                                        `
                                    }
                                >
                                    <Icon size={19} />

                                    {menu.name}
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>
            )}
        </div>
    );
};

export default Menu;
