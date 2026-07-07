import React from "react";
import CreateTicket from "./CreateTicket";
import Hero from "./Hero";

export default function SupportPage() {
    return (
        <div className="mt-16">
            <Hero />
            <CreateTicket />
        </div>
    );
}
