import React, {useEffect, useState} from "react";
import s from './settings.module.scss'
import {ProfileSettingsComponent} from "./components/profile-settings-component";
import {ProductsSettingsComponent} from "./components/products-settings-component";
import {CartsSettingsComponent} from "./components/carts-settings-component";
import {AddProductSettingsComponent} from "./components/add-product-settings-component";
import {useCustomDispatch, useCustomSelector} from "../../hooks/store";
import {selectorCurrentData} from "../../store/selectors";
import {fetchCurrent} from "../../store/thunks/fetchCurrent";
import {TemplateVoid} from "../../shared/TemplateVoid/TemplateVoid";
import {OrderSettingsComponent} from "./components/order-settings-component";

interface Props {

}

export const Settings = (props: Props) => {
    const [page, setPage] = useState(1)
    const dispatch = useCustomDispatch()
    const {user} = useCustomSelector(selectorCurrentData)

    useEffect(() => {
        dispatch(fetchCurrent())
    }, [])
    if (!Object.values(user).length) return (
        <TemplateVoid type={'login'}/>
    )

    return (
        <div className={s.settings_comp + " settings_comp mt-4"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-xl-4 col-md-4 col-sm-12"}>
                        <div className={"list-group"} id="list-tab" role="tablist">
                            <a
                                onClick={() => setPage(1)}
                                style={{ background: page == 1 ? '#f64c72' : '', borderColor: page == 1 ? '#f64c72' : ''}}
                                className={
                                    `${page == 1 ? 'active' : ''}` + " " + s.list_group_item + " " +
                                    s.listGroupItem + " " + s.list_group_item + " list-group-item list-group-item-action"
                                }
                            >
                                Профиль
                            </a>
                            {user.role === "admin" &&
                                <a
                                style={{ background: page == 2 ? '#f64c72' : '', borderColor: page == 2 ? '#f64c72' : ''}}
                                onClick={() => setPage(2)}
                                className={`${page == 2 ? 'active' : ''}` + " " + s.list_group_item + " " + s.listGroupItem + " " + s.list_group_item + " list-group-item list-group-item-action"}
                            >
                                Все товары
                            </a>}
                            <a
                                style={{ background: page == 3 ? '#f64c72' : '', borderColor: page == 3 ? '#f64c72' : ''}}
                                onClick={() => setPage(3)}
                                className={`${page == 3 ? 'active' : ''}` + " " + s.list_group_item + " " + s.listGroupItem + " " + s.list_group_item + " list-group-item list-group-item-action"}
                            >
                                Корзина
                            </a>
                            {user.role === "admin" &&
                                <a
                                style={{ background: page == 4 ? '#f64c72' : '', borderColor: page == 4 ? '#f64c72' : ''}}
                                onClick={() => setPage(4)}
                                className={`${page == 4 ? 'active' : ''}` + " " + s.list_group_item + " " + s.listGroupItem + " " + s.list_group_item + " list-group-item list-group-item-action"}
                            >
                                Добавить товары
                            </a>}
                            <a
                                style={{ background: page == 3 ? '#f64c72' : '', borderColor: page == 5 ? '#f64c72' : ''}}
                                onClick={() => setPage(5)}
                                className={`${page == 5 ? 'active' : ''}` + " " + s.list_group_item + " " + s.listGroupItem + " " + s.list_group_item + " list-group-item list-group-item-action"}
                            >
                                Заказы
                            </a>
                        </div>
                    </div>
                    <div className={"col-xl-8 col-sm-12 mt-1"}>
                        <div className={"tab-content"} id="nav-tabContent">
                            {page == 1 && <ProfileSettingsComponent/>}
                            {page == 2 && <ProductsSettingsComponent/>}
                            {page == 3 && <CartsSettingsComponent/>}
                            {page == 4 && <AddProductSettingsComponent/>}
                            {page == 5 && <OrderSettingsComponent/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}