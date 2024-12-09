import {AppDispatch} from "../Store";
import {WeatherServes} from "../../services/WeatherServes";
import {currentWeatherSlice} from "../slices/currentWeatherSlice";
import {LoginSlice} from "../slices/LoginSlice";
import {ProductServes} from "../../services/ProductServes";
import {AuthServes} from "../../services/AuthServes";

export const fetchLogin =
    (body) => async (dispatch: AppDispatch) => {
        try {
            dispatch(LoginSlice.actions.fetchLogin());
            const res = await AuthServes.postLoginAuth(body);
            if (res.status === 200) {
                dispatch(LoginSlice.actions.fetchLoginSuccess(res));
            } else {
                dispatch(LoginSlice.actions.fetchLoginError(res));
            }
        } catch (error) {
            console.log(error);
        }
    }