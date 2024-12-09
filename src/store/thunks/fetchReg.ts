import {AppDispatch} from "../Store";
import {WeatherServes} from "../../services/WeatherServes";
import {currentWeatherSlice} from "../slices/currentWeatherSlice";
import {RegSlice} from "../slices/RegSlice";
import {ProductServes} from "../../services/ProductServes";
import {AuthServes} from "../../services/AuthServes";

export const fetchReg =
    //(payload: string) => async (dispatch: AppDispatch) => {
    (body) => async (dispatch: AppDispatch) => {
        try {
            dispatch(RegSlice.actions.fetchReg());
            const res = await AuthServes.postRegAuth(body);
            if (res.status === 201) {
                dispatch(RegSlice.actions.fetchRegSuccess(res));
            } else {
                dispatch(RegSlice.actions.fetchRegError(res));
            }
        } catch (error) {
            console.log(error);
        }
    }