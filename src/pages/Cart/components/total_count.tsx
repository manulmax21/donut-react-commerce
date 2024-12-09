import React, {useEffect, useState} from "react";
import s from "./cart_item.module.scss"
import sP from "../../../pages/Setings/components/stylesCompSettings.module.scss"
import {Btn} from "../../../shared/btn/Btn";
import {useCustomDispatch, useCustomSelector} from "../../../hooks/store";
import {fetchRemoveAllCart} from "../../../store/thunks/fetchCart";
import {fetchAddOrder} from "../../../store/thunks/fetchOrder";
import {Popup} from "../../../shared/Popup/Popup";
import InputMask from "react-input-mask";
import {selectorCurrentData} from "../../../store/selectors";
import {fetchCurrent} from "../../../store/thunks/fetchCurrent";

interface Props {
    info: {
        count: string,
        price: number
    }
}

export const TotalCount = ({info, carts}: Props) => {
    const dispatch = useCustomDispatch()
    const [isPopup, setIsPopup] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [isErrPhone, setIsErrPhone] = useState(false)
    const [newOrder, setNewOrder] = useState({
        phone: ""
    })
    const {user} = useCustomSelector(selectorCurrentData)
    useEffect(() => {
        dispatch(fetchCurrent())
    }, [])
    const exit = () => {
        setIsPopup(false)
    }
    const clearCarts = () => {
        dispatch(fetchRemoveAllCart())
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    }
    const handlePhoneChange = (e) => {
        const {value} = e.target;
        setNewOrder((prevOrder) => ({
            ...prevOrder,
            phone: value,
        }));
    };
    const makeOrders = async () => {
        const newOrdersProducts = JSON.stringify(Object.values(carts).map(p => p.id))
        const newOrderObj = {
            phone: newOrder.phone,
            products: newOrdersProducts,
            data_start: new Date().toISOString(),
            data_end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            status: "В пути",
            userId: user.id
        }
        setNewOrder({
            ...newOrder,
            products: newOrdersProducts,
            data_start: new Date().toISOString(),
            data_end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            status: "В пути",
            userId: user.id
        })
        const phoneRegex = /^\+8 \(\d{3}\)-\d{2}-\d{2}$/
        setIsErrPhone(false)
        if (phoneRegex.test(newOrder.phone)) {
            await dispatch(fetchAddOrder(newOrderObj))
            await dispatch(fetchRemoveAllCart())
            setIsPopup(false)
            window.location.reload()
        }
        else {
            setIsErrPhone(true)
        }
    }
    return (
        <div className={s.totalCart}>
            {isPopup &&
                <Popup
                    isVisible={isPopup}
                    status={() => exit()}
                >
                    <div className={sP.popup_cont}>
                        <h2 className={`center`}>Заказ</h2>
                        {isErrPhone &&
                            <span>*неправильный номер телефона</span>
                        }
                        <div className={`${sP.popupItem}`}>
                            <span>Номер телефона</span>
                            <InputMask
                                mask="+8 (999)-99-99"
                                onChange={handlePhoneChange}
                                value={newOrder.phone}
                                placeholder="+8 (___)-__-__"
                                type="tel"
                            />
                        </div>
                        <button onClick={()=>makeOrders()}>Оформить заказ</button>
                    </div>
                </Popup>
            }
            <div className={s.text}>
                <p>количество: {info.count}</p>
                <p>цена: {info.price} р</p>
            </div>
            <div className={s.btn}>
                <Btn onClick={() => setIsPopup(true)}>Оформить заказ</Btn>
                <Btn onClick={clearCarts}>Очистить корзину</Btn>
            </div>
        </div>
    );
}