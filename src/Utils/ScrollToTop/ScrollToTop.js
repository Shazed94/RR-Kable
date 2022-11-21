import React, { useState, useEffect, useLayoutEffect } from "react";
import { FaAngleUp } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import "./ScrollToTop.css";

const ScrollToTop = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);

        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });

    }, [pathname]);


    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="top-to-btm">
            {" "}
            {showTopBtn && (
                <FaAngleUp
                    className="icon-position icon-style"
                    onClick={goToTop}
                />
            )}{" "}
        </div>
    );
};
export default ScrollToTop;