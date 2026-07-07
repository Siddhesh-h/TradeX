import React from "react";

export default function Education() {
    return (
        <div className="w-[1100px] max-w-full mx-auto px-4 py-16">
            <div className="flex items-center justify-between ">
                <div className="w-[39%]">
                    <img
                        src="images/education.svg"
                        alt="Education"
                        className="max-w-full"
                    />
                </div>
                <div className="w-[48%]">
                    <h1 className="text-2xl font-semibold mb-[20px] text-[#424242]">
                        Free and open market education
                    </h1>
                    <p className="text-base font-medium text-[#666] leading-[1.8] mb-[15px]">
                        Varsity, the largest online stock market education book
                        in the world covering everything from the basics to
                        advanced trading
                    </p>
                    <a
                        href="#"
                        className="text-[#387ed1] hover:text-blue-700 transition"
                    >
                        Varsity
                        <i
                            className="fa fa-long-arrow-right"
                            aria-hidden="true"
                        ></i>
                    </a>

                    <p className="text-base font-medium text-[#666] leading-[1.8] mb-[15px] mt-7">
                        TradingQ&A, the most active trading and investment
                        community in India for all your market-related queries
                    </p>
                    <a
                        href="#"
                        className="text-[#387ed1] hover:text-blue-700 transition"
                    >
                        TradingQ&A
                        <i
                            className="fa fa-long-arrow-right"
                            aria-hidden="true"
                        ></i>
                    </a>
                </div>
            </div>
        </div>
    );
}
