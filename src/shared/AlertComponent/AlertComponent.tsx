import React from "react";
import s from "./alert.component.module.scss"

interface Props {

}

export const AlertComponent = ({children}: Props) => {
    return (
        <div className={s.alert}>
            {children}
        </div>
    );
}