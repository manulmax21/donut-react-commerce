import {AppDispatch} from "../Store";
import {ProductServes} from "../../services/ProductServes";
import {PageProductSlice} from "../slices/PageProductSlice";

export const fetchPageProduct =
    //(payload: string) => async (dispatch: AppDispatch) => {
    (page) => async (dispatch: AppDispatch) => {
        try {
            dispatch(PageProductSlice.actions.fetchPageProduct());
            const res = await ProductServes.getPageProduct(page);
            if (res.status === 200) {
                dispatch(PageProductSlice.actions.fetchPageProductSuccess(res));
            } else {
                dispatch(PageProductSlice.actions.fetchPageProductError(res));
            }
        } catch (error) {
            console.log(error);
        }
    }