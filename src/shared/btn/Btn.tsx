import React from "react";
import s from "./btn.module.scss"

interface Props {
    children: any
}

export const Btn = ({children, ...props}: Props) => {
    return (
        <button {...props} type="button" className={s.btn}>
            {children}
        </button>
    );
}