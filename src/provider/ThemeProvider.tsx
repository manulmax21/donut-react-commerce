import {ReactNode, useReducer, useState} from "react";
import {Theme, ThemeContext} from "../context/ThemeContext";
import {changeCssRootVariables} from "../model/ChangeCssRootVariables";
import {storage} from "../model/Storage";

interface Props {
    children: ReactNode
}
interface State {
    theme: string
}
const SET_THEME = 'SET_THEME'
const reducer = (state: State, action) => {
    switch (action.type) {
        case SET_THEME: return {...state, theme: action.payload}
        default: return state
    }
}
export const ThemeProvider = ({children, ...props}: Props) => {
    const [state, dispatch] = useReducer<Theme>(reducer, {
        theme: storage.getItem('theme') || Theme.LIGHT
    })
    changeCssRootVariables(state.theme)
    const changeTheme = (theme: Theme) => {
        storage.setItem('theme', theme)
        dispatch({type: SET_THEME, payload: theme})
        changeCssRootVariables(theme)
    }

    
    return(
        <ThemeContext.Provider
            value={{
                theme: state.theme,
                changeTheme
            }}
            {...props}
        >
            {children}
        </ThemeContext.Provider>
    );
}