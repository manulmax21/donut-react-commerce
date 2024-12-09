import React from "react";
import s from "./myInput.module.scss"

interface Props {

}

export const MyInput = ({props, ref}: Props) => {
    return (
        <input ref={ref} className={s.input} {...props}/>
    );
}