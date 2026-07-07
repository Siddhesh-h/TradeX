import React from "react";
import Accordion from "./Accordion";

export default function CreateTicket() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-4">
            <Accordion
                heading="Account Opening"
                icon="fa-solid fa-circle-plus"
                links={[
                    { text: "Resident individual", href: "#" },
                    { text: "Minor", href: "#" },
                    { text: "Non Resident Indian (NRI)", href: "#" },
                    {
                        text: "Company, Partnership, HUF and LLP",
                        href: "#",
                    },
                    { text: "Glossary", href: "#" },
                ]}
            />

            <Accordion
                heading="Your TradeX Account"
                icon="fa-solid fa-user"
                links={[
                    { text: "Your Profile", href: "#" },
                    { text: "Account modification", href: "#" },
                    {
                        text: "Client Master Report (CMR) and Depository Participant (DP)",
                        href: "#",
                    },
                    { text: "Nomination", href: "#" },
                    {
                        text: "Transfer and conversion of securities",
                        href: "#",
                    },
                ]}
            />

            <Accordion
                heading="Kite"
                icon="fa-solid fa-chart-line"
                links={[
                    { text: "IPO", href: "#" },
                    { text: "Trading FAQs", href: "#" },
                    {
                        text: "Margin Trading Facility (MTF) and Margins",
                        href: "#",
                    },
                    { text: "Charts and orders", href: "#" },
                    { text: "Alerts and Nudges", href: "#" },
                    { text: "General", href: "#" },
                ]}
            />
            <Accordion
                heading="Funds"
                icon="fa-solid fa-indian-rupee-sign"
                links={[
                    { text: " Add money", href: "#" },
                    { text: " Withdraw money", href: "#" },
                    { text: " Add bank accounts", href: "#" },
                    { text: " eMandates", href: "#" },
                ]}
            />
            <Accordion
                heading="Console"
                icon="fa-solid fa-circle-notch"
                links={[
                    { text: "Portfolio", href: "#" },
                    { text: "Corporate actions", href: "#" },
                    { text: "Funds statement", href: "#" },
                    { text: "Reports", href: "#" },
                    { text: "Profile", href: "#" },
                    { text: "Segments", href: "#" },
                ]}
            />
            <Accordion
                heading="Coin"
                icon="fa-solid fa-coins"
                links={[
                    { text: "Mutual funds", href: "#" },
                    { text: "National Pension Scheme (NPS)", href: "#" },
                    { text: "Fixed Deposit (FD)", href: "#" },
                    { text: "Features on Coin", href: "#" },
                    { text: "Payments and Orders", href: "#" },
                    { text: "General", href: "#" },
                ]}
            />
        </div>
    );
}
