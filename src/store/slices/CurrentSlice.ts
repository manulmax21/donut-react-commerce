import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User as IUser} from '../types/types';
import {AxiosResponse} from "axios";

type User = {
    user: Object,
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
export const CurrentSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        fetchCurrent(state) {
            state.isLoading = true;
        },
        fetchCurrentSuccess(
            state,
            action: PayloadAction<AxiosResponse<IUser>>
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
        fetchCurrentError(
            state,
            action: PayloadAction<AxiosResponse<IUser>>
        ) {
            state.isLoading = false;
            state.response = {
                status: action.payload.status,
                message: action.payload.statusText,
            };
        },
    }
})

export default CurrentSlice.reducer
