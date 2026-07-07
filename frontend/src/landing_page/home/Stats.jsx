import React from "react";

export default function Stats() {
    return (
        <div className="max-w-[1100px] mx-auto px-4 py-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center ">
                <div>
                    <h2 className="text-2xl font-semibold mb-10 text-[#424242]">
                        Trust with confidence
                    </h2>
                    <div className="space-y-8">
                        <div>
                            <h2 className="font-medium text-xl mb-2 text-[#424242]">
                                Customer-first always
                            </h2>
                            <p className="text-lg leading-8 text-[#666]">
                                That's why 1.6+ crore customers trust TradeX
                                with ~ ₹6 lakh crores of equity investments,
                                making us India’s largest broker; contributing
                                to 15% of daily retail exchange volumes in
                                India.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-medium text-xl mb-2 text-[#424242]">
                                No spam or gimmicks
                            </h2>
                            <p className="text-lg leading-8 text-gray-600">
                                No gimmicks, spam, "gamification", or annoying
                                push notifications. High quality apps that you
                                use at your pace, the way you like. Our
                                philosophies.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-medium text-xl mb-2 text-[#424242]">
                                The TradeX universe
                            </h2>
                            <p className="text-lg leading-8 text-gray-600">
                                Not just an app, but a whole ecosystem. Our
                                investments in 30+ fintech startups offer you
                                tailored services specific to your needs.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-medium text-xl mb-2 text-[#424242]">
                                Do better with money
                            </h2>
                            <p className="text-lg leading-8 text-gray-600">
                                With initiatives like Nudge and Kill Switch, we
                                don't just facilitate transactions, but actively
                                help you do better with your money.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <img
                        src="images\ecosystem.png"
                        alt="Ecosystem"
                        className="w-full max-w-lg"
                    />
                    <div className="flex flex-wrap justify-center gap-8 mt-8">
                        <a
                            href="#"
                            className="text-[#387ed1] hover:text-blue-700 font-medium transition"
                        >
                            Explore our products{" "}
                            <i
                                className="fa fa-long-arrow-right"
                                aria-hidden="true"
                            ></i>
                        </a>
                        <a
                            href="#"
                            className="text-[#387ed1] hover:text-blue-700 font-medium transition"
                        >
                            Try Kite Demo{" "}
                            <i
                                className="fa fa-long-arrow-right"
                                aria-hidden="true"
                            ></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
