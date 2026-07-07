import React from "react";

export default function Hero() {
    return (
        <section className="bg-[#f6f6f6] w-full ">
            <div className="px-6 py-10 m-auto max-w-7xl">
                <div className="flex pb-5 gap-3 justify-between ">
                    <p className="text-4xl font-semibold pr-2 text-[#424242] ">
                        <a href="">Support Portal</a>
                    </p>
                    <a className="text-base py-2 px-4 rounded text-white bg-[#397dd0] hover:bg-[#424242] cursor-pointer">
                        <span>My Tickets</span>
                    </a>
                </div>
                <div className="flex px-5 h-15 items-center rounded bg-white border border-[#e0e0e0]">
                    <span className="text-[#9e9e9e] text-lg pr-3">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </span>
                    <input
                        type="text"
                        className="bg-white border-none w-full h-full focus:outline-none pl-1 py-4"
                        placeholder="Eg: How to create a ticket?"
                    />
                </div>
            </div>
        </section>
    );
}
