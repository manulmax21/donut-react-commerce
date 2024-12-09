import React from "react";
import {ThemeProvider} from "./ThemeProvider";
import {CartsProvider} from "./CartsProvider";
import {PageProvider} from "./PageProvider";

interface Props {

}

export const ContextProvider = ({children}: Props) => {
    return (
        <CartsProvider>
            <ThemeProvider>
                <PageProvider>
                    {children}
                </PageProvider>
            </ThemeProvider>
        </CartsProvider>
    );
}