import React from "react";

export default function RightSection({
    imageURL,
    productName,
    productDescription,
    learnMore,
}) {
    return (
        <div className="w-[1100px] mx-auto max-w-full pt-20">
            <div className="flex items-center gap-25">
                <div className="w-[42%] text-[#424242]">
                    <h2 className="text-2xl font-medium mb-5 ">
                        {productName}
                    </h2>
                    <p className="text-base mb-4 leading-[1.7]">
                        {productDescription}
                    </p>

                    <div>
                        <a
                            href={learnMore}
                            className="text-[#387ed1] font-medium hover:text-[#444]"
                        >
                            Learn More
                            <i
                                className="fa fa-long-arrow-right ml-1"
                                aria-hidden="true"
                            ></i>
                        </a>
                    </div>
                </div>
                <div className="w-[58%]">
                    <img src={imageURL} className="w-full" />
                </div>
            </div>
        </div>
    );
}
