import React, { useState, useEffect } from 'react';
import s from "./ScrollToTopButton.module.scss"

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className={s.scroll_to_top}>
            {isVisible &&
                <button onClick={scrollToTop} className={s.scroll_button}>
                    ↑
                </button>
            }
        </div>
    );
};

export default ScrollToTopButton;