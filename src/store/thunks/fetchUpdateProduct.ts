import {AppDispatch} from "../Store";
import {updateProductSlice} from "../slices/updateProductSlice";
import {ProductServes} from "../../services/ProductServes";

export const fetchUpdateNameProduct =
    (body) => async (dispatch: AppDispatch) => {
        try {
            dispatch(updateProductSlice.actions.fetchUpdateProduct());
            const res = await ProductServes.updateNameProduct(body);
            if (res.status === 200) {
                dispatch(updateProductSlice.actions.fetchUpdateProductSuccess(res));
            } else {
                dispatch(updateProductSlice.actions.fetchUpdateProductError(res));
            }
        } catch (error) {
            console.log(error);
        }
    }
export const fetchUpdateCategoryProduct =
    (body) => async (dispatch: AppDispatch) => {
        try {
            dispatch(updateProductSlice.actions.fetchUpdateProduct());
            const res = await ProductServes.updateCategoryProduct(body);
            if (res.status === 200) {
                dispatch(updateProductSlice.actions.fetchUpdateProductSuccess(res));
            } else {
                dispatch(updateProductSlice.actions.fetchUpdateProductError(res));
            }
        } catch (error) {
            console.log(error);
        }
    }
export const fetchUpdatePriceProduct =
    (body) => async (dispatch: AppDispatch) => {
        try {
            dispatch(updateProductSlice.actions.fetchUpdateProduct());
            const res = await ProductServes.updatePriceProduct(body);
            if (res.status === 200) {
                dispatch(updateProductSlice.actions.fetchUpdateProductSuccess(res));
            } else {
                dispatch(updateProductSlice.actions.fetchUpdateProductError(res));
            }
        } catch (error) {
            console.log(error);
        }
    }
export const fetchUpdateCountProduct =
    (body) => async (dispatch: AppDispatch) => {
        try {
            dispatch(updateProductSlice.actions.fetchUpdateProduct());
            const res = await ProductServes.updateCountProduct(body);
            if (res.status === 200) {
                dispatch(updateProductSlice.actions.fetchUpdateProductSuccess(res));
            } else {
                dispatch(updateProductSlice.actions.fetchUpdateProductError(res));
            }
        } catch (error) {
            console.log(error);
        }
    }