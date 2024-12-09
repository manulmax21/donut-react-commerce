import React, {useEffect} from "react";
import s from './stylesCompSettings.module.scss'
import img from '../../../assets/img/p1.jpg'
import { Link } from 'react-router-dom';
import {useCustomDispatch, useCustomSelector} from "../../../hooks/store";
import {selectorCartData} from "../../../store/selectors";
import {fetchGetCart} from "../../../store/thunks/fetchCart";

interface Props {

}

export const CartsSettingsComponent = (props: Props) => {
    const dispatch = useCustomDispatch()
    const {
        carts
    } = useCustomSelector(
        selectorCartData
    )

    useEffect(() => {
        dispatch(fetchGetCart());
    }, [])

    return (
        <div>
            <div className="row">
                <div className={"col-12 profile_img_body " + s.profile_img_body}>
                    <div className={s.profile_img + " profile_img"}>
                        <img src={img}/>
                    </div>
                </div>
                <div className="col-12 text-center mb-2">
                    <h2 className={s.txt}>{Object.values(carts).length} товаров</h2>
                </div>
                <div className="col-12">
                    <div className={s.list_group + " list-group"}><Link to={"/cart"}>
                        <button  type="button" className="list-group-item list-group-item-action">

                                Перейти к покупкам

                        </button></Link>
                        <Link to={"/cart"}><button to={"/cart"} type="button" className="list-group-item list-group-item-action">Перейти к оплате
                        </button></Link>
                            <Link to={"/cart"}><button to={"/cart"} type="button" className="list-group-item list-group-item-action text-danger">Очистить
                            корзину
                        </button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}