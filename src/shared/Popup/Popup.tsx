import React, {useState} from "react";
import s from "./popup.module.scss"

interface Props {
    isVisible: boolean,
    status: (boolean) => any
}

export const Popup = ({children, isVisible, status}: Props) => {

        return (
            <div className={s.popup}>
                <span
                    className={s.exit}
                    onClick={() => status(isVisible)}
                >X</span>
                <div className={s.content}>
                    {children}
                </div>
            </div>
        );
}