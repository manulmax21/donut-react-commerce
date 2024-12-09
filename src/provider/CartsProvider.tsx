import {ReactNode, useEffect, useReducer} from "react";
import {CartContext} from "../context/CartContext";
import {useCustomDispatch, useCustomSelector} from "../hooks/store";
import {selectorCartData} from "../store/selectors";
import {fetchGetCart} from "../store/thunks/fetchCart";

interface Props {
    children: ReactNode
}
interface State {
    cartCount: any;
}
interface Action {
    type?: string;
    payload?: number;
}
const RELOAD = 'RELOAD'
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case RELOAD: return {...state, cartCount: action.payload}
        default: return state
    }
}
export const CartsProvider = ({children, ...props}: Props) => {
    const [state, dispatch] = useReducer(reducer, {
        cartCount: 0
    });
    const dispatchCustom = useCustomDispatch()
    const {
        carts
    } = useCustomSelector(
        selectorCartData
    )

    useEffect(() => {
        dispatchCustom(fetchGetCart());
    }, [dispatchCustom]);

    useEffect(() => {
        dispatch({type: RELOAD, payload: Object.values(carts).length});
    }, [carts]);

    const reloadCart = () => {
        dispatchCustom(fetchGetCart())
        dispatch({type: RELOAD, payload: Object.values(carts).length})
    }


    return(
        <CartContext.Provider
            value={{
                cartCount: state.cartCount,
                reloadCart
            }}
            {...props}
        >
            {children}
        </CartContext.Provider>
    );
}