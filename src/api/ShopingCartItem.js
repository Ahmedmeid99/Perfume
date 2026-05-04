import { API_BASE } from "./Variables";
import axios from "axios";

export const AddShopingCartItem = async (ShopingCartItem) => {
    try {
        const response = await axios.post(`${API_BASE}/ShopingCartItem`, ShopingCartItem);
        return response.data;
    } catch (error) {
        console.error("Error adding cart item:", error);
        throw error;
    }
};

export const IncreaseItemQuantity = async (shopingCartItemId) => {
    try {
        const response = await axios.patch(`${API_BASE}/ShopingCartItem/${shopingCartItemId}/increment`);
        return response.data;
    } catch (error) {
        console.error("Error incrementing quantity:", error);
        throw error;
    }
};

export const DecreaseItemQuantity = async (shopingCartItemId) => {
    try {
        const response = await axios.patch(`${API_BASE}/ShopingCartItem/${shopingCartItemId}/decrement`);
        return response.data;
    } catch (error) {
        console.error("Error decrementing quantity:", error);
        throw error;
    }
};

export const GetAllShopingCartItems = async (shopingCartId) => {
    try {
        const response = await axios.get(`${API_BASE}/ShopingCartItem/shopingcart/${shopingCartId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching cart items:", error);
        throw error;
    }
};

export const DeleteShopingCartItem = async (shopingCartItemId) => {
    try {
        const response = await axios.delete(`${API_BASE}/ShopingCartItem/${shopingCartItemId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting cart item:", error);
        throw error;
    }
};
