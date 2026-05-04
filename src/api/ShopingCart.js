import { API_BASE } from "./Variables";
import axios from "axios";

export const AddShopingCart = async (shopingCart) => {
    try {
        const response = await axios.post(`${API_BASE}/ShopingCart`, shopingCart);
        return response.data;
    } catch (error) {
        console.error("Error adding shopping cart:", error);
        throw error;
    }
};

export const GetShopingCart = async (customerId) => {
    try {
        const response = await axios.get(`${API_BASE}/ShopingCart/customer/${customerId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching shopping cart:", error);
        throw error;
    }
};
