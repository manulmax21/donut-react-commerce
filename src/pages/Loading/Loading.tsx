import React, {useCallback, useEffect, useMemo, useState} from "react";
import s from './loading.module.scss'
import cart from '../../assets/img/pf1.png'
import {fetchLogin} from "../../store/thunks/fetchLogin";
import {fetchReg} from "../../store/thunks/fetchReg";
import {useCustomDispatch, useCustomSelector} from "../../hooks/store";
import {selectorAddProductData, selectorLoginData, selectorRegData} from "../../store/selectors";
import {fetchAddProduct} from "../../store/thunks/fetchAddProduct";

interface Props {
    state: (object) => object,
    status: string,
    body: any,
}

export const Loading = (props: Props) => {
    const [data, setData] = useState({})
    const dispatch = useCustomDispatch()
    const [statusP, setStatusP] = useState(props.status)
    const {userReg, response: userRegRes} = useCustomSelector(
        selectorRegData
    )
    const {userLogin} = useCustomSelector(
        selectorLoginData
    )
    const {newProduct} = useCustomSelector(
        selectorAddProductData
    )

    const fetchData = useCallback(async () => {
        if (statusP === 'login'){
            await dispatch(fetchLogin({
                email: props.body.email,
                password: props.body.password
            }))
            setData(userLogin)
        }
        if (statusP === 'reg'){
            await dispatch(fetchReg({
                email: props.body.email,
                password: props.body.password,
                name: props.body.name
            }))
            setData({...userRegRes})
            setStatusP('')
        }
        if (statusP === 'addProduct'){
            setData(newProduct)
            setStatusP('')
        }
        if (statusP === 'void'){
            setData(newProduct)
            setStatusP('')
        }
        setTimeout(() => {
            props.state(data)
        }, 1000)
    }, [data])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <div className={s.cont + ' ' + s.rot}>
            <img className={s.load} src={cart}/>
        </div>
    );
}