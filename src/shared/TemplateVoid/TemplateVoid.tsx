import React, {useState} from "react";
import s from "./Template.void.module.scss"
import {Btn} from "../btn/Btn";
import { Link } from 'react-router-dom';
import {LoginReg} from "../../pages/Setings/components/loginReg";
import {Loading} from "../../pages/Loading/Loading";
import useCookie from "../../hooks/useCookie";
import {useCustomSelector} from "../../hooks/store";
import {selectorRegData} from "../../store/selectors";

interface Props {
    type: string
}

export const TemplateVoid = ({type}: Props) => {
    if (type === "cart_auth") {
        return (
            <div className={s.containerContent}>
                <div
                    className={`${s.img}`}
                >
                    <i style={{padding: "20px 60px"}} className="fi fi-br-cart-arrow-down"/>
                </div>
                <h1>Вы не вошли в аккаунт</h1>
                <span>Для добавления в корзину нужно перейти в настройки для входа или создания аккаунта</span>
                <Link to={"/settings"} className={`${s.Btn}`}>
                    <Btn>
                        Перейти в настройки
                    </Btn>
                </Link>
            </div>
        );
    }
    if (type === "cart_void") {
        return (
            <div className={s.containerContent}>
                <div className={`${s.img}`}>
                    <i className="fi fi-br-bag-shopping-minus"/>
                </div>
                <h1>Корзина пуста</h1>
                <span>Перейдите в каталог для покупок</span>
                <Link to={"/catalog"} className={`${s.Btn}`}>
                    <Btn>
                        Перейти в каталог
                    </Btn>
                </Link>
            </div>
        );
    }
    if (type === "login") {
        const [isLogin, setIsLogin] = useState(false)
        const [isLoad, setIsLoad] = useState(false)
        const [sentObj, setSentObj] = useState({})
        const [data, setData] = useState({})
        const [errLog, setErrLog] = useState(false)
        const [isLoadStatus, setIsLoadStatus] = useState('login')
        const cookieContext = useCookie()
        const {userReg, response: userRegRes} = useCustomSelector(
            selectorRegData
        )

        const exitLog = (status) => {
            setIsLogin(!status)
        }
        const load = (newOb) => {
            setIsLoad(true)
            setSentObj(newOb)
        }
        const changeStatus = (s) => {
            setIsLoadStatus(s)
        }
        const hasCookie = () => {
          return (!(cookieContext.getCookie("token") == '' || cookieContext.getCookie("token") == undefined))
        }
        const loadData = (data) => {
            setData(data)
            setIsLoad(false)
            if (hasCookie() && isLoadStatus == 'login'){
                window.location.reload()
            }
            if (hasCookie() && isLoadStatus == 'reg'){
                window.location.reload()
            }
            if (!hasCookie() && isLoadStatus == 'login') {
                setErrLog(true)
            }
            if (!hasCookie() && isLoadStatus == 'reg') {
                setErrLog(true)
            }
        }
        const changeErrLog = (e) => {
          setErrLog(e)
        }
        return (
            <div className={s.containerContent}>
                {!isLoad &&
                    <>
                        {isLogin &&
                            <LoginReg
                                changeStatus={changeStatus}
                                load={load}
                                status={isLoadStatus}
                                errStatus={errLog}
                                setErrStatus={changeErrLog}
                                exit={exitLog}
                            />
                        }

                    <div className={`${s.img}`}>
                    <i className="fi fi-rs-user"/>
                    </div>
                    <h1>Вы не вошли в аккаунт</h1>
                    <span>Войдите или создайте аккаунт</span>
                    <div className={`${s.Btn} ${s.btns}`}>
                    <Btn
                    onClick={() => {
                    setIsLoadStatus("login")
                    setIsLogin(!isLogin)
                    }}
                    >
                    Войти
                    </Btn>
                    <Btn
                    onClick={() => {
                    setIsLoadStatus("reg")
                    setIsLogin(!isLogin)
                }}
                    >
                    Зарегистрироваться
                    </Btn>
                    </div>
                        </>
                }
                {isLoad &&
                    <Loading
                        state={loadData}
                        status={isLoadStatus}
                        body={sentObj}
                    />
                }

            </div>
        );
    }
    return null
}