export type Weather = {
    name: string
    timezone: number
    main: {
        temp: number;
    };
};
export type ForecastWeather = {
    list: any
    city: any
}
export type Product = {
    name: string,
    price: string,
    count: string
}
export type User = {
    name: string,
    email: string,
    role: string,
    password: string
}
export type Cart = {
    productId: string,
    count: number
}
export type Order = {
    id: string
}
