import {useContext} from "react";
import {PageContext} from "../context/PageContext";

export const usePageContext = () => useContext(PageContext)