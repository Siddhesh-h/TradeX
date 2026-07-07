import React from "react";

export default function Hero() {
    return (
        <div className="w-[1100px] max-w-full mx-auto">
            <div className="py-45 text-center">
                <h1 className="text-2xl leading-9 font-medium text-[#424242]">
                    We pioneered the discount broking model in India.
                    <br /> Now, we are breaking ground with our technology.
                </h1>
            </div>

            <div className="pt-20 text-[#424242]">
                <div className="flex justify-between gap-10 w-[900px] mx-auto max-w-full text-lg">
                    <div className="leading-7">
                        <p className="mb-4">
                            We kick-started operations on the 15th of August,
                            2010 with the goal of breaking all barriers that
                            traders and investors face in India in terms of
                            cost, support, and technology. We named the company
                            TradeX, a combination of Zero and "Rodha", the
                            Sanskrit word for barrier.
                        </p>

                        <p className="mb-4">
                            Today, our disruptive pricing models and in-house
                            technology have made us the biggest stock broker in
                            India.
                        </p>

                        <p className="mb-4">
                            Over 1.6+ crore clients place billions of orders
                            every year through our powerful ecosystem of
                            investment platforms, contributing over 15% of all
                            Indian retail trading volumes.
                        </p>
                    </div>
                    <div className="leading-7">
                        <p className="mb-4">
                            In addition, we run a number of popular open online
                            educational and community initiatives to empower
                            retail traders and investors.
                        </p>

                        <p className="mb-4">
                            Rainmatter, our fintech fund and incubator, has
                            invested in several fintech startups with the goal
                            of growing the Indian capital markets.
                        </p>

                        <p className="mb-4">
                            And yet, we are always up to something new every
                            day. Catch up on the latest updates on our blog or
                            see what the media is saying about us or learn more
                            about our business and product philosophies.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
