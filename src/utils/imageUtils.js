/**
 * Image URL utilities for cleaning and validating URLs
 */

/**
 * Check if a URL is a valid image URL (not blob, data, or file URL)
 */
export const isValidImageUrl = (url) => {
  if (!url) return false;
  if (typeof url !== 'string') return false;

  // Reject blob URLs (local file previews)
  if (url.startsWith('blob:')) return false;
  // Reject data URLs (base64)
  if (url.startsWith('data:')) return false;
  // Reject file URLs
  if (url.startsWith('file:')) return false;

  return true;
};

/**
 * Clean a single image URL - returns null if invalid
 */
export const cleanImageUrl = (url) => {
  if (!url) return null;

  if (!isValidImageUrl(url)) {
    console.warn('[imageUtils] Removing invalid URL:', url);
    return null;
  }

  return url;
};

/**
 * Clean an images array - remove invalid blob URLs
 * @param {Array} images - Array of image objects or strings
 * @returns {Array} - Cleaned array with valid URLs only
 */
export const cleanImages = (images) => {
  if (!images || !Array.isArray(images)) return [];

  return images
    .map(img => {
      // Handle string URLs
      if (typeof img === 'string') {
        return cleanImageUrl(img) ? img : null;
      }

      // Handle object with url property
      if (img && typeof img === 'object') {
        const cleanedUrl = cleanImageUrl(img.url);
        if (cleanedUrl) {
          return { ...img, url: cleanedUrl };
        }
        return null;
      }

      return null;
    })
    .filter(Boolean);
};

/**
 * Clean all image references in a section object
 */
export const cleanSectionImages = (section) => {
  if (!section) return section;

  const cleaned = { ...section };

  // Clean main images array
  if (cleaned.images) {
    cleaned.images = cleanImages(cleaned.images);
  }

  // Clean nested image in content
  if (cleaned.content?.image) {
    cleaned.content = {
      ...cleaned.content,
      image: cleanImageUrl(cleaned.content.image) || cleaned.content.image
    };
  }

  // Clean any nested images in content
  if (cleaned.content?.images) {
    cleaned.content = {
      ...cleaned.content,
      images: cleanImages(cleaned.content.images)
    };
  }

  return cleaned;
};

export default {
  isValidImageUrl,
  cleanImageUrl,
  cleanImages,
  cleanSectionImages
};