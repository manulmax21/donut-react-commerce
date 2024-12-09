import React from "react";
import s from "./footer.module.scss"

interface Props {

}

export const Footer = (props: Props) => {
    return (
        <div className={s.footer__main}>
            <div className={"container row"}>
                <div className={"text-center col-lg-6 col-sm-12"}>
                    by Maxim Pushkin
                </div>
                <div className={"text-center col-lg-6 col-sm-12"}>
                    git:
                    <a href="*">ссылка на git</a>
                </div>
            </div>
        </div>
    );
}