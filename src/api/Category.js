import { API_BASE } from "./Variables";
import axios from "axios";

export const GetCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE}/ProductCategory`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

export const GetCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${API_BASE}/ProductCategory/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
  }
};
