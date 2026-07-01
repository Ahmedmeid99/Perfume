import apiClient from "./apiClient";

export const GetGalleryImages = async () => {
  try {
    const response = await apiClient.get('/GalleryImages/own');
    return response;
  } catch (error) {
    console.error("Error fetching gallery images:", error);
  }
};
