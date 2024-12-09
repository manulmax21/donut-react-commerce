import { AxiosResponse } from 'axios';
import {Product} from '../store/types/types';
import api from "../axios";

export class ProductServes {
    static getProduct(): Promise<AxiosResponse<Product>>{
        const url = `/products`
        return api.get<Product>(url)
    }
    static getOneProduct(id): Promise<AxiosResponse<Product>>{
        const url = `/products/${id}`
        return api.get<Product>(url)
    }
    static getPageProduct(page): Promise<AxiosResponse<Product>>{
        const url = `/products/page/${page}`
        return api.get<Product>(url)
    }
    static addProduct(body): Promise<AxiosResponse<Product>>{
        const url = `/products/add`
        return api.post<Product>(url, body)
    }
    static removeProduct(id): Promise<AxiosResponse<Product>>{
        const url = `/products/remove/${id}`
        return api.post<Product>(url)
    }
    static updateNameProduct(body): Promise<AxiosResponse<Product>>{
        const url = `/products/update-name`
        return api.put<Product>(url, body)
    }
    static updatePriceProduct(body): Promise<AxiosResponse<Product>>{
        const url = `/products/update-price`
        return api.put<Product>(url, body)
    }
    static updateCategoryProduct(body): Promise<AxiosResponse<Product>>{
        const url = `/products/update-category`
        return api.put<Product>(url, body)
    }
    static updateCountProduct(body): Promise<AxiosResponse<Product>>{
        const url = `/products/update-count`
        return api.put<Product>(url, body)
    }
}