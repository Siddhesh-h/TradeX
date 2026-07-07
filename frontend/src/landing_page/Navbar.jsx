import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="top-0 w-full z-10 fixed bg-white shadow-sm box-border">
            <div className="w-[1100px] max-w-full mx-auto box-border">
                <div className="flex  justify-between h-16">
                    {/* Logo */}
                    <div className="relative box-border flex">
                        <a href="/">
                            <img
                                src="images/tradex_logo.png"
                                alt="logo"
                                className=" w-[25%] top-[13px] relative align-middle"
                            />
                        </a>
                    </div>

                    {/* Links */}
                    <div className="hidden lg:flex items-center ">
                        <Link
                            to="/signup"
                            className="text-[#666] hover:text-blue-600 p-5"
                        >
                            Signup
                        </Link>

                        <Link
                            to="/about"
                            className="text-[#666] hover:text-blue-600 p-5"
                        >
                            About
                        </Link>
                        <Link
                            to="/product"
                            className="text-[#666] hover:text-blue-600 p-5"
                        >
                            Products
                        </Link>
                        <Link
                            to="/pricing"
                            className="text-[#666] hover:text-blue-600 p-5"
                        >
                            Pricing
                        </Link>
                        <Link
                            to="/support"
                            className="text-[#666] hover:text-blue-600 p-5"
                        >
                            Support
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
