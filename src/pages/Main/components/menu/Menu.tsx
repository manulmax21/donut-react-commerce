import React from "react";
import s from "./menu.module.scss"
import fon_a from "../../../../assets/img/post_rek.png"

interface Props {

}

export const Menu = (props: Props) => {
    return (
        <>
            <div className={"container  pb-5"}>
                <div className={"col-xl-12 col-md-12 col-sm-12"}>
                    <div id="carouselExampleIndicators" className={"carousel slide"} data-bs-ride="carousel">
                        <div className={"carousel-indicators"}>
                            <button type={"button"} data-bs-target={"#carouselExampleIndicators"} data-bs-slide-to={"0"}
                                className={"active"} aria-current={"true"} aria-label={"Slide 1"}/>
                                                        <button type={"button"} data-bs-target={"#carouselExampleIndicators"} data-bs-slide-to={"1"}
                                aria-label={"Slide 2"}/>
                                                        <button type={"button"} data-bs-target={"#carouselExampleIndicators"} data-bs-slide-to={"2"}
                                aria-label={"Slide 3"}/>
                        </div>
                        <div className={"carousel-inner " + s.carouselInner}>
                            <div className={"carousel-item active"}>
                                <img src={fon_a} className={s.item_photo + " item_photo d-block w-100"} alt="..."/>
                            </div>
                            <div className={"carousel-item"}>
                                <img src={fon_a} className={s.item_photo + " item_photo d-block w-100"} alt="..."/>
                            </div>
                            <div className={"carousel-item"}>
                                <img src={fon_a} className={s.item_photo + " item_photo d-block w-100"} alt="..."/>
                            </div>
                        </div>
                        <button className={"carousel-control-prev"} type="button"
                                data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className={"carousel-control-prev-icon"} aria-hidden="true"/>
                            <span className={"visually-hidden"}>Previous</span>
                        </button>
                        <button className={"carousel-control-next"} type="button"
                                data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className={"carousel-control-next-icon"} aria-hidden="true"/>
                            <span className={"visually-hidden"}>Next</span>
                        </button>
                    </div>
                </div>
                <div className={"col mt-2"}>
                    <div className={"row"}>
                        <div className={"col-xl-6 col-md-6 col-sm-12 mt-md-2 mt-sm-2 mt-1"}>
                            <div className={s.carouselItem + " carousel-item active " + s.item_photo_card}>
                                <img src={fon_a} className={"item_photo d-block w-100"} alt="..."/>
                            </div>
                        </div>
                        <div className={"col-xl-6 col-md-6 col-sm-12 mt-md-2 mt-sm-2 mt-1"}>
                            <div className={s.carouselItem + " carousel-item active " + s.item_photo_card}>
                                <img src={fon_a} className={"item_photo d-block w-100"} alt="..."/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}