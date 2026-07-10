import apiClient from "./apiClient";

export const GetCategories = async () => {
  try {
    const response = await apiClient.get('/ProductCategories/own');
    return response;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

export const GetCategory = async (categoryId) => {
  try {
    const response = await apiClient.get(`/ProductCategories/${categoryId}`);
    return response;
  } catch (error) {
    console.error("Error fetching category:", error);
  }
};
