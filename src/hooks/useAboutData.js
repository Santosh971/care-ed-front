import { useState, useEffect, useCallback } from 'react';
import api, { pagesAPI } from '../services/api';
import { aboutStaticData } from '../data/staticData';
import { cleanImages } from '../utils/imageUtils';

// Icon mapping for dynamic icons
import {
  Award,
  GraduationCap,
  Heart,
  Users,
  Target,
  CheckCircle,
  BookOpen,
  Briefcase,
  Clock,
  Star,
  MapPin
} from 'lucide-react';

const iconMap = {
  Award,
  GraduationCap,
  Heart,
  Users,
  Target,
  CheckCircle,
  BookOpen,
  Briefcase,
  Clock,
  Star,
  MapPin
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
 * Custom hook for About page data with proper section merging
 * @param {Object} options - Hook options
 * @param {boolean} options.useStaticFallback - Whether to use static data on API failure (default: true)
 * @returns {Object} - Section data + loading, error, fromApi, refetch
 */
export const useAboutData = (options = {}) => {
  const { useStaticFallback = true } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromApi, setFromApi] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('[useAboutData] Fetching about page data...');
      const response = await pagesAPI.getPage('about');

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

        // Merge with static data for missing sections
        if (aboutStaticData?.sections) {
          Object.keys(aboutStaticData.sections).forEach(sectionId => {
            if (!sectionsMap[sectionId]) {
              // Add static data for sections not in API response
              sectionsMap[sectionId] = {
                ...aboutStaticData.sections[sectionId],
                _isNew: true // Flag to indicate this section doesn't exist in DB yet
              };
            }
          });
        }

        console.log('[useAboutData] API Sections:', sectionsMap);
        console.log('[useAboutData] Hero section from API:', sectionsMap.hero);
        console.log('[useAboutData] Hero buttons from API:', sectionsMap.hero?.buttons);
        console.log('[useAboutData] Hero content from API:', sectionsMap.hero?.content);

        const apiData = {
          pageId: response.data.pageId,
          title: response.data.title,
          sections: sectionsMap,
          metadata: response.data.metadata
        };

        const processedData = processAboutPageData(apiData);
        setData(processedData);
        setFromApi(true);
        console.log('[useAboutData] ✅ Successfully loaded data from API');
        console.log('[useAboutData] Processed heroSection:', processedData.heroSection);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('[useAboutData] ❌ API fetch failed:', err.message);

      if (useStaticFallback) {
        console.log('[useAboutData] ⚠️ Using static fallback');
        const processedData = processAboutPageData(aboutStaticData);
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
const processAboutPageData = (pageData) => {
  const apiSections = pageData?.sections || {};
  const staticSections = aboutStaticData.sections;

  return {
    heroSection: processHeroSection(apiSections.hero, staticSections.hero),
    missionSection: processMissionSection(apiSections.mission, staticSections.mission),
    valuesSection: processValuesSection(apiSections.values, staticSections.values),
    timelineSection: processTimelineSection(apiSections.timeline, staticSections.timeline),
    leadershipSection: processLeadershipSection(apiSections.leadership, staticSections.leadership),
    locationSection: processLocationSection(apiSections.location, staticSections.location),
    whyChooseSection: processWhyChooseSection(apiSections.whyChoose, staticSections.whyChoose),
    ctaSection: processCtaSection(apiSections.cta, staticSections.cta),
  };
};

/**
 * Process Hero Section
 */
const processHeroSection = (apiHero, staticHero) => {
  console.log('[processHeroSection] API Hero:', apiHero);
  console.log('[processHeroSection] Static Hero:', staticHero);

  if (!apiHero) return staticHero;

  // Get buttons from multiple possible formats
  const getButtons = () => {
    // First check if buttons array has data
    if (apiHero.buttons && Array.isArray(apiHero.buttons) && apiHero.buttons.length > 0) {
      // Accept buttons that have text (even if link is empty)
      const validButtons = apiHero.buttons.filter(b => b && b.text);
      if (validButtons.length > 0) {
        // Ensure each button has a link (default to '#' if empty)
        const buttons = validButtons.map(b => ({
          text: b.text,
          link: b.link || '#',
          style: b.style || 'primary'
        }));
        console.log('[processHeroSection] Using buttons from API:', buttons);
        return buttons;
      }
    }

    // Then check if content has valid button data (legacy format)
    if (apiHero.content) {
      const buttons = [];

      if (apiHero.content.ctaPrimary && apiHero.content.ctaPrimary.text) {
        buttons.push({
          text: apiHero.content.ctaPrimary.text,
          link: apiHero.content.ctaPrimary.link || '#',
          style: apiHero.content.ctaPrimary.style || 'primary'
        });
      }

      if (apiHero.content.ctaSecondary && apiHero.content.ctaSecondary.text) {
        buttons.push({
          text: apiHero.content.ctaSecondary.text,
          link: apiHero.content.ctaSecondary.link || '#',
          style: apiHero.content.ctaSecondary.style || 'secondary'
        });
      }

      if (buttons.length > 0) {
        console.log('[processHeroSection] Using buttons from content:', buttons);
        return buttons;
      }
    }

    // Fall back to static
    console.log('[processHeroSection] Using static buttons:', staticHero.buttons);
    return staticHero.buttons || [];
  };

  // Get images array and clean invalid URLs
  const getImages = () => {
    if (apiHero.images && Array.isArray(apiHero.images) && apiHero.images.length > 0) {
      return cleanImages(apiHero.images);
    }
    return staticHero.images || [];
  };

  const result = {
    sectionId: apiHero.sectionId || staticHero.sectionId,
    title: apiHero.title || staticHero.title,
    subtitle: apiHero.subtitle || staticHero.subtitle,
    description: apiHero.description || staticHero.description,
    images: getImages(),
    buttons: getButtons(),
    isActive: apiHero.isActive ?? staticHero.isActive,
    order: apiHero.order ?? staticHero.order,
  };

  console.log('[processHeroSection] Processed result:', result);
  return result;
};

/**
 * Process Mission Section
 */
const processMissionSection = (apiMission, staticMission) => {
  if (!apiMission) return staticMission;

  // Process content - handle both string and object formats
  const getContent = () => {
    if (apiMission.content) {
      // If content is an object with vision
      if (typeof apiMission.content === 'object' && apiMission.content.vision) {
        return apiMission.content;
      }
      // If content is a string, convert to object format
      if (typeof apiMission.content === 'string') {
        return { vision: apiMission.content };
      }
    }
    return staticMission.content || { vision: '' };
  };

  // Process stats
  const getStats = () => {
    if (apiMission.stats && Array.isArray(apiMission.stats) && apiMission.stats.length > 0) {
      return apiMission.stats.map((stat, index) => ({
        number: stat.number ?? staticMission.stats[index]?.number ?? 0,
        suffix: stat.suffix ?? staticMission.stats[index]?.suffix ?? '',
        label: stat.label ?? staticMission.stats[index]?.label ?? '',
      }));
    }
    return staticMission.stats || [];
  };

  // Get images array and clean invalid URLs
  const getImages = () => {
    if (apiMission.images && Array.isArray(apiMission.images) && apiMission.images.length > 0) {
      return cleanImages(apiMission.images);
    }
    return staticMission.images || [];
  };

  return {
    sectionId: apiMission.sectionId || staticMission.sectionId,
    title: apiMission.title || staticMission.title,
    description: apiMission.description || staticMission.description,
    content: getContent(),
    stats: getStats(),
    images: getImages(),
    isActive: apiMission.isActive ?? staticMission.isActive,
    order: apiMission.order ?? staticMission.order,
  };
};

/**
 * Process Values Section
 */
const processValuesSection = (apiValues, staticValues) => {
  if (!apiValues?.items || apiValues.items.length === 0) {
    return staticValues;
  }

  return {
    sectionId: apiValues.sectionId || staticValues.sectionId,
    title: apiValues.title || staticValues.title,
    subtitle: apiValues.subtitle || staticValues.subtitle || '',
    items: apiValues.items.map((item, index) => ({
      icon: item.icon || staticValues.items[index]?.icon,
      title: item.title ?? staticValues.items[index]?.title ?? '',
      description: item.description ?? staticValues.items[index]?.description ?? '',
    })),
    isActive: apiValues.isActive ?? staticValues.isActive,
    order: apiValues.order ?? staticValues.order,
  };
};

/**
 * Process Timeline Section
 */
const processTimelineSection = (apiTimeline, staticTimeline) => {
  if (!apiTimeline?.items || apiTimeline.items.length === 0) {
    return staticTimeline;
  }

  return {
    sectionId: apiTimeline.sectionId || staticTimeline.sectionId,
    title: apiTimeline.title || staticTimeline.title,
    subtitle: apiTimeline.subtitle || staticTimeline.subtitle || '',
    items: apiTimeline.items.map((item, index) => ({
      year: item.year ?? staticTimeline.items[index]?.year ?? '',
      title: item.title ?? staticTimeline.items[index]?.title ?? '',
      description: item.description ?? staticTimeline.items[index]?.description ?? '',
    })),
    isActive: apiTimeline.isActive ?? staticTimeline.isActive,
    order: apiTimeline.order ?? staticTimeline.order,
  };
};

/**
 * Process Leadership Section
 */
const processLeadershipSection = (apiLeadership, staticLeadership) => {
  if (!apiLeadership?.items || apiLeadership.items.length === 0) {
    return staticLeadership;
  }

  return {
    sectionId: apiLeadership.sectionId || staticLeadership.sectionId,
    title: apiLeadership.title || staticLeadership.title,
    subtitle: apiLeadership.subtitle || staticLeadership.subtitle || '',
    items: apiLeadership.items.map((item, index) => {
      // Clean image URL if present
      const imageUrl = item.image ? (typeof item.image === 'string' ? item.image : item.image.url) : null;
      const cleanedImage = imageUrl && !imageUrl.startsWith('blob:') ? imageUrl : staticLeadership.items[index]?.image;

      return {
        name: item.name ?? staticLeadership.items[index]?.name ?? '',
        role: item.role ?? staticLeadership.items[index]?.role ?? '',
        image: cleanedImage,
        bio: item.bio ?? staticLeadership.items[index]?.bio ?? '',
      };
    }),
    isActive: apiLeadership.isActive ?? staticLeadership.isActive,
    order: apiLeadership.order ?? staticLeadership.order,
  };
};

/**
 * Process Location Section
 */
const processLocationSection = (apiLocation, staticLocation) => {
  if (!apiLocation) return staticLocation;

  // Process areas - handle both string and object formats, also check items field
  const processAreas = () => {
    // Check areas field first
    if (apiLocation.areas && Array.isArray(apiLocation.areas) && apiLocation.areas.length > 0) {
      return apiLocation.areas.map(area => {
        if (typeof area === 'string') {
          return area;
        }
        return area.name || area;
      });
    }
    // Also check items field (for backward compatibility)
    if (apiLocation.items && Array.isArray(apiLocation.items) && apiLocation.items.length > 0) {
      return apiLocation.items.map(item => {
        if (typeof item === 'string') {
          return item;
        }
        return item.name || item;
      });
    }
    // Fall back to static data
    return staticLocation.areas || [];
  };

  // Get images array and clean invalid URLs
  const getImages = () => {
    if (apiLocation.images && Array.isArray(apiLocation.images) && apiLocation.images.length > 0) {
      return cleanImages(apiLocation.images);
    }
    return staticLocation.images || [];
  };

  return {
    sectionId: apiLocation.sectionId || staticLocation.sectionId,
    title: apiLocation.title || staticLocation.title,
    description: apiLocation.description || apiLocation.content?.description || staticLocation.description,
    visitLabel: apiLocation.visitLabel || staticLocation.visitLabel || 'Visit Us',
    mapEmbedUrl: apiLocation.mapEmbedUrl || staticLocation.mapEmbedUrl || '',
    address: {
      street: apiLocation.address?.street || staticLocation.address?.street || '',
      city: apiLocation.address?.city || staticLocation.address?.city || '',
    },
    phone: apiLocation.phone || staticLocation.phone || '',
    tollFree: apiLocation.tollFree || staticLocation.tollFree || '',
    areas: processAreas(),
    images: getImages(),
    isActive: apiLocation.isActive ?? staticLocation.isActive,
    order: apiLocation.order ?? staticLocation.order,
  };
};

/**
 * Process Why Choose Section
 */
const processWhyChooseSection = (apiWhyChoose, staticWhyChoose) => {
  if (!apiWhyChoose?.items || apiWhyChoose.items.length === 0) {
    return staticWhyChoose;
  }

  // Get images array and clean invalid URLs
  const getImages = () => {
    if (apiWhyChoose.images && Array.isArray(apiWhyChoose.images) && apiWhyChoose.images.length > 0) {
      return cleanImages(apiWhyChoose.images);
    }
    return staticWhyChoose.images || [];
  };

  return {
    sectionId: apiWhyChoose.sectionId || staticWhyChoose.sectionId,
    title: apiWhyChoose.title || staticWhyChoose.title,
    subtitle: apiWhyChoose.subtitle || staticWhyChoose.subtitle || '',
    items: apiWhyChoose.items.map((item, index) => {
      // Handle both string and object formats
      if (typeof item === 'string') {
        return { title: item };
      }
      return {
        icon: item.icon || staticWhyChoose.items[index]?.icon,
        title: item.title ?? staticWhyChoose.items[index]?.title ?? '',
        description: item.description ?? staticWhyChoose.items[index]?.description ?? '',
      };
    }),
    images: getImages(),
    isActive: apiWhyChoose.isActive ?? staticWhyChoose.isActive,
    order: apiWhyChoose.order ?? staticWhyChoose.order,
  };
};

/**
 * Process CTA Section
 */
const processCtaSection = (apiCta, staticCta) => {
  if (!apiCta) return staticCta;

  const getButtons = () => {
    if (apiCta.buttons && Array.isArray(apiCta.buttons) && apiCta.buttons.length > 0) {
      // Accept buttons that have text (even if link is empty, default to '#')
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

  // Get contactEmail and contactName from root level or content field
  const getContactEmail = () => {
    return apiCta.contactEmail || apiCta.content?.contactEmail || staticCta.contactEmail || '';
  };

  const getContactName = () => {
    return apiCta.contactName || apiCta.content?.contactName || staticCta.contactName || '';
  };

  return {
    sectionId: apiCta.sectionId || staticCta.sectionId,
    title: apiCta.title || staticCta.title,
    description: apiCta.description || staticCta.description,
    buttons: getButtons(),
    contactEmail: getContactEmail(),
    contactName: getContactName(),
    isActive: apiCta.isActive ?? staticCta.isActive,
    order: apiCta.order ?? staticCta.order,
  };
};

export { iconMap };
export default useAboutData;