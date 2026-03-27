import { useState, useEffect, useCallback } from 'react';
import { pagesAPI } from '../services/api';
import { careEdStaticData } from '../data/staticData';
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
  Activity,
  Phone
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
  Activity,
  Phone
};

// Helper to get icon component
const getIcon = (iconName) => iconMap[iconName] || Award;

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
 * Custom hook for CareEd (Programs) page data with proper section merging
 * @param {Object} options - Hook options
 * @param {boolean} options.useStaticFallback - Whether to use static data on API failure (default: true)
 * @returns {Object} - Section data + loading, error, fromApi, refetch
 */
export const useCareEdData = (options = {}) => {
  const { useStaticFallback = true } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromApi, setFromApi] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('[useCareEdData] Fetching care-ed page data...');
      const response = await pagesAPI.getPage('care-ed');

      if (response.success && response.data) {
        // Merge with static data for missing sections
        const sectionsMap = {};
        response.data.sections?.forEach(section => {
          if (section.isActive !== false) {
            // Only add if not already present (keep first occurrence)
            if (!sectionsMap[section.sectionId]) {
              sectionsMap[section.sectionId] = section;
            }
          }
        });

        // Add static data for sections not in API response
        if (careEdStaticData?.sections) {
          Object.keys(careEdStaticData.sections).forEach(sectionId => {
            if (!sectionsMap[sectionId]) {
              sectionsMap[sectionId] = {
                ...careEdStaticData.sections[sectionId],
                _isNew: true
              };
            }
          });
        }

        const apiData = {
          pageId: response.data.pageId,
          title: response.data.title,
          sections: sectionsMap,
          metadata: response.data.metadata
        };

        const processedData = processCareEdPageData(apiData);
        setData(processedData);
        setFromApi(true);
        console.log('[useCareEdData] ✅ Successfully loaded data from API');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('[useCareEdData] ❌ API fetch failed:', err.message);

      if (useStaticFallback) {
        console.log('[useCareEdData] ⚠️ Using static fallback');
        const processedData = processCareEdPageData(careEdStaticData);
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
const processCareEdPageData = (pageData) => {
  const apiSections = pageData?.sections || {};
  const staticSections = careEdStaticData.sections;

  return {
    heroSection: processHeroSection(apiSections.hero, staticSections.hero),
    introSection: processIntroSection(apiSections.intro, staticSections.intro),
    programsSection: processProgramsSection(apiSections.programs, staticSections.programs),
    workshopsSection: processWorkshopsSection(apiSections.workshops, staticSections.workshops),
    accreditationsSection: processAccreditationsSection(apiSections.accreditations, staticSections.accreditations),
    instructorsSection: processInstructorsSection(apiSections.instructors, staticSections.instructors),
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

  return {
    sectionId: apiHero.sectionId || staticHero.sectionId,
    title: ensureString(apiHero.title) || staticHero.title,
    subtitle: ensureString(apiHero.subtitle) || staticHero.subtitle,
    description: ensureString(apiHero.description) || staticHero.description,
    badge: apiHero.badge || staticHero.badge,
    images: getImages(),
    isActive: apiHero.isActive ?? staticHero.isActive,
    order: apiHero.order ?? staticHero.order,
  };
};

/**
 * Process Intro Section
 */
const processIntroSection = (apiIntro, staticIntro) => {
  if (!apiIntro) return staticIntro;

  // Process stats
  const getStats = () => {
    if (apiIntro.stats && Array.isArray(apiIntro.stats) && apiIntro.stats.length > 0) {
      return apiIntro.stats.map((stat, index) => ({
        number: stat.number ?? staticIntro.stats[index]?.number ?? 0,
        suffix: stat.suffix ?? staticIntro.stats[index]?.suffix ?? '',
        label: stat.label ?? staticIntro.stats[index]?.label ?? '',
      }));
    }
    return staticIntro.stats || [];
  };

  // Get images array and clean invalid URLs
  const getImages = () => {
    if (apiIntro.images && Array.isArray(apiIntro.images) && apiIntro.images.length > 0) {
      return cleanImages(apiIntro.images);
    }
    return staticIntro.images || [];
  };

  return {
    sectionId: apiIntro.sectionId || staticIntro.sectionId,
    title: ensureString(apiIntro.title) || staticIntro.title,
    description: ensureString(apiIntro.description) || staticIntro.description,
    content: ensureString(apiIntro.content) || staticIntro.content,
    stats: getStats(),
    images: getImages(),
    isActive: apiIntro.isActive ?? staticIntro.isActive,
    order: apiIntro.order ?? staticIntro.order,
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
    subtitle: apiPrograms.subtitle || staticPrograms.subtitle || '',
    items: apiPrograms.items.map((item, index) => ({
      id: item.id ?? staticPrograms.items[index]?.id ?? '',
      icon: item.icon || staticPrograms.items[index]?.icon || 'GraduationCap',
      title: item.title ?? staticPrograms.items[index]?.title ?? '',
      description: item.description ?? staticPrograms.items[index]?.description ?? '',
      duration: item.duration ?? staticPrograms.items[index]?.duration ?? '',
      certification: item.certification ?? staticPrograms.items[index]?.certification ?? '',
      features: item.features?.length > 0 ? item.features : staticPrograms.items[index]?.features ?? [],
      prerequisites: item.prerequisites?.length > 0 ? item.prerequisites : staticPrograms.items[index]?.prerequisites ?? [],
    })),
    isActive: apiPrograms.isActive ?? staticPrograms.isActive,
    order: apiPrograms.order ?? staticPrograms.order,
  };
};

/**
 * Process Workshops Section
 */
const processWorkshopsSection = (apiWorkshops, staticWorkshops) => {
  if (!apiWorkshops?.items || apiWorkshops.items.length === 0) {
    return staticWorkshops;
  }

  return {
    sectionId: apiWorkshops.sectionId || staticWorkshops.sectionId,
    title: apiWorkshops.title || staticWorkshops.title,
    subtitle: apiWorkshops.subtitle || staticWorkshops.subtitle || '',
    items: apiWorkshops.items.map((item, index) => ({
      id: item.id ?? staticWorkshops.items[index]?.id ?? '',
      title: item.title ?? staticWorkshops.items[index]?.title ?? '',
      description: item.description ?? staticWorkshops.items[index]?.description ?? '',
      duration: item.duration ?? staticWorkshops.items[index]?.duration ?? '',
    })),
    isActive: apiWorkshops.isActive ?? staticWorkshops.isActive,
    order: apiWorkshops.order ?? staticWorkshops.order,
  };
};

/**
 * Process Accreditations Section
 */
const processAccreditationsSection = (apiAccreditations, staticAccreditations) => {
  if (!apiAccreditations?.items || apiAccreditations.items.length === 0) {
    return staticAccreditations;
  }

  return {
    sectionId: apiAccreditations.sectionId || staticAccreditations.sectionId,
    title: apiAccreditations.title || staticAccreditations.title,
    subtitle: apiAccreditations.subtitle || staticAccreditations.subtitle || '',
    items: apiAccreditations.items.map((item, index) => ({
      name: item.name ?? staticAccreditations.items[index]?.name ?? '',
      description: item.description ?? staticAccreditations.items[index]?.description ?? '',
    })),
    isActive: apiAccreditations.isActive ?? staticAccreditations.isActive,
    order: apiAccreditations.order ?? staticAccreditations.order,
  };
};

/**
 * Process Instructors Section
 */
const processInstructorsSection = (apiInstructors, staticInstructors) => {
  if (!apiInstructors) return staticInstructors;

  // Get images array and clean invalid URLs
  const getImages = () => {
    if (apiInstructors.images && Array.isArray(apiInstructors.images) && apiInstructors.images.length > 0) {
      return cleanImages(apiInstructors.images);
    }
    return staticInstructors.images || [];
  };

  return {
    sectionId: apiInstructors.sectionId || staticInstructors.sectionId,
    title: apiInstructors.title || staticInstructors.title,
    description: apiInstructors.description || staticInstructors.description,
    features: apiInstructors.features?.length > 0 ? apiInstructors.features : staticInstructors.features || [],
    images: getImages(),
    isActive: apiInstructors.isActive ?? staticInstructors.isActive,
    order: apiInstructors.order ?? staticInstructors.order,
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

export { iconMap, getIcon };
export default useCareEdData;