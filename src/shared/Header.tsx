import React from "react";
import s from './Header.module.scss'
import {GlobalSvgSelector} from "../assets/icons/global/GlobalSvgSelector";
import icon_pf from '../assets/img/pf1.png'
import {useTheme} from "../hooks/useTheme";
import {Theme} from "../context/ThemeContext";
import { Link } from 'react-router-dom';
import {useCartContext} from "../hooks/useCartContext";

export const Header = () => {
    const themeObj = useTheme()
    const cartCount = useCartContext()

    const colourStyles = {
        control: (styles: any) => ({
            ...styles,
            backgroundColor: themeObj.theme=== Theme.DARK ? '#4f4F4F' : 'rgba(71, 147, 255, .2)',
            width: '154px',
            height: '37px',
            border: 'none',
            borderRadius: '10px',
            zIndex: 3
        }),
        singleValue: (styles: any) => ({
            ...styles,
            color: themeObj.theme=== Theme.DARK ? '#fff' : '#000'
        })
    }

    const changeTheme = () => {
        themeObj.changeTheme(themeObj.theme === Theme.DARK ? Theme.LIGHT : Theme.DARK)
    }

    return (
        <nav className={"navbar navbar-light " + s.nav_h + " " + s.bg_grad34}>
            <div className={"navbar-brand " + s.cont}>
                <div className={"container " + s.cont}>
                    <div className="logo">
                        <Link to={"/"}>
                            <img src={icon_pf} className={"d-inline-block align-top " + s.img}/>
                        </Link>
                    </div>
                    <div className={s.nav}>
                        <Link to={"/"}>
                            <div className={s.wrapper + ' ' + s.change_theme   + ' ' + s.lxicon}>
                                <i className="fi fi-rr-shop"/>
                                Главная
                            </div>
                        </Link>
                        <Link to={"/catalog"}>
                            <div className={s.wrapper + ' ' + s.change_theme   + ' ' + s.lxicon}>
                                <i className="fi fi-rr-list"/>
                                Каталог
                            </div>
                        </Link>
                        <Link to={"/cart"}>
                            <div className={s.wrapper + ' ' + s.change_theme   + ' ' + s.lxicon}>
                                <i className="fi fi-rr-shopping-cart"/>
                                Корзина {cartCount.cartCount}
                            </div>
                        </Link>
                        <Link to={"/settings"}>
                            <div className={s.wrapper + ' ' + s.change_theme  + ' ' + s.lxicon}>
                                <i className="fi fi-rr-settings"/>
                                Настройки
                            </div>
                        </Link>
                        <div onClick={changeTheme} className={s.wrapper + ' ' + s.change_theme  + ' ' + s.lxicon + ' ' + s.div_icon}>
                            <GlobalSvgSelector id={'change-theme'}/>
                            Поменять тему
                        </div>
                        <button
                            type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Переключатель навигации"
                            className={s.wrapper + ' ' + s.change_theme + ' ' + s.burger + ' ' + s.div_icon }
                        >
                            <i className="fi fi-br-menu-burger"/>
                        </button>
                    </div>
                </div>

            </div>
            <div className={`collapse navbar-collapse ${s.nav__mob__main}`} id="navbarTogglerDemo01">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <Link to={"/main"} className={`nav-item ${s.nav_item_mob}`}>
                        <div aria-current="page" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" className={s.wrapper + ' ' + s.navLink + ' nav-link active' + s.change_theme   + ' ' + s.lxicon}>
                            <i className="fi fi-rr-shop"/>
                            Главная
                        </div>
                    </Link>
                    <Link className={`nav-item ${s.nav_item_mob}`} to={"/catalog"}>
                        <div data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" className={s.wrapper + ' ' + s.navLink + ' nav-link active' + s.change_theme   + ' ' + s.lxicon}>
                            <i className="fi fi-rr-list"/>
                            Каталог
                        </div>
                    </Link>
                    <Link className={`nav-item ${s.nav_item_mob}`} to={"/cart"}>
                        <div data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" className={s.wrapper + ' ' + s.navLink + ' nav-link active' + s.change_theme   + ' ' + s.lxicon}>
                            <i className="fi fi-rr-shopping-cart"/>
                            Корзина {cartCount.cartCount}
                        </div>
                    </Link>
                    <Link className={`nav-item ${s.nav_item_mob}`} to={"/settings"}>
                        <div data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" className={s.wrapper + ' ' + s.navLink + ' nav-link active' + s.change_theme  + ' ' + s.lxicon}>
                            <i className="fi fi-rr-settings"/>
                            Настройки
                        </div>
                    </Link>
                    <div className={`${s.nav_item_mob}`}>
                        <div onClick={changeTheme} className={s.wrapper + ' ' + s.navLink + ' nav-item nav-link active' + s.change_theme  + ' ' + s.lxicon + ' ' + s.div_icon}>
                            <i
                                className=
                                    "fi fi-rr-moon"
                            />
                            Поменять тему
                        </div>
                    </div>
                </ul>
            </div>
        </nav>
    );
}