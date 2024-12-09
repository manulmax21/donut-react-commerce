import React, { useEffect, useState } from "react";

export const useScroll = () => {
    const [isSticky, setIsSticky] = useState(false);

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        if (scrollTop > 50 && !isSticky) {
            setIsSticky(true);
        } else if (scrollTop <= 50 && isSticky) {
            setIsSticky(false);
        }
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isSticky]);

    return { isSticky, scrollToTop };
};