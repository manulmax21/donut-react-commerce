import React from "react";
import s from "./product.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {useCustomDispatch} from "../../../../hooks/store";
import {fetchRemoveProduct} from "../../../../store/thunks/fetchRemoveProduct";

interface Props {
    product: any
}

export const ProductItemSeting = ({product}: Props) => {
    const navigate = useNavigate();
    const dispatch = useCustomDispatch()
    const remToCard = (e) => {
        e.stopPropagation()
        e.preventDefault()
        dispatch(fetchRemoveProduct(product.id))
        window.location.reload()
    }
    const editToCard = (e) => {
        e.stopPropagation()
        e.preventDefault()
        navigate(`/settings/product/${product.id}`)
    }

    return (
        <div className={s.card + " card p-2 mt-4"} style={{width: '18rem'}}>
            <Link className={s.link} to={`/catalog/${product.id}`}>
                <div className={s.card__img}>
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                    />
                </div>
                <div className={" card-body"}>
                    <p className={`card-name ${s.cardName}`}>{product.name}</p>
                    <p className={s.cardSubtitle + " card-subtitle"}>{product.category}</p>
                </div>
                <div className={s.brak + " brak fs-4"}>
                    <span className={s.price + " price"}>{product.price} P</span>
                    <div className={s.btns}>
                        <svg onClick={(e) => editToCard(e)} className={s.fi_rr_shopping_cart + " feather feather-edit"} fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        <i onClick={(e) => remToCard(e)} className={s.fi_rr_shopping_cart + " fi fi-br-trash"}/>
                    </div>
                </div>
            </Link>
        </div>
    );
}