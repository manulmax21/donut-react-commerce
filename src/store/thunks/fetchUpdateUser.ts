import {AppDispatch} from "../Store";
import {updateUserSlice} from "../slices/updateUserSlice";
import {AuthServes} from "../../services/AuthServes";

export const fetchUpdateNameUser =
    (body) => async (dispatch: AppDispatch) => {
        try {
            dispatch(updateUserSlice.actions.fetchUpdateUser());
            const res = await AuthServes.updateNameAuth(body);
            if (res.status === 200) {
                dispatch(updateUserSlice.actions.fetchUpdateUserSuccess(res));
            } else {
                dispatch(updateUserSlice.actions.fetchUpdateUserError(res));
            }
        } catch (error) {
            console.log(error);
        }
    }
export const fetchUpdatePasswordUser =
    (body) => async (dispatch: AppDispatch) => {
        try {
            dispatch(updateUserSlice.actions.fetchUpdateUser());
            const res = await AuthServes.updatePasswordAuth(body);
            if (res.status === 200) {
                dispatch(updateUserSlice.actions.fetchUpdateUserSuccess(res));
            } else {
                dispatch(updateUserSlice.actions.fetchUpdateUserError(res));
            }
        } catch (error) {
            console.log(error);
        }
    }
