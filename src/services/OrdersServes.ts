import { AxiosResponse } from 'axios';
import {Order} from '../store/types/types';
import api from "../axios";

export class OrderServes {
    static getOrder(id): Promise<AxiosResponse<Order>>{
        const url = `/orders/${id}`
        return api.get<Order>(url, id)
    }
    static addOrder(body): Promise<AxiosResponse<Order>>{
        const url = `/orders/add`
        return api.post<Order>(url, body)
    }
    static removeOrder(id): Promise<AxiosResponse<Order>>{
        const url = `/orders/${id}`
        return api.delete<Order>(url)
    }
}