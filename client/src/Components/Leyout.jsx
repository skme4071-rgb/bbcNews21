import { useEffect, useRef } from "react"
import { Outlet } from "react-router-dom";


import HeadLine from "./HeadLine";
import Header from "./../Components/Header/Header";

import Footer from "./../Components/Footer/Footer";
import ScrollToTo from "./ScrollToTo";
import FocusBoxProvider from "./../context/FocusBoxContext";
import { WindowScrollTop } from "./../utilities/Element";



export function AppLayout() {

    return (
        <FocusBoxProvider>
            <ScrollToTo />
            <WindowScrollTop />
            <HeadLine />
            <Header />
            <main className="container mx-auto px-4 py-6">
                <div className="section section-fade active">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </FocusBoxProvider>

    );
}


export function DetailsLeyout({ children, title, category }) {

    const formRef = useRef(null);
    useEffect(() => {
        formRef.current?.scrollIntoView({
            block: "start", // start | center | end
            behavior: "smooth",
        });
    });

    return (
        <>
            <div ref={formRef} className="mb-8 ">
                <h1 className="text-3xl sm:text-4xl font-bold mb-3 gradient-text">
                    {category}
                </h1>
                <p className="text-gray-600 text-lg">{title}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">{children}</div>
        </>
    );
}

export function CommonLeyout({ children, pagesName, pagesTitle }) {

    const formRef = useRef(null);
    useEffect(() => {
        formRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start", // start | center | end
        });
    });
    return (
        <>
            <div ref={formRef} className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold mb-3 gradient-text">
                    {pagesName}
                </h1>
                <p className="text-gray-600 text-lg">{pagesTitle}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">{children}</div>
        </>
    );
}