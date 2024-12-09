import React, { useEffect, useState } from "react";
import s from "./stylesCompSettings.module.scss";
import { Btn } from "../../../shared/btn/Btn";
import { useCustomDispatch, useCustomSelector } from "../../../hooks/store";
import { selectorCurrentData, selectorOrderData } from "../../../store/selectors";
import { fetchGetOrder, fetchRemoveOrder } from "../../../store/thunks/fetchOrder";
import { Loading } from "../../Loading/Loading";

interface Props {}

export const OrderSettingsComponent = (props: Props) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const customDispatch = useCustomDispatch();
    const { orders } = useCustomSelector(selectorOrderData);
    const { user } = useCustomSelector(selectorCurrentData);

    const fetchUserOrders = async () => {
        try {
            await customDispatch(fetchGetOrder(user.id));
        } catch (error) {
            console.error("Ошибка при получении заказов:", error);
        }
    };

    useEffect(() => {
        fetchUserOrders();
    }, [user.id]);

    useEffect(() => {
        setIsVisible(Object.values(orders).length > 0);
        if(orders.message) setIsVisible(false)
    }, [orders]);
    const removeOrder = async (id) => {
        setLoading(true);
        try {
            await customDispatch(fetchRemoveOrder(id));
            await fetchUserOrders();
        } catch (error) {
            console.error("Ошибка при удалении заказа:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (isLoading) {
        return <Loading state={() => setLoading(false)} status={"void"} body={{}} />;
    }

    return (
        <>
            {isVisible ? (
                <div className={`row`}>
                    {Object.values(orders).map(p => (
                        <div key={p.id} className={`col-12 ${s.ordersItem}`}>
                            <div className={`${s.imgOrder}`}>
                                <img src={p.imageUrl} alt={`Изображение заказа ${p.id}`} />
                            </div>
                            <div className={`${s.infoOrder}`}>
                                <div className={`${s.txtOrder}`}>
                                    <p>{formatDate(p.data_start)}</p>
                                    <span>{p.phone}</span>
                                </div>
                                <div className={`${s.txtOrder}`}>
                                    <p>{formatDate(p.data_end)}</p>
                                    <span>{p.status}</span>
                                </div>
                                <Btn onClick={() => removeOrder(p.id)}>
                                    <i className={`fi fi-br-trash`} />
                                </Btn>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={`row`}>
                    <p className={`${s.txt}`}>Заказы не найдены</p>
                    <Btn onClick={fetchUserOrders}>Попробовать снова</Btn>
                </div>
            )}
        </>
    );
};