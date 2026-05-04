import { URL, API_BASE } from "./Variables";
import axios from "axios";

export const GetAllProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE}/Product`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
  }
};

export const GetPaginatedProducts = async (pageNumber, pageSize) => {
  try {
    const response = await axios.get(`${API_BASE}/Product/all/page?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching paginated products:", error);
  }
};

export const GetTotalProductCount = async () => {
  try {
    const response = await axios.get(`${API_BASE}/Product/count`);
    return response.data;
  } catch (error) {
    console.error("Error fetching total product count:", error);
  }
};

export const GetCategoryProductCount = async (categoryId) => {
  try {
    const response = await axios.get(`${API_BASE}/Product/category/${categoryId}/count`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category product count:", error);
  }
};

export const GetAllCategoryProducts = async (categoryId) => {
  try {
    const response = await axios.get(`${API_BASE}/Product/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category products:", error);
  }
};

export const GetTopCategoryProducts = async (categoryId, count) => {
  try {
    const response = await axios.get(`${API_BASE}/Product/category/${categoryId}/top?count=${count}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching top products:", error);
  }
};

export const GetRelatedCategoryProducts = async (categoryId, excludedProduct, count) => {
  try {
    const response = await axios.get(`${API_BASE}/Product/category/${categoryId}/related?excludedProduct=${excludedProduct}&count=${count}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching related products:", error);
  }
};

export const GetProduct = async (ProductId) => {
  try {
    const response = await axios.get(`${API_BASE}/Product/${ProductId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};

export const GetpaginatedCategoryProducts = async (categoryId, pageNumber, pageSize) => {
  try {
    const response = await axios.get(`${API_BASE}/Product/category/${categoryId}/page?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching paginated products:", error);
  }
};

export const GetInRangeCategoryProducts = async (categoryId, min, max) => {
  try {
    const response = await axios.get(`${API_BASE}/Product/category/${categoryId}/inrange?min=${min}&max=${max}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching in-range products:", error);
  }
};

export const SearchCategoryProducts = async (categoryId, term) => {
  try {
    const response = await axios.get(`${API_BASE}/Product/category/${categoryId}/search?term=${term}`);
    return response.data;
  } catch (error) {
    console.error("Error searching category products:", error);
  }
};

export const SearchGlobalProducts = async (term) => {
  try {
    const response = await axios.get(`${API_BASE}/Product/searchglobal?term=${term}`);
    return response.data;
  } catch (error) {
    console.error("Error global search:", error);
  }
};
