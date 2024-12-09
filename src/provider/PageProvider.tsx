import {ReactNode, useEffect, useReducer} from "react";
import {PageContext} from "../context/PageContext";
import {useCustomDispatch, useCustomSelector} from "../hooks/store";
import {selectorCartData, selectorPageProductData} from "../store/selectors";
import {fetchGetCart} from "../store/thunks/fetchCart";
import {fetchPageProduct} from "../store/thunks/fetchPageProduct";
import {customSessionStorage} from "../model/SessionStorage";

interface Props {
    children: ReactNode
}
interface State {
    pageCount: any;
}
interface Action {
    type?: string;
    payload?: number;
}
const RELOAD = 'RELOAD'
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case RELOAD: return {...state, pageCount: action.payload}
        default: return state
    }
}
export const PageProvider = ({children, ...props}: Props) => {
    const [state, dispatch] = useReducer(reducer, {
        pageCount: customSessionStorage.getItem("pageCount") || 0
    });
    const dispatchCustom = useCustomDispatch()
    // const {
    //     totalItems,
    //     currentPage,
    //     totalPages
    // } = useCustomSelector(
    //     selectorPageProductData
    // )

    // useEffect(() => {
    //     dispatchCustom(fetchPageProduct(1));
    // }, [dispatchCustom]);

    // useEffect(() => {
    //     dispatch({type: RELOAD, payload: pageCount});
    // }, [page]);

    const changePage = (count) => {
        dispatchCustom(fetchGetCart())
        customSessionStorage.setItem("pageCount", count)
        dispatch({type: RELOAD, payload: count})
    }


    return(
        <PageContext.Provider
            value={{
                pageCount: state.pageCount,
                changePage
            }}
            {...props}
        >
            {children}
        </PageContext.Provider>
    );
}