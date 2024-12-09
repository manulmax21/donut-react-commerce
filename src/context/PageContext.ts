import {createContext} from "react";

interface Props{
    pageCount: number,
    changePage: (page) => void
}

export const PageContext = createContext<Props>({
    pageCount: 1,
    changePage: page => {}
})