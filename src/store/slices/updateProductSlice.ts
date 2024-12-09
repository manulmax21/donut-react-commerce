import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Product} from '../types/types';
import {AxiosResponse} from "axios";

type Products = {
    product: {},
    isLoading: boolean,
    response: Response
}
type Response = {
    status: number,
    message: string
}
const initialState: Products = {
    product: {},
    isLoading: false,
    response: {
        status: 0,
        message: ''
    }
}
export const updateProductSlice = createSlice({
    name: 'update_product',
    initialState,
    reducers: {
        fetchUpdateProduct(state) {
            state.isLoading = true;
        },
        fetchUpdateProductSuccess(
            state,
            action: PayloadAction<AxiosResponse<Product>>
        ) {
            state.isLoading = false;
            state.product = {
                ...action.payload.data
            };
            state.response = {
                status: action.payload.status,
                message: action.payload.statusText,
            };
        },
        fetchUpdateProductError(
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

export default updateProductSlice.reducer
