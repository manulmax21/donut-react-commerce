import React, {useEffect, useState} from "react";
import {fetchProduct} from "../store/thunks/fetchProduct";
import {useCustomDispatch, useCustomSelector} from "./store";
import {selectorProductData} from "../store/selectors";

interface Props {
    currentCategory, products, stateSort
}

export const useChangeCategory = (props: { currentCategory: string; products: any }) => {

}