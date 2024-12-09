import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User as IUser} from '../types/types';
import {AxiosResponse} from "axios";
import useCookie from "../../hooks/useCookie";

type User = {
    userReg: Object,
    isLoading: boolean,
    response: Response
}
type Response = {
    status: number,
    message: string
}
const initialState: User = {
    userReg: {},
    isLoading: false,
    response: {
        status: 0,
        message: ''
    }
}
const {setCookie, getCookie} = useCookie()
export const RegSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        fetchReg(state) {
            state.isLoading = true;
        },
        fetchRegSuccess(
            state,
            action: PayloadAction<AxiosResponse<IUser>>
        ) {
            state.isLoading = false;
            state.userReg = {
                ...action.payload.data
            };
            if (state.userReg.token) {
                setCookie("token", state.userReg.token, 1500)
            }
            state.response = {
                status: action.payload.status,
                message: action.payload.message,
            };
        },
        fetchRegError(
            state,
            action: PayloadAction<AxiosResponse<IUser>>
        ) {
            state.isLoading = false;
            state.response = {
                status: action.payload.status,
                message: action.payload.message,
            };
        },
    }
})

export default RegSlice.reducer
