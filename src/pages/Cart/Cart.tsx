import React, {useEffect, useState} from "react";
import s from "./cart.module.scss"
import {CartItem} from "./components/cart_item";
import {TotalCount} from "./components/total_count";
import {useCustomDispatch, useCustomSelector} from "../../hooks/store";
import {selectorCartData, selectorCurrentData, selectorPageProductData} from "../../store/selectors";
import {fetchGetCart} from "../../store/thunks/fetchCart";
import {Loading} from "../Loading/Loading";
import {TemplateVoid} from "../../shared/TemplateVoid/TemplateVoid";
import {fetchCurrent} from "../../store/thunks/fetchCurrent";
import {fetchAddOrder} from "../../store/thunks/fetchOrder";

interface Props {

}

export const Cart = (props: Props) => {
    const dispatch = useCustomDispatch()
    const [countCart, setCountCart] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [info, setInfo] = useState({
        count: 0,
        price: 0
    });
    const {
        carts
    } = useCustomSelector(
        selectorCartData
    )
    const {
        user
    } = useCustomSelector(
        selectorCurrentData
    )
    const loadedData = () => {
        setLoading(false)
    }
    const drawInfo = () => {
        const totalPrice = Object.values(carts).reduce((accumulator, product) => accumulator + (+(product.price) || 0), 0);
        setInfo({
            count: Object.values(carts).length,
            price: (+ totalPrice)
        })
    }
    useEffect(() => {
        drawInfo()
    }, [carts])
    useEffect(() => {
        const loadCart = async () => {
            try {
                await dispatch(fetchGetCart());
                await dispatch(fetchCurrent());
            } catch (err) {
                setError("Ошибка загрузки корзины");
            } finally {
                setLoading(false);
            }
        };
        drawInfo()
        loadCart();
    }, [dispatch]);

    if (loading) {
        return <Loading
            state={loadedData}
            status={"addProduct"}
            body={carts}
        />;
    }

    if (error) {
        return <div>{error}</div>;
    }
    if (!Object.values(user).length) {
        return <TemplateVoid type={"cart_auth"}/>;
    }
    return (
        <div className={s.catalog}>
            <div className={s.container + " container"}>
                <div className={"row"}>
                    {Object.values(carts).length > 0 ? (
                        <>
                            <div className={"col-xl-3 col-sm-12"}>
                                <TotalCount
                                    carts={carts}
                                    info={info}
                                />
                            </div>
                            <div className={"col-xl-9 col-sm-12"}>
                                <div className={"row"}>
                                    {Object.values(carts).map((cart) => (
                                        <div
                                            key={cart.id}
                                            className={s.el + " el col-xl-6 col-md-6 col-sm-12 mt-4 center"}
                                        >
                                            <CartItem
                                                cart={cart}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <TemplateVoid type={"cart_void"}/>
                    )}
                </div>

            </div>
        </div>
    );
}