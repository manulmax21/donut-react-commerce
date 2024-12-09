import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User as IUser} from '../types/types';
import {AxiosResponse} from "axios";
import useCookie from "../../hooks/useCookie";

type User = {
    userLogin: Object,
    isLoading: boolean,
    response: Response
}
type Response = {
    status: number,
    message: string
}
const initialState: User = {
    userLogin: {},
    isLoading: false,
    response: {
        status: 0,
        message: ''
    }
}
const {setCookie, getCookie} = useCookie()
export const LoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        fetchLogin(state) {
            state.isLoading = true;
        },
        fetchLoginSuccess(
            state,
            action: PayloadAction<AxiosResponse<IUser>>
        ) {
            state.isLoading = false;
            state.userLogin = {
                ...action.payload.data
            };
            if (state.userLogin.token) {
                setCookie("token", state.userLogin.token, 1500)
            }
            state.response = {
                status: action.payload.status,
                message: action.payload.statusText,
            };
        },
        fetchLoginError(
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

export default LoginSlice.reducer
