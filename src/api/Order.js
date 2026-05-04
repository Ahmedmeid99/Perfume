import { API_BASE } from "./Variables";
import axios from "axios";

export const PlaceOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_BASE}/Order`, orderData);
        return response.data;
    } catch (error) {
        console.error("Error placing order:", error);
        throw error;
    }
};

export const GetCustomerOrders = async (customerId) => {
    try {
        const response = await axios.get(`${API_BASE}/Order/customer/${customerId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching customer orders:", error);
        throw error;
    }
};
