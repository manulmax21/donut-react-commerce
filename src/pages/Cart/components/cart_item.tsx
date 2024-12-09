import React from "react";
import { Link } from "react-router-dom";
import s from "./cart_item.module.scss";
import { useCustomDispatch } from "../../../hooks/store";
import { fetchRemoveCart } from "../../../store/thunks/fetchCart";

interface Props {
    cart: {
        cartId: string;
        id: string;
        imageUrl: string;
        name: string;
        category: string;
        price: number;
    };
}

export const CartItem = ({ cart }: Props) => {
    const dispatch = useCustomDispatch();

    const deleteCart = async (e) => {
        e.stopPropagation();
        await dispatch(fetchRemoveCart(cart.cartId));
        window.location.reload()
    };

    return (
        <div className={s.card + " card center"} style={{ width: "20rem" }}>
            <Link className={s.link} to={`/catalog/${cart.id}`}>
                <div className={s.card__img + " card__img"}>
                    <img src={cart.imageUrl} className={"card-img-top"} alt={cart.name} />
                </div>
                <div className={"card-body"}>
                    <p className={s.cardName + " card-name"}>{cart.name}</p>
                    <p className={s.cardSubtitle + " card-subtitle"}>{cart.category}</p>
                </div>
            </Link>
            <div onClick={(e) => e.stopPropagation()} className={s.brak + " brak fs-4"}>
                <span className={`${s.price} price`}>{cart.price} P</span>
                <i onClick={(e) => {
                    e.stopPropagation();
                    deleteCart(e);
                }} className={`${s.fi_br_trash} fi fi-br-trash`} />
            </div>
        </div>
    );
};