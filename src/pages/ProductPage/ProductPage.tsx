import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useCustomDispatch, useCustomSelector} from "../../hooks/store";
import {selectorCurrentData, selectorOneProductData} from "../../store/selectors";
import {fetchOneProduct} from "../../store/thunks/fetchOneProduct";
import s from "./product.page.module.scss"
import {Btn} from "../../shared/btn/Btn";
import {fetchAddCart} from "../../store/thunks/fetchCart";
import { Link } from 'react-router-dom';
import {useCartContext} from "../../hooks/useCartContext";
import {AlertComponent} from "../../shared/AlertComponent/AlertComponent";
import {AlertText} from "../Catalog/components/alert_text";

interface Props {

}

export const ProductPage = (props: Props) => {
    const cartCountContext = useCartContext()
    const {id} = useParams()
    const dispatch = useCustomDispatch()
    const [isAlert, setIsAlert] = useState(false)
    const {user} = useCustomSelector(selectorCurrentData)
    const {product} = useCustomSelector(
        selectorOneProductData
    )
    const alertToggle = () => {
        setIsAlert(true)
        setTimeout(() => {
            setIsAlert(false)
        }, 5000)
    }

    useEffect(() => {
        dispatch(fetchOneProduct(id))
    }, [])

    const addToCard = () => {
        if (Object.values(user).length) {
            dispatch(fetchAddCart({
                count: 1,
                productId: product.id
            }))
                .then(() => {
                    cartCountContext.reloadCart()
                })
        }
        else {
            alertToggle()
        }

    }

    return (
        <div className={`${s.containerPage}`}>
            <Link to={"/catalog"}>
                <Btn>Назад в каталог</Btn>
            </Link>
            <div className={s.step}>
                каталог/{product.category}/{product.name}
            </div>
            <div className={s.main + ' row'}>
                <div className={`${s.imgCont} col-xl-7 col-md-6 col-sm-12`}>
                    <img src={product.imageUrl}/>
                </div>
                <div className={s.inf + ' col-xl-5 col-md-6 col-sm-12'}>
                    <h1>{product.name}</h1>
                    <span>{product.category}</span>
                    <p>Цена {product.price} р</p>
                    <Btn onClick={addToCard}>В корзину</Btn>
                    {isAlert &&
                        <div className={`${s.con_alert}`}>
                            <AlertComponent>
                                <AlertText/>
                            </AlertComponent>
                        </div>
                    }
                </div>
            </div>
            <div className={s.desc}>
                <h1>Описание</h1>
                <p>
                    {product.desc}
                </p>
            </div>
        </div>
    );
}