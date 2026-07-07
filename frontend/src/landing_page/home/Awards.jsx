import React from "react";

export default function Awards() {
    return (
        <div className="max-w-[1100px] mx-auto px-4 pb-[120px]">
            <div className="flex items-center gap-8 mb-[120px]">
                <div className="w-[22%]">
                    <img src="images\kc-logo-landing.svg" alt="kite logo" />
                </div>
                <div className="w-[70%]">
                    <p className="text-sm font-semibold text-[#666]">
                        Need more? Build your own trading and investing
                        experience with Kite Connect, simple HTTP APIs to place
                        orders, stream market data, manage your account, and
                        more.{" "}
                        <a
                            href="#"
                            className="text-[#387ed1] hover:text-blue-700 transition"
                        >
                            Explore{" "}
                            <i
                                className="fa fa-long-arrow-right"
                                aria-hidden="true"
                            ></i>
                        </a>
                    </p>
                </div>
                <div className="w-[10%}">
                    <img
                        src="images\kc-banner-image.svg"
                        alt="banner"
                        className="h-[25px] w-full"
                    />
                </div>
            </div>
            <div className="flex justify-between items-center gap-8">
                <div className="w-[40%] ">
                    <h2 className="text-2xl font-semibold mb-[20px] text-[#424242]">
                        Unbeatable pricing
                    </h2>
                    <p className="text-base font-medium text-[#666] leading-[1.8] mb-[15px]">
                        We pioneered the concept of discount broking and price
                        transparency in India. Flat fees and no hidden charges
                    </p>
                    <a
                        href=""
                        className=" text-[#387ed1] hover:text-blue-700 transition"
                    >
                        See Pricing{" "}
                        <i
                            className="fa fa-long-arrow-right"
                            aria-hidden="true"
                        ></i>
                    </a>
                </div>
                <div className="flex items-center justify-between w-[60%]">
                    <div className="flex items-end">
                        <img
                            src="images\pricing0.svg"
                            alt=""
                            className="w-[120px]"
                        />
                        <p className="ml-[-25px] mb-4 text-[#666] text-xs">
                            Free account <br /> opening
                        </p>
                    </div>
                    <div className="flex items-end">
                        <img
                            src="images\pricingEquity.svg"
                            alt=""
                            className="w-[120px]"
                        />
                        <p className="ml-[-25px] mb-4 text-[#666] text-xs">
                            Free equity delivery <br /> and direct mutual funds
                        </p>
                    </div>
                    <div className="flex items-end">
                        <img
                            src="images\intradayTrades.svg"
                            alt=""
                            className="w-[120px]"
                        />
                        <p className="ml-[-18px] mb-4 text-[#666] text-xs">
                            Intraday and <br /> F&O
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
