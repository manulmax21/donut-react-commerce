import {AppDispatch} from "../Store";
import {OrderServes} from "../../services/OrdersServes";
import {OrderSlice} from "../slices/OrderSlice";

export const fetchAddOrder =
    (body) => async (dispatch: AppDispatch) => {
        try {
            dispatch(OrderSlice.actions.fetchOrder());
            const res = await OrderServes.addOrder(body);
            if (res.status === 200) {
                dispatch(OrderSlice.actions.fetchOrderSuccess(res));
            } else {
                dispatch(OrderSlice.actions.fetchOrderError(res));
            }
        } catch (error) {
            console.log(error);
        }
    }
export const fetchGetOrder =
    (body) => async (dispatch: AppDispatch) => {
        try {
            dispatch(OrderSlice.actions.fetchOrder());
            const res = await OrderServes.getOrder(body);
            if (res.status === 200) {
                dispatch(OrderSlice.actions.fetchOrderSuccess(res));
            } else {
                dispatch(OrderSlice.actions.fetchOrderError(res));
            }
        } catch (error) {
            console.log(error);
        }
    }
export const fetchRemoveOrder =
    (id) => async (dispatch: AppDispatch) => {
        try {
            dispatch(OrderSlice.actions.fetchOrder());
            const res = await OrderServes.removeOrder(id);
            if (res.status === 200) {
                dispatch(OrderSlice.actions.fetchOrderSuccess(res));
            } else {
                dispatch(OrderSlice.actions.fetchOrderError(res));
            }
        } catch (error) {
            console.log(error);
        }
    }
