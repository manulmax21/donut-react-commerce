import {AppDispatch} from "../Store";
import {CurrentSlice} from "../slices/CurrentSlice";
import {AuthServes} from "../../services/AuthServes";

export const fetchCurrent =
    //(payload: string) => async (dispatch: AppDispatch) => {
    () => async (dispatch: AppDispatch) => {
        try {
            dispatch(CurrentSlice.actions.fetchCurrent());
            const res = await AuthServes.getCurrentAuth();
            if (res.status === 200) {
                dispatch(CurrentSlice.actions.fetchCurrentSuccess(res));
            } else {
                dispatch(CurrentSlice.actions.fetchCurrentError(res));
            }
        } catch (error) {
            console.log(error);
        }
    }