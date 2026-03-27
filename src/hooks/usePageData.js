import { useState, useEffect, useCallback } from 'react';
import { pagesAPI } from '../services/api';
import { getStaticPageData } from '../data/staticData';
import { cleanImages, cleanImageUrl } from '../utils/imageUtils';

/**
 * Helper to convert object with numeric keys to string
 * MongoDB Mixed type sometimes stores strings as objects with numeric keys
 */
const ensureString = (value) => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && !Array.isArray(value)) {
    // Check if it's an object with numeric keys (like {0: 'W', 1: 'e', ...})
    const keys = Object.keys(value);
    if (keys.length > 0 && keys.every(k => !isNaN(parseInt(k)))) {
      // Convert to string by joining values in order
      return keys.sort((a, b) => parseInt(a) - parseInt(b)).map(k => value[k]).join('');
    }
  }
  return value;
};

/**
 * Clean images in a section object and fix string fields
 */
const cleanSectionImages = (section) => {
  // Return as-is if not an object
  if (!section) return section;
  if (typeof section !== 'object') return section;
  if (Array.isArray(section)) return section;

  const cleaned = { ...section };

  // Fix string fields that might be stored as objects with numeric keys
  const stringFields = ['title', 'subtitle', 'description', 'content', 'badge', 'text', 'name', 'label'];
  stringFields.forEach(field => {
    if (cleaned[field] !== undefined) {
      cleaned[field] = ensureString(cleaned[field]);
    }
  });

  // Clean main images array
  if (cleaned.images && Array.isArray(cleaned.images)) {
    cleaned.images = cleanImages(cleaned.images);
  }

  // Clean single image field
  if (cleaned.image && typeof cleaned.image === 'string') {
    cleaned.image = cleanImageUrl(cleaned.image) || cleaned.image;
  }

  // Clean nested image in content
  if (cleaned.content && typeof cleaned.content === 'object' && !Array.isArray(cleaned.content)) {
    // If content is an object with numeric keys (like {0: 'W', 1: 'e', ...}), convert to string
    const contentKeys = Object.keys(cleaned.content);
    if (contentKeys.length > 0 && contentKeys.every(k => !isNaN(parseInt(k)))) {
      cleaned.content = ensureString(cleaned.content);
    } else {
      // Otherwise, clean nested properties
      cleaned.content = {
        ...cleaned.content,
        image: cleanImageUrl(cleaned.content.image) || cleaned.content.image,
        images: cleaned.content.images && Array.isArray(cleaned.content.images)
          ? cleanImages(cleaned.content.images)
          : cleaned.content.images
      };
    }
  }

  // Clean items array if items have image fields
  if (cleaned.items && Array.isArray(cleaned.items)) {
    cleaned.items = cleaned.items.map(item => {
      if (!item || typeof item !== 'object') return item;

      const cleanedItem = { ...item };

      // Fix string fields in items
      stringFields.forEach(field => {
        if (cleanedItem[field] !== undefined) {
          cleanedItem[field] = ensureString(cleanedItem[field]);
        }
      });

      // Clean item image
      if (cleanedItem.image && typeof cleanedItem.image === 'string') {
        cleanedItem.image = cleanImageUrl(cleanedItem.image) || cleanedItem.image;
      }

      // Clean item images array
      if (cleanedItem.images && Array.isArray(cleanedItem.images)) {
        cleanedItem.images = cleanImages(cleanedItem.images);
      }

      return cleanedItem;
    });
  }

  return cleaned;
};

/**
 * Custom hook for fetching page data with fallback
 * @param {string} pageId - The page identifier (e.g., 'home', 'about', 'services')
 * @param {Object} options - Hook options
 * @param {boolean} options.useStaticFallback - Whether to use static data on API failure (default: true)
 * @param {boolean} options.refetchOnFocus - Whether to refetch when window regains focus (default: true)
 * @returns {Object} - { data, loading, error, fromApi, refetch }
 */
export const usePageData = (pageId, options = {}) => {
  const { useStaticFallback = true, refetchOnFocus = true } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromApi, setFromApi] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log(`[usePageData] Fetching page data for "${pageId}"...`);
      console.log(`[usePageData] API URL: ${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/pages/${pageId}`);

      const response = await pagesAPI.getPage(pageId);
      console.log(`[usePageData] API response for "${pageId}":`, response);

      if (response.success && response.data) {
        // Transform sections array into object keyed by sectionId
        // IMPORTANT: Keep the FIRST occurrence of each section (in case of duplicates)
        const sectionsMap = {};
        response.data.sections?.forEach(section => {
          if (section.isActive !== false) {
            // Only add if not already present (keep first occurrence)
            if (!sectionsMap[section.sectionId]) {
              sectionsMap[section.sectionId] = section;
            } else {
              // Merge buttons from duplicate if original has empty buttons
              if (section.buttons?.length > 0 && !sectionsMap[section.sectionId].buttons?.length) {
                sectionsMap[section.sectionId].buttons = section.buttons;
              }
              // Merge content from duplicate if original doesn't have it
              if (section.content && !sectionsMap[section.sectionId].content) {
                sectionsMap[section.sectionId].content = section.content;
              }
            }
          }
        });

        // Merge with static data for missing sections (for admin panel editing)
        const staticData = getStaticPageData(pageId);
        if (staticData?.sections) {
          Object.keys(staticData.sections).forEach(sectionId => {
            if (!sectionsMap[sectionId]) {
              // Add static data for sections not in API response
              sectionsMap[sectionId] = {
                ...staticData.sections[sectionId],
                _isNew: true // Flag to indicate this section doesn't exist in DB yet
              };
            }
          });
        }

        // Clean invalid blob URLs from all sections
        Object.keys(sectionsMap).forEach(sectionId => {
          sectionsMap[sectionId] = cleanSectionImages(sectionsMap[sectionId]);
        });

        console.log(`[usePageData] Transformed sections for "${pageId}":`, sectionsMap);
        console.log(`[usePageData] Hero section from API:`, sectionsMap.hero);

        setData({
          pageId: response.data.pageId,
          title: response.data.title,
          sections: sectionsMap,
          metadata: response.data.metadata
        });
        setFromApi(true);
        console.log(`[usePageData] ✅ Successfully loaded data from API for "${pageId}"`);
      } else {
        console.error(`[usePageData] Invalid response format:`, response);
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error(`[usePageData] ❌ API fetch failed for page "${pageId}":`, err.message);
      console.error(`[usePageData] Full error:`, err);

      if (useStaticFallback) {
        // Use static fallback data
        const staticData = getStaticPageData(pageId);

        if (staticData) {
          console.log(`[usePageData] ⚠️ Using static fallback for page "${pageId}"`);
          console.log(`[usePageData] Static data:`, staticData);
          setData(staticData);
          setFromApi(false);
        } else {
          setError(new Error(`No static data available for page "${pageId}"`));
        }
      } else {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [pageId, useStaticFallback]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Refetch when page becomes visible (when user navigates back to the tab)
  // Using visibilitychange instead of focus to avoid interrupting file uploads
  useEffect(() => {
    if (!refetchOnFocus) return;

    const handleVisibilityChange = () => {
      // Only refetch when page becomes visible AND was hidden before
      // This prevents refetch when file dialogs close (they don't trigger hidden state)
      if (document.visibilityState === 'visible') {
        console.log(`[usePageData] Page became visible, refetching "${pageId}"...`);
        fetchData();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [pageId, refetchOnFocus, fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, fromApi, refetch };
};

/**
 * Custom hook for fetching a specific section
 * @param {string} pageId - The page identifier
 * @param {string} sectionId - The section identifier
 * @param {Object} options - Hook options
 * @returns {Object} - { data, loading, error, refetch }
 */
export const useSection = (pageId, sectionId, options = {}) => {
  const { useStaticFallback = true } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSection = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await pagesAPI.getSection(pageId, sectionId);

      if (response.success && response.data) {
        setData(response.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.warn(`API fetch failed for section "${sectionId}" on page "${pageId}":`, err.message);

      if (useStaticFallback) {
        const staticData = getStaticPageData(pageId);
        const section = staticData?.sections?.[sectionId];

        if (section) {
          console.log(`Using static fallback for section "${sectionId}"`);
          setData(section);
        } else {
          setError(new Error(`Section "${sectionId}" not found`));
        }
      } else {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [pageId, sectionId, useStaticFallback]);

  useEffect(() => {
    fetchSection();
  }, [fetchSection]);

  return { data, loading, error, refetch: fetchSection };
};

/**
 * Custom hook for updating a section
 * @returns {Object} - { updateSection, loading, error }
 */
export const useUpdateSection = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateSection = async (pageId, sectionId, data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await pagesAPI.updateSection(pageId, sectionId, data);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { updateSection, loading, error };
};

export default usePageData;