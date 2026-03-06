import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header/Header";

export function Dashboard_Leyout() {

    const formRef = useRef(null);
    useEffect(() => {
        formRef.current?.scrollIntoView({
            block: "start", // start | center | end
            behavior: "smooth",
        });
    });

    return (<div ref={formRef} className="">
        <div
            id="mobile-admin-overlay"
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm  hidden z-40"
        >
        </div>
        <Sidebar />
        <div id="admin-dashboard" className="min-h-screen">
            <Sidebar />

            <div className="md:ml-64 min-h-screen">
                <main className="p-6" >
                    <Header />
                    <Outlet />
                </main>
            </div>
        </div>
    </div>)
}