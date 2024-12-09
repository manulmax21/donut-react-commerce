import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Product} from '../types/types';
import {AxiosResponse} from "axios";

type User = {
    user: {},
    isLoading: boolean,
    response: Response
}
type Response = {
    status: number,
    message: string
}
const initialState: User = {
    user: {},
    isLoading: false,
    response: {
        status: 0,
        message: ''
    }
}
export const updateUserSlice = createSlice({
    name: 'update_user',
    initialState,
    reducers: {
        fetchUpdateUser(state) {
            state.isLoading = true;
        },
        fetchUpdateUserSuccess(
            state,
            action: PayloadAction<AxiosResponse<Product>>
        ) {
            state.isLoading = false;
            state.user = {
                ...action.payload.data
            };
            state.response = {
                status: action.payload.status,
                message: action.payload.statusText,
            };
        },
        fetchUpdateUserError(
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

export default updateUserSlice.reducer
