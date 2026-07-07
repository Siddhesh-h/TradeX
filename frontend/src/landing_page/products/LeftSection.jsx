import React from "react";

export default function LeftSection({
    imageURL,
    productName,
    productDescription,
    tryDemo,
    learnMore,
    googlePlay,
    appStore,
}) {
    return (
        <div className="w-[1100px] mx-auto max-w-full pt-20">
            <div className="flex items-center gap-25">
                <div className="w-[58%]">
                    <img src={imageURL} className="w-[90%]" />
                </div>
                <div className="w-[42%] text-[#424242]">
                    <h2 className="text-2xl font-medium mb-5 ">
                        {productName}
                    </h2>
                    <p className="text-base mb-4 leading-[1.7]">
                        {productDescription}
                    </p>
                    <div className="flex gap-20 mb-4">
                        <a
                            href={tryDemo}
                            className="text-[#387ed1] font-medium hover:text-[#444]"
                        >
                            Try Demo
                            <i
                                className="fa fa-long-arrow-right ml-1"
                                aria-hidden="true"
                            ></i>
                        </a>

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
                    <div className="flex gap-5">
                        <a href={googlePlay}>
                            <img src="images\googlePlayBadge.svg" />
                        </a>
                        <a href={appStore}>
                            <img src="images\appstoreBadge.svg" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
