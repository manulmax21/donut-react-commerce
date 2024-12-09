import React, {useEffect, useState} from "react";
import img from '../../../assets/img/p1.jpg'
import s from './stylesCompSettings.module.scss'
import {LoginReg} from "./loginReg";
import {Loading} from "../../Loading/Loading";
import {useCustomDispatch, useCustomSelector} from "../../../hooks/store";
import {selectorCurrentData} from "../../../store/selectors";
import {fetchCurrent} from "../../../store/thunks/fetchCurrent";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import {Link} from "react-router-dom"
import useCookie from "../../../hooks/useCookie";

interface Props {

}

export const ProfileSettingsComponent = (props: Props) => {
    const [isLogin, setIsLogin] = useState(false)
    const [isLoad, setIsLoad] = useState(false)
    const [isLoadStatus, setIsLoadStatus] = useState('login')
    const [data, setData] = useState({})
    const [sentObj, setSentObj] = useState({})
    const {removeCookie} = useCookie()
    const dispatch = useCustomDispatch()
    const {user} = useCustomSelector(
        selectorCurrentData
    )
    const exitLog = (status) => {
        setIsLogin(!status)
    }
    const load = (newOb) => {
        setIsLoad(true)
        setSentObj(newOb)
    }
    useEffect(() => {
        dispatch(fetchCurrent())
    }, [])
    const loadData = (data) => {
        setData(data)
        setIsLoad(false)
        window.location.reload()
    }
    const changeStatus = (s) => {
      setIsLoadStatus(s)
    }
    const unlog = () => {
        removeCookie("token")
        window.location.reload()
    }

    return (
        <>
            {!isLoad &&
                <div className="profile">
                    {isLogin &&
                        <LoginReg
                            changeStatus={changeStatus}
                            load={load}
                            status={isLoadStatus}
                            exit={exitLog}
                        />
                    }
                    <div className="row">
                        <div className={"col-12 profile_img_body " + s.profile_img_body}>
                            <div className={s.profile_img}>
                                <img src={img}/>
                            </div>
                        </div>
                        <div className="col-12 text-center">
                            <h2 className={s.txt}>{user.name}</h2>
                        </div>
                        <div className="col-12">
                            <div className={s.list_group + " list-group"}>
                                <button type="button"
                                        onClick={() => setIsLogin(!isLogin)}
                                        className="list-group-item list-group-item-action">Войти в другой аккаунт
                                </button>
                                <Link to={"/settings/profile"}>
                                    <button
                                        type="button"
                                        className="list-group-item list-group-item-action"
                                    >
                                        Настройки профиля
                                    </button>
                                </Link>

                                <button
                                    onClick={unlog}
                                    type="button"
                                    className="list-group-item list-group-item-action text-danger"
                                >
                                    Выйти
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {isLoad &&
                <Loading
                    state={loadData}
                    status={isLoadStatus}
                    body={sentObj}
                />
            }
        </>

    );
}