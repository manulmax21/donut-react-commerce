import React, {useEffect, useState} from "react";
import s from "./catalog_items.module.scss"
import { Link } from 'react-router-dom';
import {useCustomDispatch, useCustomSelector} from "../../../hooks/store";
import {fetchAddCart} from "../../../store/thunks/fetchCart";
import {useCartContext} from "../../../hooks/useCartContext";
import {selectorCurrentData} from "../../../store/selectors";
import {AlertComponent} from "../../../shared/AlertComponent/AlertComponent";
import {AlertText} from "./alert_text";
import {fetchCurrent} from "../../../store/thunks/fetchCurrent";

interface Props {
    product: {
        id: string,
        name: string,
        price: string,
        category: string,
        filename: string,
        imageUrl: string
    }
}

export const CatalogItemComponent = ({product}: Props) => {
    const cartCountContext = useCartContext()
    const dispatch = useCustomDispatch()
    const {user} = useCustomSelector(selectorCurrentData)
    const [isAlert, setIsAlert] = useState(false)
    
    const alertToggle = () => {
        setIsAlert(true)
        setTimeout(() => {
            setIsAlert(false)
        }, 5000)
    }
    const addToCard = (e) => {
        e.stopPropagation()
        e.preventDefault()
        if (Object.values(user).length) {
            cartCountContext.reloadCart()
            dispatch(fetchAddCart({
                count: 1,
                productId: product.id
            })).then(() => {
                cartCountContext.reloadCart();
            });
        }
        else {
            alertToggle()
        }
    }
    useEffect(() => {
        dispatch(fetchCurrent())
        cartCountContext.reloadCart()
    }, [])

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
                    <p className={"card-name " + s.card_name}>{product.name}</p>
                    <p className={s.cardSubtitle + " card-subtitle"}>{product.category}</p>
                </div>
                <div className={s.brak + " brak fs-4"}>
                    <span className={s.price + " price"}>{product.price} P</span>
                    <div onClick={(e) => e.stopPropagation()}>
                        <i onClick={(e) => {
                            e.stopPropagation()
                            addToCard(e)
                        }} className={s.fi_rr_shopping_cart + " fi fi-rr-shopping-cart"}/>
                    </div>
                    {isAlert &&
                        <AlertComponent>
                            <AlertText/>
                        </AlertComponent>
                    }
                </div>
            </Link>
        </div>
    );
}