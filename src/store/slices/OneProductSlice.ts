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
export const OneProductSlice = createSlice({
    name: 'one_product',
    initialState,
    reducers: {
        fetchOneProduct(state) {
            state.isLoading = true;
        },
        fetchOneProductSuccess(
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
        fetchOneProductError(
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

export default OneProductSlice.reducer
