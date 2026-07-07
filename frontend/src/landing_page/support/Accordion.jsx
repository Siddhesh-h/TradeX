import React, { useState } from "react";

export default function Accordion({ heading, icon, links }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border border-[#e6e6e6] rounded-md overflow-hidden">
            {/* Header */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center px-6 py-4 bg-white hover:bg-gray-50 hover:-translate-y-[1px] transition-all duration-200 cursor-pointer"
            >
                <i className={`${icon} text-[#387ed1] text-xl`}></i>

                <h2 className="ml-4 text-lg font-medium text-[#424242]">
                    {heading}
                </h2>

                <i
                    className={`fa-solid fa-angle-down ml-auto text-[#387ed1] transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                    }`}
                ></i>
            </button>

            {/* Dropdown */}
            {open && (
                <div className="bg-white border-t border-[#e6e6e6] px-12 py-6">
                    <ul className="list-disc space-y-4">
                        {links.map((link, index) => (
                            <li key={index}>
                                <a
                                    href={link.href}
                                    className="text-[#387ed1] hover:text-[#424242] transition-colors"
                                >
                                    {link.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
