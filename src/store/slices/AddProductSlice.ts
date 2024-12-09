import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Product} from '../types/types';
import {AxiosResponse} from "axios";

type Products = {
    newProduct: {},
    isLoading: boolean,
    response: Response
}
type Response = {
    status: number,
    message: string
}
const initialState: Products = {
    newProduct: {},
    isLoading: false,
    response: {
        status: 0,
        message: ''
    }
}
export const AddProductSlice = createSlice({
    name: 'add_product',
    initialState,
    reducers: {
        fetchAddProduct(state) {
            state.isLoading = true;
        },
        fetchAddProductSuccess(
            state,
            action: PayloadAction<AxiosResponse<Product>>
        ) {
            state.isLoading = false;
            state.newProduct = {
                ...action.payload.data
            };
            state.response = {
                status: action.payload.status,
                message: action.payload.statusText,
            };
        },
        fetchAddProductError(
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

export default AddProductSlice.reducer
