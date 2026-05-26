import apiClient from "./apiClient";

export const PlaceOrder = async (orderData) => {
    try {
        // Map fields to match C# entities in backend (CreateOrderDto)
        const payload = {
            userId: orderData.CustomerId || orderData.customerId || orderData.customerID || orderData.userId || orderData.UserId || 1,
            companyId: orderData.CompanyId || orderData.companyId || 1,
            items: (orderData.Items || orderData.items || []).map(item => ({
                productId: item.ProductId || item.productId || item.productID || item.id,
                quantity: item.Quantity || item.quantity
            }))
        };
        const response = await apiClient.post(`/Orders`, payload);
        return response;
    } catch (error) {
        console.error("Error placing order:", error);
        throw error;
    }
};

export const GetUserOrders = async (userId) => {
    try {
        const response = await apiClient.get(`/Orders/user/${userId}`);
        return response;
    } catch (error) {
        console.error("Error fetching user orders:", error);
        throw error;
    }
};
