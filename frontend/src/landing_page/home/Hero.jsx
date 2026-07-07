import React from "react";

export default function Hero() {
    return (
        <div className="max-w-[1100px] mx-auto px-4 py-16 text-center mt-15 relative box-border ">
            <div className="row text-center">
                <img
                    src="images/homeHero.png"
                    alt="Hero"
                    className="mx-auto mb-25 w-full"
                />
                <h1 className="text-3xl font-medium mb-4 text-[#424242]">
                    Invest in everything
                </h1>
                <p className="text-xl mb-10 text-[#424242]">
                    Online platform to invest in stocks, derivatives, mutual
                    funds, ETFs, bonds, and more.
                </p>
                <a
                    className="bg-[#387ed1] hover:bg-[#222] text-white text-lg font-medium px-8 py-3 rounded transition duration-300"
                    href="/signup"
                >
                    Sign up for free
                </a>
            </div>
        </div>
    );
}
