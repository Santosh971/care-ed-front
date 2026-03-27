import { useState, useEffect, useCallback } from 'react';
import { pagesAPI } from '../services/api';
import { homeStaticData } from '../data/staticData';
import { cleanImages } from '../utils/imageUtils';

// Icon mapping for dynamic icons (imported statically for better performance)
import {
  GraduationCap,
  Heart,
  Activity,
  BookOpen,
  Award,
  Briefcase,
  Clock,
  Users,
  Star,
  BadgeCheck,
  Target,
  Phone
} from 'lucide-react';

const iconMap = {
  GraduationCap,
  Heart,
  Activity,
  BookOpen,
  Award,
  Briefcase,
  Clock,
  Users,
  Star,
  BadgeCheck,
  Target,
  Phone,
};

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
 * Custom hook for Home page data with proper section merging
 * @param {Object} options - Hook options
 * @param {boolean} options.useStaticFallback - Whether to use static data on API failure (default: true)
 * @returns {Object} - { heroSection, statsSection, featuresSection, programsSection, aboutSection, testimonialsSection, ctaSection, loading, error, fromApi, refetch }
 */
export const useHomeData = (options = {}) => {
  const { useStaticFallback = true } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromApi, setFromApi] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('[useHomeData] Fetching home page data...');
      const response = await pagesAPI.getPage('home');

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

        console.log('[useHomeData] Sections map:', sectionsMap);
        console.log('[useHomeData] Hero section:', sectionsMap.hero);

        const apiData = {
          pageId: response.data.pageId,
          title: response.data.title,
          sections: sectionsMap,
          metadata: response.data.metadata
        };

        // Process and merge sections
        const processedData = processHomeData(apiData);
        setData(processedData);
        setFromApi(true);
        console.log('[useHomeData] ✅ Successfully loaded data from API');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('[useHomeData] ❌ API fetch failed:', err.message);

      if (useStaticFallback) {
        console.log('[useHomeData] ⚠️ Using static fallback');
        const processedData = processHomeData(homeStaticData);
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
const processHomeData = (pageData) => {
  const apiSections = pageData?.sections || {};
  const staticSections = homeStaticData.sections;
  console.log("Hero - Api Sections : ", apiSections)

  // Process Hero Section
  const heroSection = processHeroSection(apiSections.hero, staticSections.hero);

  // Process Stats Section
  const statsSection = processStatsSection(apiSections.stats, staticSections.stats);

  // Process Features Section
  const featuresSection = processFeaturesSection(apiSections.features, staticSections.features);

  // Process Programs Section
  const programsSection = processProgramsSection(apiSections.programs, staticSections.programs);

  // Process About Section
  const aboutSection = processAboutSection(apiSections.about, staticSections.about);

  // Process Testimonials Section
  const testimonialsSection = processTestimonialsSection(apiSections.testimonials, staticSections.testimonials);

  // Process CTA Section
  const ctaSection = processCtaSection(apiSections.cta, staticSections.cta);

  // Process Bottom CTA Section
  const bottomCtaSection = processBottomCtaSection(apiSections.bottomCta, staticSections.bottomCta);

  return {
    heroSection,
    statsSection,
    featuresSection,
    programsSection,
    aboutSection,
    testimonialsSection,
    ctaSection,
    bottomCtaSection,
  };
};

/**
 * Process Hero Section - handles buttons from multiple formats
 */
const processHeroSection = (apiHero, staticHero) => {
  if (!apiHero) return staticHero;

  // Get buttons from multiple possible formats
  const getButtons = () => {
    // First check if buttons array has data
    if (apiHero.buttons && Array.isArray(apiHero.buttons) && apiHero.buttons.length > 0) {
      // Accept buttons that have text (even if link is empty)
      const validButtons = apiHero.buttons.filter(b => b && b.text);
      if (validButtons.length > 0) {
        // Ensure each button has a link (default to '#' if empty)
        return validButtons.map(b => ({
          text: b.text,
          link: b.link || '#',
          style: b.style || 'primary'
        }));
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
        return buttons;
      }
    }

    // Fall back to static
    return staticHero.buttons;
  };

  // Get trust indicators
  const getTrustIndicators = () => {
    if (apiHero.trustIndicators && (apiHero.trustIndicators.avatarCount || apiHero.trustIndicators.text)) {
      return {
        avatarCount: apiHero.trustIndicators.avatarCount || staticHero.trustIndicators?.avatarCount || 4,
        text: apiHero.trustIndicators.text || staticHero.trustIndicators?.text || '500+ Students Graduated'
      };
    }
    return staticHero.trustIndicators || { avatarCount: 4, text: '500+ Students Graduated' };
  };

  // Get images array and clean invalid URLs
  const getImages = () => {
    if (apiHero.images && Array.isArray(apiHero.images) && apiHero.images.length > 0) {
      return cleanImages(apiHero.images);
    }
    return staticHero.images || [];
  };

  const trustIndicators = getTrustIndicators();
  console.log('[useHomeData] Processed trustIndicators:', trustIndicators);

  return {
    sectionId: apiHero.sectionId || staticHero.sectionId,
    title: apiHero.title || staticHero.title,
    subtitle: apiHero.subtitle || staticHero.subtitle,
    description: apiHero.description || staticHero.description,
    images: getImages(),
    buttons: getButtons(),
    trustIndicators: trustIndicators,
    content: apiHero.content || {},
    isActive: apiHero.isActive ?? staticHero.isActive,
    order: apiHero.order ?? staticHero.order,
  };
};

/**
 * Process Stats Section
 */
const processStatsSection = (apiStats, staticStats) => {
  if (!apiStats?.items || apiStats.items.length === 0) {
    return staticStats;
  }

  return {
    sectionId: apiStats.sectionId || staticStats.sectionId,
    title: apiStats.title || staticStats.title,
    items: apiStats.items.map((item, index) => ({
      number: item.number ?? staticStats.items[index]?.number ?? 0,
      suffix: item.suffix ?? staticStats.items[index]?.suffix ?? '',
      label: item.label ?? staticStats.items[index]?.label ?? '',
      icon: item.icon || staticStats.items[index]?.icon,
    })),
    isActive: apiStats.isActive ?? staticStats.isActive,
    order: apiStats.order ?? staticStats.order,
  };
};

/**
 * Process Features Section
 */
const processFeaturesSection = (apiFeatures, staticFeatures) => {
  if (!apiFeatures?.items || apiFeatures.items.length === 0) {
    return staticFeatures;
  }

  return {
    sectionId: apiFeatures.sectionId || staticFeatures.sectionId,
    title: apiFeatures.title || staticFeatures.title,
    subtitle: apiFeatures.subtitle || staticFeatures.subtitle,
    items: apiFeatures.items.map((item, index) => ({
      icon: item.icon || staticFeatures.items[index]?.icon,
      title: item.title ?? staticFeatures.items[index]?.title ?? '',
      description: item.description ?? staticFeatures.items[index]?.description ?? '',
      image: item.image || staticFeatures.items[index]?.image || null,
    })),
    isActive: apiFeatures.isActive ?? staticFeatures.isActive,
    order: apiFeatures.order ?? staticFeatures.order,
  };
};

/**
 * Process Programs Section
 */
const processProgramsSection = (apiPrograms, staticPrograms) => {
  if (!apiPrograms?.items || apiPrograms.items.length === 0) {
    return staticPrograms;
  }

  return {
    sectionId: apiPrograms.sectionId || staticPrograms.sectionId,
    title: apiPrograms.title || staticPrograms.title,
    subtitle: apiPrograms.subtitle || staticPrograms.subtitle,
    description: apiPrograms.description || staticPrograms.description,
    items: apiPrograms.items.map((item, index) => ({
      icon: item.icon || staticPrograms.items[index]?.icon,
      title: item.title ?? staticPrograms.items[index]?.title ?? '',
      description: item.description ?? staticPrograms.items[index]?.description ?? '',
      link: item.link ?? staticPrograms.items[index]?.link ?? '/care-ed',
      image: item.image ?? staticPrograms.items[index]?.image,
    })),
    isActive: apiPrograms.isActive ?? staticPrograms.isActive,
    order: apiPrograms.order ?? staticPrograms.order,
  };
};

/**
 * Process About Section
 */
const processAboutSection = (apiAbout, staticAbout) => {
  if (!apiAbout) return staticAbout;

  // Get buttons from multiple possible formats
  const getButtons = () => {
    if (apiAbout.buttons && Array.isArray(apiAbout.buttons) && apiAbout.buttons.length > 0) {
      // Accept buttons that have text (even if link is empty)
      const validButtons = apiAbout.buttons.filter(b => b && b.text);
      if (validButtons.length > 0) {
        return validButtons.map(b => ({
          text: b.text,
          link: b.link || '#',
          style: b.style || 'primary'
        }));
      }
    }
    return staticAbout.buttons || [];
  };

  // Get badge data
  const getBadge = () => {
    if (apiAbout.badge && (apiAbout.badge.number || apiAbout.badge.label)) {
      return {
        number: apiAbout.badge.number ?? staticAbout.badge?.number ?? 15,
        suffix: apiAbout.badge.suffix ?? staticAbout.badge?.suffix ?? '+',
        label: apiAbout.badge.label || staticAbout.badge?.label || 'Years Teaching'
      };
    }
    return staticAbout.badge || { number: 15, suffix: '+', label: 'Years Teaching' };
  };

  // Get images array and clean invalid URLs
  const getImages = () => {
    if (apiAbout.images && Array.isArray(apiAbout.images) && apiAbout.images.length > 0) {
      return cleanImages(apiAbout.images);
    }
    return staticAbout.images || [];
  };

  return {
    sectionId: apiAbout.sectionId || staticAbout.sectionId,
    title: apiAbout.title || staticAbout.title,
    description: ensureString(apiAbout.description) || staticAbout.description,
    content: ensureString(apiAbout.content) || staticAbout.content,
    features: apiAbout.features?.length > 0 ? apiAbout.features : staticAbout.features,
    images: getImages(),
    badge: getBadge(),
    buttons: getButtons(),
    isActive: apiAbout.isActive ?? staticAbout.isActive,
    order: apiAbout.order ?? staticAbout.order,
  };
};

/**
 * Process Testimonials Section
 */
const processTestimonialsSection = (apiTestimonials, staticTestimonials) => {
  if (!apiTestimonials?.items || apiTestimonials.items.length === 0) {
    return staticTestimonials;
  }

  return {
    sectionId: apiTestimonials.sectionId || staticTestimonials.sectionId,
    title: apiTestimonials.title || staticTestimonials.title,
    description: apiTestimonials.description || staticTestimonials.description,
    items: apiTestimonials.items.map((item, index) => ({
      quote: item.quote ?? item.content ?? staticTestimonials.items[index]?.quote ?? '',
      author: item.author ?? item.name ?? staticTestimonials.items[index]?.author ?? '',
      role: item.role ?? staticTestimonials.items[index]?.role ?? '',
    })),
    isActive: apiTestimonials.isActive ?? staticTestimonials.isActive,
    order: apiTestimonials.order ?? staticTestimonials.order,
  };
};

/**
 * Process CTA Section
 */
const processCtaSection = (apiCta, staticCta) => {
  if (!apiCta) return staticCta;

  // Get buttons from multiple possible formats
  const getButtons = () => {
    if (apiCta.buttons && Array.isArray(apiCta.buttons) && apiCta.buttons.length > 0) {
      // Accept buttons that have text (even if link is empty)
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

  // Get features
  const getFeatures = () => {
    if (apiCta.features && Array.isArray(apiCta.features) && apiCta.features.length > 0) {
      return apiCta.features;
    }
    return staticCta.features || [];
  };

  // Get badge data
  const getBadge = () => {
    if (apiCta.badge && (apiCta.badge.number || apiCta.badge.label)) {
      return {
        number: apiCta.badge.number ?? staticCta.badge?.number ?? 95,
        suffix: apiCta.badge.suffix ?? staticCta.badge?.suffix ?? '%',
        label: apiCta.badge.label || staticCta.badge?.label || 'Job Placement Rate'
      };
    }
    return staticCta.badge || { number: 95, suffix: '%', label: 'Job Placement Rate' };
  };

  // Get images array and clean invalid URLs
  const getImages = () => {
    if (apiCta.images && Array.isArray(apiCta.images) && apiCta.images.length > 0) {
      return cleanImages(apiCta.images);
    }
    return staticCta.images || [];
  };

  return {
    sectionId: apiCta.sectionId || staticCta.sectionId,
    title: apiCta.title || staticCta.title,
    subtitle: apiCta.subtitle || staticCta.subtitle || '',
    description: apiCta.description || staticCta.description,
    features: getFeatures(),
    badge: getBadge(),
    images: getImages(),
    buttons: getButtons(),
    isActive: apiCta.isActive ?? staticCta.isActive,
    order: apiCta.order ?? staticCta.order,
  };
};

/**
 * Process Bottom CTA Section
 */
const processBottomCtaSection = (apiBottomCta, staticBottomCta) => {
  if (!apiBottomCta) return staticBottomCta;

  // Get buttons from multiple possible formats
  const getButtons = () => {
    if (apiBottomCta.buttons && Array.isArray(apiBottomCta.buttons) && apiBottomCta.buttons.length > 0) {
      // Accept buttons that have text (even if link is empty)
      const validButtons = apiBottomCta.buttons.filter(b => b && b.text);
      if (validButtons.length > 0) {
        return validButtons.map(b => ({
          text: b.text,
          link: b.link || '#',
          style: b.style || 'primary'
        }));
      }
    }
    return staticBottomCta.buttons;
  };

  return {
    sectionId: apiBottomCta.sectionId || staticBottomCta.sectionId,
    title: apiBottomCta.title || staticBottomCta.title,
    description: apiBottomCta.description || staticBottomCta.description,
    buttons: getButtons(),
    isActive: apiBottomCta.isActive ?? staticBottomCta.isActive,
    order: apiBottomCta.order ?? staticBottomCta.order,
  };
};

// Export icon map for use in components
export { iconMap };

export default useHomeData;