import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Cart} from '../types/types';
import {AxiosResponse} from "axios";

type Carts = {
    carts: any[],
    isLoading: boolean,
    response: Response
}
type Response = {
    status: number,
    message: string
}
const initialState: Carts = {
    carts: [],
    isLoading: false,
    response: {
        status: 0,
        message: ''
    }
}
export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        fetchCart(state) {
            state.isLoading = true;
        },
        fetchCartSuccess(
            state,
            action: PayloadAction<AxiosResponse<Cart>>
        ) {
            state.isLoading = false;
            state.carts = {
                ...action.payload.data
            };
            state.response = {
                status: action.payload.status,
                message: action.payload.statusText,
            };
        },
        fetchCartError(
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

export default CartSlice.reducer
