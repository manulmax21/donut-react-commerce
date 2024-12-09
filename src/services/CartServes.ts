import { AxiosResponse } from 'axios';
import {Product} from '../store/types/types';
import api from "../axios";

export class CartServes {
    static getCarts(): Promise<AxiosResponse<Product>>{
        const url = `/cart`
        return api.get<Product>(url)
    }
    static removeOneCart(id): Promise<AxiosResponse<Product>>{
        const url = `/cart/${id}`
        return api.post<Product>(url)
    }
    static removeAllCart(): Promise<AxiosResponse<Product>>{
        const url = `/cart`
        return api.delete<Product>(url)
    }
    static addCart(body): Promise<AxiosResponse<Product>>{
        const url = `/cart/add`
        return api.post<Product>(url, body)
    }
}