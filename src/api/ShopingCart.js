import apiClient from "./apiClient";

export const AddShopingCart = async (shopingCart) => {
    try {
        const payload = {
            userId: shopingCart.customerID
        };
        const response = await apiClient.post(`/ShoppingCart/add`, payload);
        return response;
    } catch (error) {
        console.error("Error adding shopping cart:", error);
        throw error;
    }
};

export const GetShopingCart = async (customerId) => {
    try {
        const response = await apiClient.get(`/ShoppingCart/${customerId}`);
        return response;
    } catch (error) {
        console.error("Error fetching shopping cart:", error);
        throw error;
    }
};
