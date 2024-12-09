import {combineReducers, configureStore} from "@reduxjs/toolkit";
import ProductSliceReducer from "./slices/ProductSlice";
import LoginSliceReducer from "./slices/LoginSlice";
import RegSliceReducer from "./slices/RegSlice";
import CurrentSliceReducer from "./slices/CurrentSlice";
import OneProductSliceReducer from "./slices/OneProductSlice";
import AddProductSliceReducer from "./slices/AddProductSlice";
import RemoveProductSliceReducer from "./slices/RemoveProductSlice";
import PageProductSliceReducer from "./slices/PageProductSlice";
import CartSliceReducer from "./slices/CartSlice";
import OrderSliceReducer from "./slices/OrderSlice";
import UpdateProductSlice from "./slices/updateProductSlice";
import UpdateUserSlice from "./slices/updateUserSlice";

const rootReducer = combineReducers({
    ProductSliceReducer,
    LoginSliceReducer,
    RegSliceReducer,
    CurrentSliceReducer,
    OneProductSliceReducer,
    AddProductSliceReducer,
    RemoveProductSliceReducer,
    PageProductSliceReducer,
    CartSliceReducer,
    OrderSliceReducer,
    UpdateProductSlice,
    UpdateUserSlice
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = typeof store
export type AppDispatch = AppStore['dispatch']
