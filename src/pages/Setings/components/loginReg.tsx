import React, {useEffect, useState} from "react";
import {Popup} from "../../../shared/Popup/Popup";
import s from "./stylesCompSettings.module.scss"
import {fetchReg} from "../../../store/thunks/fetchReg";
import {useCustomDispatch, useCustomSelector} from "../../../hooks/store";
import {selectorLoginData, selectorRegData} from "../../../store/selectors";
import {fetchLogin} from "../../../store/thunks/fetchLogin";
import useCookie from "../../../hooks/useCookie";

interface Props {
    status: string
}

export const LoginReg = ({
                             status,
                             exit,
                             obj,
                             load,
                             changeStatus,
                             errStatus = false,
                             setErrStatus
}: Props) => {
    const [statusP, setStatusP] = useState(status)
    const [isVisible, setIsVisible] = useState(true)
    const [user, setUser] = useState({})
    const [isLoad, setIsLoad] = useState(false)
    const {getCookie, setCookie} = useCookie()
    const [isErrLog, setIsErrLog] = useState(errStatus)
    const dispatch = useCustomDispatch()

    const [newObj, setNewObj] = useState({
        name: '',
        email: '',
        password: '',
        secondPassword: ""
    })

    const clearObj = () => {
        setNewObj({
            name: '',
            email: '',
            password: '',
            secondPassword: ''
        })
    }

    const changeDef = (p: string) => {
        clearObj()
        setErrStatus(false)
        setIsErrLog(false)
        setStatusP(p)
        changeStatus(p)
    }

    const registration = async () => {
      if (newObj.email && newObj.password && newObj.secondPassword && newObj.name){
          if (newObj.password == newObj.secondPassword){
              load(newObj)
              clearObj()
          }
      }
    }
    const correctSecondPassword = () => {
      return newObj.password === newObj.secondPassword
    }
    const login = async () => {
        load(newObj)
    }

    if (statusP === "login") {
        return (
            <Popup
                isVisible={isVisible}
                status={() => exit(isVisible)}
            >
                <div className={s.popup_cont}>
                    <h2 className={`center`}>Вход</h2>
                    {isErrLog &&
                        <span>*неправильный логин или пароль</span>
                    }
                <div className={`${s.popupItem}`}>
                    <span>email</span>
                    <input
                        onChange={(e) => setNewObj({
                            ...newObj,
                            email: e.target.value
                        })}
                        value={newObj.email}
                        type={"email"}
                        placeholder={"email"}
                    />
                </div>
                    <div className={`${s.popupItem}`}>
                    <span>Пароль</span>
                    <input
                        onChange={(e) => setNewObj({
                            ...newObj,
                            password: e.target.value
                        })}
                        value={newObj.password}
                        type={"password"}
                        placeholder={"Пароль"}
                    />
                    </div>
                    <button onClick={()=>changeDef("reg")}>Перейти на регистрацию</button>
                    <button onClick={()=>login()}>Войти</button>
                </div>
            </Popup>
        );
    }
    if (statusP === "reg") {
        return (
            <Popup
                isVisible={isVisible}
                status={() => exit(isVisible)}
            >
                <div className={s.popup_cont}>
                    <h2>Регистрация</h2>
                    {isErrLog &&
                        <span>*Произошла ошибка. <br/>Возможно такой email уже существует.</span>
                    }
                    <div className={`${s.popupItem}`}>
                        <span>email</span>
                        <input
                            onChange={(e) => setNewObj({
                                ...newObj,
                                email: e.target.value
                            })}
                            value={newObj.email}
                            type={"email"}
                            placeholder={"email"}
                        />
                    </div>
                    <div className={`${s.popupItem}`}>
                    <span>Имя</span>
                    <input
                        onChange={(e) => setNewObj({
                            ...newObj,
                            name: e.target.value
                        })}
                        value={newObj.name}
                        type={"name"}
                        placeholder={"Имя"}
                    />
                    </div>
                    <div className={`${s.popupItem}`}>
                    <span>Новый пароль</span>
                    <input
                        onChange={(e) => setNewObj({
                            ...newObj,
                            password: e.target.value
                        })}
                        value={newObj.password}
                        type={"password"}
                        placeholder={"Новый пароль"}
                    />
                    </div>
                    <div className={`${s.popupItem}`}>
                    <span>Повторите пароль</span>
                    <input
                        onChange={(e) => setNewObj({
                            ...newObj,
                            secondPassword: e.target.value
                        })}
                        value={newObj.secondPassword}
                        type={"password"}
                        placeholder={"Повторите пароль"}
                    />
                        {!correctSecondPassword() &&
                            <span>*пароль не совпадает</span>
                        }
                    </div>
                    <button onClick={()=>changeDef("login")}>Перейти на авторизаицию</button>
                    <button onClick={()=>registration()}>Зарегистрироваться</button>
                </div>
            </Popup>
        );
    }
}