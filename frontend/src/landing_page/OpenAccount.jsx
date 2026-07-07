export default function OpenAccount() {
    return (
        <div className="w-[900px] max-w-full py-10 m-auto flex justify-center text-center mb-7">
            <div>
                <h2 className="text-2xl font-medium text-[#424242] leading-[1.5] mb-5">
                    Open a TradeX account
                </h2>

                <p className="text-base text-[#666] leading-[1.5] mb-10">
                    Modern platforms and apps, ₹0 investments, and flat ₹20
                    intraday and F&O trades
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
