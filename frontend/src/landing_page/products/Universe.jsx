import React from "react";

export default function Universe() {
    return (
        <div className="pt-20 w-[1100px] mx-auto text-center">
            <div className="">
                <h2 className="text-2xl mb-5 font-medium text-[#424242]">
                    The TradeX Universe
                </h2>
                <p className="text-base mb-4 text-[#424242]">
                    Extend your trading and investment experience even further
                    with our partner platforms
                </p>
            </div>
            <div className="grid grid-cols-3 gap-y-16 gap-x-10 my-10">
                <div className="text-center">
                    <div className="h-[60px] flex items-center justify-center">
                        <img
                            src="images/smallcaseLogo.png"
                            className="max-h-full w-auto"
                        />
                    </div>
                    <p className="mt-5 text-[#666] text-sm">
                        Thematic investment platform
                    </p>
                </div>
                <div className="text-center">
                    <div className="h-[60px] flex items-center justify-center">
                        <img
                            src="images/streakLogo.png"
                            className="max-h-full w-auto"
                        />
                    </div>
                    <p className="mt-5 text-[#666] text-sm">
                        Algo & strategy platform
                    </p>
                </div>

                <div className="text-center">
                    <div className="h-[60px] flex items-center justify-center">
                        <img
                            src="images/sensibullLogo.svg"
                            className="max-h-full w-auto"
                        />
                    </div>
                    <p className="mt-5 text-[#666] text-sm">
                        Options trading platform
                    </p>
                </div>
                <div className="text-center">
                    <div className="h-[60px] flex items-center justify-center">
                        <img
                            src="images/zerodhaFundhouse.png"
                            className="max-h-full w-auto"
                        />
                    </div>
                    <p className="mt-5 text-[#666] text-sm">Asset management</p>
                </div>

                <div className="text-center">
                    <div className="h-[60px] flex items-center justify-center">
                        <img
                            src="images/goldenpiLogo.png"
                            className="max-h-full w-auto"
                        />
                    </div>
                    <p className="mt-5 text-[#666] text-sm">
                        Bonds trading platform
                    </p>
                </div>

                <div className="text-center">
                    <div className="h-[60px] flex items-center justify-center">
                        <img
                            src="images/dittoLogo.png"
                            className="max-h-full w-auto"
                        />
                    </div>
                    <p className="mt-5 text-[#666] text-sm">Insurance</p>
                </div>
            </div>
            <div className="pt-10 pb-15 w-[900px] m-auto text-center">
                <a
                    className="bg-[#387ed1] mt-5 text-white py-3 px-8 rounded font-medium text-lg hover:bg-[#222]"
                    href="/signup"
                >
                    Sign up for free
                </a>
            </div>
        </div>
    );
}
