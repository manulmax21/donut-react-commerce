import {AppDispatch} from "../Store";
import {ProductSlice} from "../slices/ProductSlice";
import {ProductServes} from "../../services/ProductServes";

export const fetchRemoveProduct =
    //(payload: string) => async (dispatch: AppDispatch) => {
    (id) => async (dispatch: AppDispatch) => {
        try {
            dispatch(ProductSlice.actions.fetchProduct());
            const res = await ProductServes.removeProduct(id);
            if (res.status === 200) {
                dispatch(ProductSlice.actions.fetchProductSuccess(res));
            } else {
                dispatch(ProductSlice.actions.fetchProductError(res));
            }
        } catch (error) {
            console.log(error);
        }
    }