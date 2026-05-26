import apiClient from "./apiClient";

/**
 * Get all reviews for a specific product.
 * @param {number} productId
 */
export const GetProductReviews = async (productId) => {
  try {
    const response = await apiClient.get(`/Reviews/product/${productId}`);
    return response;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

/**
 * Submit a review for a product.
 * @param {{ userId: number, productId: number, reviewText?: string, rating: number }} dto
 */
export const CreateReview = async (dto) => {
  try {
    const response = await apiClient.post(`/Reviews`, {
      userId: dto.userId,
      productId: dto.productId,
      reviewText: dto.reviewText || null,
      rating: dto.rating,
    });
    return response;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};
