import React, {useEffect, useState} from "react";
import {Cart} from "../../Cart/Cart";
import {useCustomDispatch, useCustomSelector} from "../../../hooks/store";
import {fetchRemoveCart} from "../../../store/thunks/fetchCart";
import {fetchProduct} from "../../../store/thunks/fetchProduct";
import {selectorPageProductData, selectorProductData} from "../../../store/selectors";
import {ProductItemSeting} from "./product-item/product-item-seting";
import {Loading} from "../../Loading/Loading";

interface Props {

}

export const ProductsSettingsComponent = (props: Props) => {
    const dispatch = useCustomDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const {products} = useCustomSelector(
        selectorProductData
    )
    useEffect(() => {
        setIsLoading(true)
        dispatch(fetchProduct())
    }, [])
    const loadedData = () => {
      setIsLoading(false)
    }
    return (
        <div className={"row mb-4"}>
            {!isLoading ?
                <>
                    {Object.values(products).map(product =>
                        <div key={product.id} className={"col-lx-3 col-md-4 col-sm-12"}>
                            <ProductItemSeting product={product}/>
                        </div>
                    )}
                </>
            :
                <div className={`row`}>
                    <Loading
                        state={loadedData}
                        status={"void"}
                        body={{}}
                    />
                </div>
            }

        </div>
    );
}