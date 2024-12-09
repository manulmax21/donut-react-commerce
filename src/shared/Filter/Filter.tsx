import React, {useEffect, useState} from "react";
import {FilterRange} from "./components/FilterRange";
import s from "./filter.module.scss"
import {Btn} from "../btn/Btn";

interface Props {
    setMaxPrice: (number) => number,
    setMinPrice: (number) => number,
    categories: Array<string>,
    currentCategory: string
}

export const Filter = ({setCategory, setMaxPrice, setMinPrice, categories, currentCategory, filter}: Props) => {
    const [categoryCase, setCategoryCase] = useState("all")
    const [range, setRange] = useState({maxPrice: 500, minPrice: 10})
    const changeCategory = (category) => {
        setCategoryCase(category)
        setCategory(category)
    }
    const rangeVal = (val) => {
        setRange({maxPrice: val.maxPrice, minPrice: val.minPrice})
    }
    const filterSort = () => {
        filter(range)
    }
    const filterSortVoid = () => {
        setCategoryCase("all")
        filter({maxPrice: "void", minPrice: "void"})
    }
    useEffect(() => {
        categories.map(c => c.toLowerCase())
    }, [categories])

    return (
        <div className={" filter"}>
            <div className={"accordion"} id="accordionPanelsStayOpenExample">
                <div className={s.accordion_item + " accordion-item"}>
                    <h2 className={" accordion-header"} id="panelsStayOpen-headingOne">
                        <button className={s.accordion_body + " accordion-button"} type="button" data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                                aria-controls="panelsStayOpen-collapseOne">
                            Категории
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className={"accordion-collapse collapse show"}
                         aria-labelledby="panelsStayOpen-headingOne">
                        <div
                            onClick={() => changeCategory("all")}
                            className={`${s.accordion_body} accordion-body ${categoryCase === "all" ? s.accordion_body_active : ''}`}
                        >
                            Все
                        </div>
                        {categories.map(c =>
                            <div onClick={() => changeCategory(c)}
                                 key={c}
                                 className={`${s.accordion_body} accordion-body ${categoryCase === c ? s.accordion_body_active : ''}`}
                            >
                                {`${c.charAt(0).toUpperCase()}${c.slice(1).toLowerCase()}`}
                            </div>
                        )}
                    </div>
                </div>
                <div className={s.accordion_item + " accordion-item"}>
                    <h2 className={"accordion-header"} id="panelsStayOpen-headingTwo">
                        <button className={s.accordion_button + " accordion-button"} type="button" data-bs-toggle="collapse"
                                data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false"
                                aria-controls="panelsStayOpen-collapseTwo">
                            Цена
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className={"accordion-collapse collapse show"}
                         aria-labelledby="panelsStayOpen-headingTwo">
                        <div className={"accordion-body"}>
                            <FilterRange
                                maxP={range.maxPrice}
                                minP={range.minPrice}
                                setVal={rangeVal}
                            />
                            <div className={`${s.btns_arias} row center`}>
                                <button className={`${s.btn} col-xl-12 col-md-12 mt-1 center`} onClick={() => filterSortVoid()}>сброс</button>
                                <button className={`${s.btn} col-xl-12 col-md-12 mt-1`} onClick={() => filterSort()}>фильтровать</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}