import {createContext} from "react";

interface Props{
    city: City,
    changeCity: (city: City) => void
}
export enum City {
    CITY = [{id: 1 ,city: 'moscow'}]
}
export const CityContext = createContext<Props>({
    city: City.CITY,
    changeCity: city => {}
})