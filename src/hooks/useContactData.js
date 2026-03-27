import { useState, useEffect, useCallback } from 'react';
import { pagesAPI } from '../services/api';
import { contactStaticData } from '../data/staticData';
import { cleanImages } from '../utils/imageUtils';

// Icon mapping for dynamic icons
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle
} from 'lucide-react';

const iconMap = {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle
};

/**
 * Helper to convert object with numeric keys to string
 * MongoDB Mixed type sometimes stores strings as objects with numeric keys
 */
const ensureString = (value) => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && !Array.isArray(value)) {
    const keys = Object.keys(value);
    if (keys.length > 0 && keys.every(k => !isNaN(parseInt(k)))) {
      return keys.sort((a, b) => parseInt(a) - parseInt(b)).map(k => value[k]).join('');
    }
  }
  return value;
};

/**
 * Custom hook for Contact page data with proper section merging
 * @param {Object} options - Hook options
 * @param {boolean} options.useStaticFallback - Whether to use static data on API failure (default: true)
 * @returns {Object} - Section data + loading, error, fromApi, refetch
 */
export const useContactData = (options = {}) => {
  const { useStaticFallback = true } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromApi, setFromApi] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('[useContactData] Fetching contact page data...');
      const response = await pagesAPI.getPage('contact');

      if (response.success && response.data) {
        const sectionsMap = {};
        response.data.sections?.forEach(section => {
          if (section.isActive !== false) {
            sectionsMap[section.sectionId] = section;
          }
        });

        const apiData = {
          pageId: response.data.pageId,
          title: response.data.title,
          sections: sectionsMap,
          metadata: response.data.metadata
        };

        const processedData = processContactPageData(apiData);
        setData(processedData);
        setFromApi(true);
        console.log('[useContactData] ✅ Successfully loaded data from API');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('[useContactData] ❌ API fetch failed:', err.message);

      if (useStaticFallback) {
        console.log('[useContactData] ⚠️ Using static fallback');
        const processedData = processContactPageData(contactStaticData);
        setData(processedData);
        setFromApi(false);
      } else {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [useStaticFallback]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...data,
    loading,
    error,
    fromApi,
    refetch
  };
};

/**
 * Process and merge API data with static fallback for all sections
 */
const processContactPageData = (pageData) => {
  const apiSections = pageData?.sections || {};
  const staticSections = contactStaticData.sections;

  return {
    heroSection: processHeroSection(apiSections.hero, staticSections.hero),
    infoSection: processInfoSection(apiSections.info, staticSections.info),
    hoursSection: processHoursSection(apiSections.hours, staticSections.hours),
    areasSection: processAreasSection(apiSections.areas, staticSections.areas),
    quickContactSection: processQuickContactSection(apiSections.quickContact, staticSections.quickContact),
    ctaSection: processCtaSection(apiSections.cta, staticSections.cta),
  };
};

/**
 * Process Hero Section
 */
const processHeroSection = (apiHero, staticHero) => {
  if (!apiHero) return staticHero;

  // Get images array and clean invalid URLs
  const getImages = () => {
    if (apiHero.images && Array.isArray(apiHero.images) && apiHero.images.length > 0) {
      return cleanImages(apiHero.images);
    }
    return staticHero.images || [];
  };

  // Get buttons
  const getButtons = () => {
    if (apiHero.buttons && Array.isArray(apiHero.buttons) && apiHero.buttons.length > 0) {
      const validButtons = apiHero.buttons.filter(b => b && b.text);
      if (validButtons.length > 0) {
        return validButtons.map(b => ({
          text: b.text,
          link: b.link || '#',
          style: b.style || 'primary'
        }));
      }
    }
    return staticHero.buttons || [];
  };

  return {
    sectionId: apiHero.sectionId || staticHero.sectionId,
    title: apiHero.title || staticHero.title,
    subtitle: ensureString(apiHero.subtitle) || staticHero.subtitle,
    description: ensureString(apiHero.description) || staticHero.description,
    images: getImages(),
    buttons: getButtons(),
    isActive: apiHero.isActive ?? staticHero.isActive,
    order: apiHero.order ?? staticHero.order,
  };
};

/**
 * Process Info Section (Contact Information)
 */
const processInfoSection = (apiInfo, staticInfo) => {
  if (!apiInfo?.items || apiInfo.items.length === 0) {
    return staticInfo;
  }

  return {
    sectionId: apiInfo.sectionId || staticInfo.sectionId,
    title: ensureString(apiInfo.title) || staticInfo.title,
    items: apiInfo.items.map((item, index) => ({
      label: ensureString(item.label) ?? staticInfo.items[index]?.label ?? '',
      value: ensureString(item.value) ?? staticInfo.items[index]?.value ?? '',
      icon: item.icon || staticInfo.items[index]?.icon,
      link: item.link || staticInfo.items[index]?.link || '#',
    })),
    isActive: apiInfo.isActive ?? staticInfo.isActive,
    order: apiInfo.order ?? staticInfo.order,
  };
};

/**
 * Process Hours Section (Office Hours)
 */
const processHoursSection = (apiHours, staticHours) => {
  if (!apiHours?.items || apiHours.items.length === 0) {
    return staticHours;
  }

  return {
    sectionId: apiHours.sectionId || staticHours.sectionId,
    title: ensureString(apiHours.title) || staticHours.title,
    items: apiHours.items.map((item, index) => ({
      days: ensureString(item.days) ?? staticHours.items[index]?.days ?? '',
      hours: ensureString(item.hours) ?? staticHours.items[index]?.hours ?? '',
    })),
    isActive: apiHours.isActive ?? staticHours.isActive,
    order: apiHours.order ?? staticHours.order,
  };
};

/**
 * Process Areas Section (Service Areas)
 */
const processAreasSection = (apiAreas, staticAreas) => {
  if (!apiAreas?.items || apiAreas.items.length === 0) {
    return staticAreas;
  }

  return {
    sectionId: apiAreas.sectionId || staticAreas.sectionId,
    title: ensureString(apiAreas.title) || staticAreas.title,
    description: ensureString(apiAreas.description) || staticAreas.description || '',
    items: apiAreas.items.map((item, index) => ({
      name: ensureString(item.name) ?? staticAreas.items[index]?.name ?? '',
    })),
    isActive: apiAreas.isActive ?? staticAreas.isActive,
    order: apiAreas.order ?? staticAreas.order,
  };
};

/**
 * Process Quick Contact Section
 */
const processQuickContactSection = (apiQuickContact, staticQuickContact) => {
  if (!apiQuickContact?.items || apiQuickContact.items.length === 0) {
    return staticQuickContact;
  }

  return {
    sectionId: apiQuickContact.sectionId || staticQuickContact.sectionId,
    title: ensureString(apiQuickContact.title) || staticQuickContact.title,
    description: ensureString(apiQuickContact.description) || staticQuickContact.description,
    items: apiQuickContact.items.map((item, index) => ({
      icon: item.icon || staticQuickContact.items[index]?.icon || 'Phone',
      title: ensureString(item.title) ?? staticQuickContact.items[index]?.title ?? '',
      subtitle: ensureString(item.subtitle) ?? staticQuickContact.items[index]?.subtitle ?? '',
      value: ensureString(item.value) ?? staticQuickContact.items[index]?.value ?? '',
      link: item.link || staticQuickContact.items[index]?.link || '#',
    })),
    isActive: apiQuickContact.isActive ?? staticQuickContact.isActive,
    order: apiQuickContact.order ?? staticQuickContact.order,
  };
};

/**
 * Process CTA Section
 */
const processCtaSection = (apiCta, staticCta) => {
  if (!apiCta) return staticCta;

  const getButtons = () => {
    if (apiCta.buttons && Array.isArray(apiCta.buttons) && apiCta.buttons.length > 0) {
      const validButtons = apiCta.buttons.filter(b => b && b.text);
      if (validButtons.length > 0) {
        return validButtons.map(b => ({
          text: b.text,
          link: b.link || '#',
          style: b.style || 'primary'
        }));
      }
    }
    return staticCta.buttons;
  };

  return {
    sectionId: apiCta.sectionId || staticCta.sectionId,
    title: ensureString(apiCta.title) || staticCta.title,
    description: ensureString(apiCta.description) || staticCta.description,
    buttons: getButtons(),
    isActive: apiCta.isActive ?? staticCta.isActive,
    order: apiCta.order ?? staticCta.order,
  };
};

export { iconMap };
export default useContactData;