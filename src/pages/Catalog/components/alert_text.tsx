import React from "react";
import s from "./catalog_items.module.scss"
import {Link} from "react-router-dom";
import {Btn} from "../../../shared/btn/Btn";

interface Props {

}

export const AlertText = (props: Props) => {
    return (
        <div className={s.alert_text}>
            <span className={"mb-2"}>
                Для добавления товара в корзину необходимо <Link to={"/settings"}>авторизироваться</Link>
            </span>
            <Link to={"/settings"}>
                <Btn>перейти к авторизации</Btn>
            </Link>
        </div>
    );
}