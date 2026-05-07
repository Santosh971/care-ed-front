import { useState, useEffect } from 'react';
import { pagesAPI } from '../services/api';
import {
  getInternationalStudentsLandingData,
  getInternationalStudentPageData,
  getAllInternationalStudentPages,
  internationalStudentsLandingData,
  internationalStudentsChildPages
} from '../data/internationalStudentsStaticData';

/**
 * Hook to fetch International Students landing page data
 * Falls back to static data if API fails
 */
export const useInternationalStudentsLanding = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromApi, setFromApi] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await pagesAPI.getPage('international-students');

        if (response.success && response.data) {
          // Transform sections array to object
          const sectionsMap = {};
          if (response.data.sections) {
            response.data.sections.forEach(section => {
              if (section.isActive !== false) {
                sectionsMap[section.sectionId] = section;
              }
            });
          }

          setData({
            pageId: response.data.pageId,
            title: response.data.title,
            slug: response.data.slug || 'international-students',
            seo: response.data.seo,
            sections: sectionsMap,
            metadata: response.data.metadata
          });
          setFromApi(true);
          setError(null);
        } else {
          // API returned but without success flag - use static fallback
          console.warn('API response missing success/data, using static data');
          setData(getInternationalStudentsLandingData());
          setFromApi(false);
          setError(null);
        }
      } catch (err) {
        console.warn('Failed to fetch landing page from API, using static data:', err.message);
        // Use static fallback
        setData(getInternationalStudentsLandingData());
        setFromApi(false);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const refetch = () => {
    setLoading(true);
    // Re-trigger the effect
    window.location.reload();
  };

  return { data, loading, error, fromApi, refetch };
};

/**
 * Hook to fetch a single International Students child page by slug
 * Falls back to static data if API fails
 */
export const useInternationalStudentPage = (slug) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromApi, setFromApi] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await pagesAPI.getPageBySlug(slug);

        if (response.success && response.data) {
          // Transform sections array to object
          const sectionsMap = {};
          if (response.data.sections) {
            response.data.sections.forEach(section => {
              if (section.isActive !== false) {
                sectionsMap[section.sectionId] = section;
              }
            });
          }

          setData({
            pageId: response.data.pageId,
            title: response.data.title,
            slug: response.data.slug,
            parentCategory: response.data.parentCategory,
            order: response.data.order,
            seo: response.data.seo,
            sections: sectionsMap,
            metadata: response.data.metadata
          });
          setFromApi(true);
          setError(null);
        } else {
          // API returned but without success flag - use static fallback
          console.warn(`API response missing success/data for slug '${slug}', using static data`);
          const staticData = getInternationalStudentPageData(slug);
          if (staticData) {
            setData(staticData);
            setFromApi(false);
            setError(null);
          } else {
            setError(new Error(`Page with slug '${slug}' not found`));
            setData(null);
          }
        }
      } catch (err) {
        console.warn(`Failed to fetch page with slug '${slug}' from API, using static data:`, err.message);
        // Use static fallback
        const staticData = getInternationalStudentPageData(slug);
        if (staticData) {
          setData(staticData);
          setFromApi(false);
          setError(null);
        } else {
          setError(new Error(`Page with slug '${slug}' not found`));
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  return { data, loading, error, fromApi };
};

/**
 * Hook to fetch all International Students child pages (for navigation)
 * Falls back to static data if API fails
 */
export const useInternationalStudentsNav = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromApi, setFromApi] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await pagesAPI.getChildPages('international-students');

        if (response.success && response.data) {
          // Filter to only published pages and sort by order
          const publishedPages = response.data
            .filter(page => page.isActive !== false)
            .sort((a, b) => (a.order || 0) - (b.order || 0));

          setPages(publishedPages.map(page => ({
            pageId: page.pageId,
            title: page.title,
            slug: page.slug,
            order: page.order
          })));
          setFromApi(true);
          setError(null);
        } else {
          // API returned but without success flag - use static fallback
          console.warn('API response missing success/data for child pages, using static data');
          setPages(getAllInternationalStudentPages());
          setFromApi(false);
          setError(null);
        }
      } catch (err) {
        console.warn('Failed to fetch child pages from API, using static data:', err.message);
        // Use static fallback
        setPages(getAllInternationalStudentPages());
        setFromApi(false);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { pages, loading, error, fromApi };
};

/**
 * Hook to fetch International Students page by pageId (for admin panel)
 */
export const useInternationalStudentPageById = (pageId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!pageId) {
        setLoading(false);
        return;
      }

      // First check if it's the landing page
      if (pageId === 'international-students') {
        try {
          setLoading(true);
          const response = await pagesAPI.getPage(pageId);
          if (response.success && response.data) {
            setData(response.data);
          }
        } catch (err) {
          // Use static fallback
          setData(getInternationalStudentsLandingData());
        } finally {
          setLoading(false);
        }
        return;
      }

      // For child pages, try to get by pageId
      try {
        setLoading(true);
        const response = await pagesAPI.getPage(pageId);
        if (response.success && response.data) {
          setData(response.data);
        }
      } catch (err) {
        // Use static fallback
        const staticData = internationalStudentsChildPages.find(p => p.pageId === pageId);
        if (staticData) {
          setData(staticData);
        } else {
          setError(new Error(`Page '${pageId}' not found`));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageId]);

  return { data, loading, error };
};

export default {
  useInternationalStudentsLanding,
  useInternationalStudentPage,
  useInternationalStudentsNav,
  useInternationalStudentPageById
};