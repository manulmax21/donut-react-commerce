import React, {ChangeEvent, useEffect, useMemo, useState} from "react";
import s from "./filterRange.module.scss"
import {Btn} from "../../btn/Btn";

interface Props {
    setVal: (any) => any
}

export const FilterRange = ({setVal, maxP, minP}: Props) => {
    const [maxPrice, setMaxPrice] = useState(maxP);
    const [minPrice, setMinPrice] = useState(minP);

    useEffect(() => {
        const rangeInput = document.querySelectorAll(".range-input input");
        const priceInput = document.querySelectorAll(".price-input input");
        const range = document.querySelector(".slider .progress");
        let priceGap = 1000;

        const updateSlider = () => {
            rangeInput[0].value = minPrice;
            rangeInput[1].value = maxPrice;
            range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
            range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            priceInput[0].value = minPrice;
            priceInput[1].value = maxPrice;
        };
        setVal({minPrice, maxPrice})
        updateSlider();
    }, [minPrice, maxPrice]);
    useEffect(() => {
        if (minPrice > maxPrice) {
            setMaxPrice(minPrice)
        }
    }, [minPrice])
    useEffect(() => {
        if (minPrice > maxPrice) {
            setMinPrice(maxPrice)
        }
    }, [maxPrice])
    const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(parseInt(e.target.value), maxPrice - 1);
        setMinPrice(value);
    };

    const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(parseInt(e.target.value), minPrice + 1);
        setMaxPrice(value);
    };

    return (
        <div className={s.range_body}>
            <div className={`${s.price_input} price-input`}>
                <div className={`${s.field} field`}>
                    <input
                        type="number"
                        className={`${s.input} input-min`}
                        onChange={handleMinPriceChange}
                        value={minPrice}
                    />
                </div>
                <div className={`${s.separator} separator`} />
                <div className={`${s.field} field`}>
                    <input
                        type="number"
                        className={`${s.input} input-max`}
                        onChange={handleMaxPriceChange}
                        value={maxPrice}
                    />
                </div>
            </div>
            <div className={`${s.slider} slider`}>
                <div className={`${s.progress} progress`} />
            </div>
            <div className={`${s.range_input} range-input`}>
                <input
                    type="range"
                    className={`${s.input} ${s.range_input} range-min`}
                    min="0"
                    max="2000"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setMinPrice(parseInt(e.target.value));
                    }}
                    value={minPrice}
                    step="1"
                />
                <input
                    type="range"
                    className={`${s.input} range-max`}
                    min="0"
                    max="2000"
                    value={maxPrice}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setMaxPrice(parseInt(e.target.value));
                    }}
                    step="1"
                />
            </div>
        </div>
    );
}