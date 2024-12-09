import {RootState} from "./Store";

export const selectorProductData = (state: RootState) =>
    state.ProductSliceReducer;
export const selectorLoginData = (state: RootState) =>
    state.LoginSliceReducer;
export const selectorRegData = (state: RootState) =>
    state.RegSliceReducer;
export const selectorCurrentData = (state: RootState) =>
    state.CurrentSliceReducer;
export const selectorOneProductData = (state: RootState) =>
    state.OneProductSliceReducer;
export const selectorAddProductData = (state: RootState) =>
    state.AddProductSliceReducer;
export const selectorRemoveProductData = (state: RootState) =>
    state.RemoveProductSliceReducer;
export const selectorPageProductData = (state: RootState) =>
    state.PageProductSliceReducer;
export const selectorCartData = (state: RootState) =>
    state.CartSliceReducer;
export const selectorOrderData = (state: RootState) =>
    state.OrderSliceReducer;
