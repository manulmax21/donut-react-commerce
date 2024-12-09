import {AppDispatch} from "../Store";
import {ProductServes} from "../../services/ProductServes";
import {OneProductSlice} from "../slices/OneProductSlice";

export const fetchOneProduct =
    //(payload: string) => async (dispatch: AppDispatch) => {
    (id) => async (dispatch: AppDispatch) => {
        try {
            dispatch(OneProductSlice.actions.fetchOneProduct());
            const res = await ProductServes.getOneProduct(id);
            if (res.status === 200) {
                dispatch(OneProductSlice.actions.fetchOneProductSuccess(res));
            } else {
                dispatch(OneProductSlice.actions.fetchOneProductError(res));
            }
        } catch (error) {
            console.log(error);
        }
    }