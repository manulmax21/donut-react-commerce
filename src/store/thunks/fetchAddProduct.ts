import {AppDispatch} from "../Store";
import {ProductServes} from "../../services/ProductServes";
import {AddProductSlice} from "../slices/AddProductSlice";

export const fetchAddProduct =
    //(payload: string) => async (dispatch: AppDispatch) => {
    (data) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AddProductSlice.actions.fetchAddProduct());
            const res = await ProductServes.addProduct(data);
            if (res.status === 200) {
                dispatch(AddProductSlice.actions.fetchAddProductSuccess(res));
            } else {
                dispatch(AddProductSlice.actions.fetchAddProductError(res));
            }
        } catch (error) {
            console.log(error);
        }
    }