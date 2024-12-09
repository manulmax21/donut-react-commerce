import {createContext} from "react";

interface Props {
    cartCount: any,
    reloadCart: () => void
}
export const CartContext = createContext<Props>({
    cartCount: 0,
    reloadCart: () => {}
})