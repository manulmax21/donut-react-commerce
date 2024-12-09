import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Cart} from '../types/types';
import {AxiosResponse} from "axios";

type Orders = {
    orders: any,
    isLoading: boolean,
    response: Response
}
type Response = {
    status: number,
    message: string
}
const initialState: Orders = {
    orders: [],
    isLoading: false,
    response: {
        status: 0,
        message: ''
    }
}
export const OrderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        fetchOrder(state) {
            state.isLoading = true;
        },
        fetchOrderSuccess(
            state,
            action: PayloadAction<AxiosResponse<Cart>>
        ) {
            state.isLoading = false;
            state.orders = {
                ...action.payload.data
            };
            state.response = {
                status: action.payload.status,
                message: action.payload.statusText,
            };
        },
        fetchOrderError(
            state,
            action: PayloadAction<AxiosResponse<Cart>>
        ) {
            state.isLoading = false;
            state.response = {
                status: action.payload.status,
                message: action.payload.statusText,
            };
        },
    }
})

export default OrderSlice.reducer
