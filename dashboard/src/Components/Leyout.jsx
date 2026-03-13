import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

import { useToggle } from "./../context/ToggleContext";

import Sidebar from "./Sidebar";
import Header from "./Header/Header";

export function Dashboard_Leyout() {
    const { toggle, toggleAdminSidebar } = useToggle()
    const formRef = useRef(null);
    useEffect(() => {
        formRef.current?.scrollIntoView({
            block: "start", // start | center | end
            behavior: "smooth",
        });
    });



    return (<div ref={formRef} className="">
        <div
            onClick={toggleAdminSidebar}
            className={` ${toggle.isSidebarActive ? "show" : "hidden"} md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm   z-40`}
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