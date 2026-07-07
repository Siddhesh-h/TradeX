import React from "react";

export default function Hero() {
    return (
        <section className="pb-28 pt-40 text-[#424242]">
            {/* Heading */}
            <div className="max-w-[1100px] mx-auto text-center">
                <h1 className="text-3xl font-medium">Charges</h1>

                <p className="text-xl text-[#9b9b9b] mt-3">
                    List of all charges and taxes
                </p>
            </div>

            {/* Cards */}
            <div className="max-w-[1100px] mx-auto mt-20 grid grid-cols-3 gap-16">
                <div className="text-center px-4">
                    <img
                        src="/images/pricingEquity.svg"
                        alt=""
                        className="w-64 mx-auto mb-8"
                    />

                    <h2 className="text-3xl font-medium leading-tight mb-6">
                        Free equity delivery
                    </h2>

                    <p className="leading-8 text-[#666]">
                        All equity delivery investments (NSE, BSE) are
                        absolutely free — ₹0 brokerage.
                    </p>
                </div>

                <div className="text-center px-4">
                    <img
                        src="/images/intradayTrades.svg"
                        alt=""
                        className="w-64 mx-auto mb-8"
                    />

                    <h2 className="text-3xl font-medium leading-tight mb-6">
                        Intraday and F&O trades
                    </h2>

                    <p className="leading-8 text-[#666]">
                        Flat ₹20 or 0.03% (whichever is lower) per executed
                        order on intraday trades across equity, currency and
                        commodities. Flat ₹20 on all option trades.
                    </p>
                </div>

                <div className="text-center px-4">
                    <img
                        src="/images/pricingEquity.svg"
                        alt=""
                        className="w-64 mx-auto mb-8"
                    />

                    <h2 className="text-3xl font-medium leading-tight mb-6">
                        Free direct MF
                    </h2>

                    <p className="leading-8 text-[#666]">
                        All direct mutual fund investments are absolutely free —
                        ₹0 commissions & DP charges.
                    </p>
                </div>
            </div>
        </section>
    );
}
