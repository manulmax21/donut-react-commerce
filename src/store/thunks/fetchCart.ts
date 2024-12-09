import {AppDispatch} from "../Store";
import {CartSlice} from "../slices/CartSlice";
import {CartServes} from "../../services/CartServes";

export const fetchAddCart =
    (body) => async (dispatch: AppDispatch) => {
        try {
            dispatch(CartSlice.actions.fetchCart());
            const res = await CartServes.addCart(body);
            if (res.status === 200) {
                dispatch(CartSlice.actions.fetchCartSuccess(res));
            } else {
                dispatch(CartSlice.actions.fetchCartError(res));
            }
        } catch (error) {
            console.log(error);
        }
    }
export const fetchGetCart =
    () => async (dispatch: AppDispatch) => {
        try {
            dispatch(CartSlice.actions.fetchCart());
            const res = await CartServes.getCarts();
            if (res.status === 200) {
                dispatch(CartSlice.actions.fetchCartSuccess(res));
            } else {
                dispatch(CartSlice.actions.fetchCartError(res));
            }
        } catch (error) {
            console.log(error);
        }
    }
export const fetchRemoveCart =
    (id) => async (dispatch: AppDispatch) => {
        try {
            dispatch(CartSlice.actions.fetchCart());
            const res = await CartServes.removeOneCart(id);
            if (res.status === 200) {
                dispatch(CartSlice.actions.fetchCartSuccess(res));
            } else {
                dispatch(CartSlice.actions.fetchCartError(res));
            }
        } catch (error) {
            console.log(error);
        }
    }
export const fetchRemoveAllCart =
    () => async (dispatch: AppDispatch) => {
        try {
            dispatch(CartSlice.actions.fetchCart());
            const res = await CartServes.removeAllCart();
            if (res.status === 200) {
                dispatch(CartSlice.actions.fetchCartSuccess(res));
            } else {
                dispatch(CartSlice.actions.fetchCartError(res));
            }
        } catch (error) {
            console.log(error);
        }
    }