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
export const PageProductSlice = createSlice({
    name: 'page_product',
    initialState,
    reducers: {
        fetchPageProduct(state) {
            state.isLoading = true;
        },
        fetchPageProductSuccess(
            state,
            action: PayloadAction<AxiosResponse<Product>>
        ) {
            state.isLoading = false;
            state.products = {
                ...action.payload.data.products
            };
            state.totalItems = action.payload.data.totalItems;
            state.currentPage = action.payload.data.currentPage;
            state.totalPages = action.payload.data.totalPages;
            state.response = {
                status: action.payload.status,
                message: action.payload.statusText,
            };
        },
        fetchPageProductError(
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

export default PageProductSlice.reducer
