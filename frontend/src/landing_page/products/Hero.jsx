import React from "react";

export default function Hero() {
    return (
        <div className="w-[1100px] mx-auto max-w-full py-25 border-b border-[#eee] text-center mt-20">
            <div className="text-[#424242]">
                <h1 className="text-3xl font-medium">TradeX Products</h1>
                <p className="text-lg font-normal mt-[10px] mb-[15px]">
                    Sleek, modern and intuitive trading platforms
                </p>
                <p className="text-base mb-[15px]">
                    Check out our{" "}
                    <a
                        href="#"
                        className="text-decoration-none  text-[#387ed1] font-medium hover:text-[#444]"
                    >
                        {" "}
                        investment offerings
                        <i
                            className="fa fa-long-arrow-right"
                            aria-hidden="true"
                        ></i>
                    </a>
                </p>
            </div>
        </div>
    );
}
