import apiClient from "./apiClient";

export const GetAllProducts = async () => {
  try {
    const response = await apiClient.get('/Products/own');
    return response;
  } catch (error) {
    console.error("Error fetching all products:", error);
  }
};

export const GetPaginatedProducts = async (pageNumber, pageSize) => {
  try {
    // Note: The real .NET backend might not have '/all/page' by default, 
    // but we can query GET /Products and handle paging on client side if needed,
    // or map it to standard query params on GET /Products if supported.
    // Let's check: GET /Products returns all company products. We can pass pagination if supported,
    // or fallback to getting all and slicing on client side.
    const response = await apiClient.get(`/Products/own`);
    return response;
  } catch (error) {
    console.error("Error fetching paginated products:", error);
  }
};

export const GetTotalProductCount = async () => {
  try {
    const response = await apiClient.get(`/Products`);
    return response ? response.length : 0;
  } catch (error) {
    console.error("Error fetching total product count:", error);
  }
};

export const GetCategoryProductCount = async (categoryId) => {
  try {
    const response = await apiClient.get(`/Products/category/${categoryId}`);
    return response ? response.length : 0;
  } catch (error) {
    console.error("Error fetching category product count:", error);
  }
};

export const GetAllCategoryProducts = async (categoryId) => {
  try {
    const response = await apiClient.get(`/Products/category/${categoryId}`);
    return response;
  } catch (error) {
    console.error("Error fetching category products:", error);
  }
};

export const GetTopCategoryProducts = async (categoryId, count) => {
  try {
    const response = await apiClient.get(`/Products/category/${categoryId}`);
    return response ? response.slice(0, count) : [];
  } catch (error) {
    console.error("Error fetching top products:", error);
  }
};

export const GetRelatedCategoryProducts = async (categoryId, excludedProduct, count) => {
  try {
    const response = await apiClient.get(`/Products/category/${categoryId}`);
    return response ? response.filter(p => (p.productId || p.productID) !== excludedProduct).slice(0, count) : [];
  } catch (error) {
    console.error("Error fetching related products:", error);
  }
};

export const GetProduct = async (ProductId) => {
  try {
    const response = await apiClient.get(`/Products/${ProductId}`);
    return response;
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};

export const GetpaginatedCategoryProducts = async (categoryId, pageNumber, pageSize) => {
  try {
    const response = await apiClient.get(`/Products/category/${categoryId}`);
    return response;
  } catch (error) {
    console.error("Error fetching paginated products:", error);
  }
};

export const GetInRangeCategoryProducts = async (categoryId, min, max) => {
  try {
    const response = await apiClient.get(`/Products/category/${categoryId}`);
    return response ? response.filter(p => p.price >= min && p.price <= max) : [];
  } catch (error) {
    console.error("Error fetching in-range products:", error);
  }
};

export const SearchCategoryProducts = async (categoryId, term) => {
  try {
    const response = await apiClient.get(`/Products/category/${categoryId}`);
    const query = term ? term.toLowerCase() : '';
    return response ? response.filter(p => p.productName?.toLowerCase().includes(query) || p.description?.toLowerCase().includes(query)) : [];
  } catch (error) {
    console.error("Error searching category products:", error);
  }
};

export const SearchGlobalProducts = async (term) => {
  try {
    const response = await apiClient.get(`/Products`);
    const query = term ? term.toLowerCase() : '';
    return response ? response.filter(p => p.productName?.toLowerCase().includes(query) || p.description?.toLowerCase().includes(query)) : [];
  } catch (error) {
    console.error("Error global search:", error);
  }
};
