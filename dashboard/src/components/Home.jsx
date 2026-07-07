import React from "react";
import TopBar from "./TopBar";
import Dashboard from "../pages/Dashboard";

export default function Home() {
    return (
        <div className="h-screen bg-slate-50 flex flex-col">
            <TopBar />

            <Dashboard />
        </div>
    );
}
