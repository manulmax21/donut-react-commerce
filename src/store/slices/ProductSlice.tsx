import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Product} from '../types/types';
import {AxiosResponse} from "axios";

type Products = {
    products: any[],
    isLoading: boolean,
    response: Response
}
type Response = {
    status: number,
    message: string
}
const initialState: Products = {
    products: [],
    isLoading: false,
    response: {
        status: 0,
        message: ''
    }
}
export const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        fetchProduct(state) {
            state.isLoading = true;
        },
        fetchProductSuccess(
            state,
            action: PayloadAction<AxiosResponse<Product>>
        ) {
            state.isLoading = false;
            state.products = {
                ...action.payload.data
            };
            state.response = {
                status: action.payload.status,
                message: action.payload.statusText,
            };
        },
        fetchProductError(
            state,
            action: PayloadAction<AxiosResponse<Product>>
        ) {
            state.isLoading = false;
            state.response = {
                status: action.payload.status,
                message: action.payload.statusText,
            };
        },
    }
})

export default ProductSlice.reducer
