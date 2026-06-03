import { URL } from './Variables';

/**
 * Helper utilities for extracting product fields from the .NET API response.
 * 
 * The API returns products with the following structure:
 * - productId, productName, productName_Ar, description, description_Ar
 * - price, quantityInStock, categoryId, likesCount, favoritesCount
 * - imageUrl (often null)
 * - productImages: [{ imageId, imageUrl, imageOrder }]
 */

const FALLBACK_IMAGES = [
  '/perfume_gold_1776084751454.png',
  '/perfume_amber_1776085036492.png',
  '/perfume_obsidian_1776084817495.png',
  '/perfume_pink_1776084777940.png'
];

/**
 * Resolves any relative or absolute image URL correctly.
 * If the image path is relative (e.g. starting with '/images'), it prepends the backend host URL.
 */
export function getImageUrl(url) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  if (url.startsWith('/images/')) {
    return `${URL}${url}`;
  }
  if (url.startsWith('images/')) {
    return `${URL}/${url}`;
  }
  return url;
}

/**
 * Extract the best available image URL from a product object.
 * Checks productImages array first, then falls back to top-level imageUrl.
 */
export function getProductImage(product, fallbackIndex = 0) {
  if (!product) return FALLBACK_IMAGES[0];

  // Check productImages array first (the real data source)
  const images = product.productImages || product.ProductImages || [];
  if (images.length > 0) {
    // Sort by imageOrder if available, pick the first
    const sorted = [...images].sort((a, b) => (a.imageOrder || 0) - (b.imageOrder || 0));
    const url = sorted[0].imageUrl || sorted[0].imageURL || sorted[0].ImageUrl || sorted[0].ImageURL;
    if (url) return getImageUrl(url);
  }

  // Fallback to top-level image fields
  const topLevel = product.imageUrl || product.ImageUrl || product.imageURL || product.ImageURL 
                || product.imagePath || product.ImagePath;
  if (topLevel) return getImageUrl(topLevel);

  // Final fallback
  return FALLBACK_IMAGES[fallbackIndex % FALLBACK_IMAGES.length];
}

/**
 * Get all product images as an array of URLs.
 */
export function getAllProductImages(product) {
  if (!product) return [FALLBACK_IMAGES[0]];

  const images = product.productImages || product.ProductImages || [];
  if (images.length > 0) {
    const sorted = [...images].sort((a, b) => (a.imageOrder || 0) - (b.imageOrder || 0));
    return sorted.map(img => getImageUrl(img.imageUrl || img.imageURL || img.ImageUrl || img.ImageURL)).filter(Boolean);
  }

  const topLevel = product.imageUrl || product.ImageUrl || product.imageURL || product.ImageURL
                || product.imagePath || product.ImagePath;
  if (topLevel) return [getImageUrl(topLevel)];

  return [FALLBACK_IMAGES[0]];
}

/** Extract the product ID */
export function getProductId(product, fallback = 0) {
  return product.productId || product.ProductId || product.productID || product.ProductID || fallback;
}

/** Extract the product name */
export function getProductName(product, lang = 'en') {
  if (lang === 'ar') {
    return product.productName_Ar || product.productNameAr || product.ProductNameAr 
        || product.productName || product.ProductName || product.name || product.Name || '';
  }
  return product.productName || product.ProductName || product.name || product.Name || '';
}

/** Extract the product description */
export function getProductDesc(product, lang = 'en') {
  if (lang === 'ar') {
    return product.description_Ar || product.descriptionAr || product.DescriptionAr 
        || product.description || product.Description || '';
  }
  return product.description || product.Description || '';
}

/** Extract the product price */
export function getProductPrice(product) {
  return product.price || product.Price || 0;
}

/** Extract the category ID */
export function getCategoryId(product) {
  return product.categoryId || product.CategoryId || product.productCategoryID || null;
}
