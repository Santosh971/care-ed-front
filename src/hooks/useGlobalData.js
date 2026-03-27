import { useState, useEffect, useCallback } from 'react';
import { pagesAPI } from '../services/api';
import { globalStaticData } from '../data/staticData';

/**
 * Helper function to convert object-like strings back to proper strings
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
 * Custom hook for Global settings (navbar, footer)
 * @param {Object} options - Hook options
 * @param {boolean} options.useStaticFallback - Whether to use static data on API failure (default: true)
 * @returns {Object} - { navbarSection, footerSection, loading, error, fromApi, refetch }
 */
export const useGlobalData = (options = {}) => {
  const { useStaticFallback = true } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fromApi, setFromApi] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('[useGlobalData] Fetching global settings...');
      const response = await pagesAPI.getPage('global');

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

        const processedData = processGlobalData(apiData);
        setData(processedData);
        setFromApi(true);
        console.log('[useGlobalData] ✅ Successfully loaded data from API');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('[useGlobalData] ❌ API fetch failed:', err.message);

      if (useStaticFallback) {
        console.log('[useGlobalData] ⚠️ Using static fallback');
        const processedData = processGlobalData(globalStaticData);
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
 * Process and merge API data with static fallback
 */
const processGlobalData = (pageData) => {
  const apiSections = pageData?.sections || {};
  const staticSections = globalStaticData.sections;

  return {
    brandingSection: processBrandingSection(apiSections.branding, staticSections.branding),
    navbarSection: processNavbarSection(apiSections.navbar, staticSections.navbar),
    footerSection: processFooterSection(apiSections.footer, staticSections.footer),
  };
};

/**
 * Process Branding Section
 */
const processBrandingSection = (apiBranding, staticBranding) => {
  if (!apiBranding) return staticBranding;

  return {
    sectionId: ensureString(apiBranding.sectionId) || staticBranding.sectionId,
    title: ensureString(apiBranding.title) || staticBranding.title,
    content: {
      siteName: ensureString(apiBranding.content?.siteName) || staticBranding.content?.siteName || '',
      logo: {
        url: ensureString(apiBranding.content?.logo?.url) || staticBranding.content?.logo?.url || '',
        alt: ensureString(apiBranding.content?.logo?.alt) || staticBranding.content?.logo?.alt || 'Logo',
        publicId: ensureString(apiBranding.content?.logo?.publicId) || staticBranding.content?.logo?.publicId || '',
      },
      logoLight: {
        url: ensureString(apiBranding.content?.logoLight?.url) || staticBranding.content?.logoLight?.url || '',
        alt: ensureString(apiBranding.content?.logoLight?.alt) || staticBranding.content?.logoLight?.alt || 'Logo Light',
        publicId: ensureString(apiBranding.content?.logoLight?.publicId) || staticBranding.content?.logoLight?.publicId || '',
      },
      favicon: {
        url: ensureString(apiBranding.content?.favicon?.url) || staticBranding.content?.favicon?.url || '',
        publicId: ensureString(apiBranding.content?.favicon?.publicId) || staticBranding.content?.favicon?.publicId || '',
      },
    },
    isActive: apiBranding.isActive ?? staticBranding.isActive,
    order: apiBranding.order ?? staticBranding.order,
  };
};

/**
 * Process Navbar Section
 */
const processNavbarSection = (apiNavbar, staticNavbar) => {
  if (!apiNavbar) return staticNavbar;

  return {
    sectionId: ensureString(apiNavbar.sectionId) || staticNavbar.sectionId,
    title: ensureString(apiNavbar.title) || staticNavbar.title,
    content: {
      links: apiNavbar.content?.links || staticNavbar.content?.links || [],
      ctaButton: apiNavbar.content?.ctaButton || staticNavbar.content?.ctaButton || {},
      contactInfo: {
        phone: ensureString(apiNavbar.content?.contactInfo?.phone) || staticNavbar.content?.contactInfo?.phone || '',
        email: ensureString(apiNavbar.content?.contactInfo?.email) || staticNavbar.content?.contactInfo?.email || '',
      },
      tagline: ensureString(apiNavbar.content?.tagline) || staticNavbar.content?.tagline || '',
    },
    isActive: apiNavbar.isActive ?? staticNavbar.isActive,
    order: apiNavbar.order ?? staticNavbar.order,
  };
};

/**
 * Process Footer Section
 */
const processFooterSection = (apiFooter, staticFooter) => {
  if (!apiFooter) return staticFooter;

  return {
    sectionId: ensureString(apiFooter.sectionId) || staticFooter.sectionId,
    title: ensureString(apiFooter.title) || staticFooter.title,
    content: {
      companyInfo: {
        name: ensureString(apiFooter.content?.companyInfo?.name) || staticFooter.content?.companyInfo?.name || '',
        description: ensureString(apiFooter.content?.companyInfo?.description) || staticFooter.content?.companyInfo?.description || '',
        address: ensureString(apiFooter.content?.companyInfo?.address) || staticFooter.content?.companyInfo?.address || '',
      },
      quickLinks: apiFooter.content?.quickLinks || staticFooter.content?.quickLinks || [],
      programs: apiFooter.content?.programs || staticFooter.content?.programs || [],
      socialLinks: apiFooter.content?.socialLinks || staticFooter.content?.socialLinks || [],
      contactInfo: {
        phone: ensureString(apiFooter.content?.contactInfo?.phone) || staticFooter.content?.contactInfo?.phone || '',
        email: ensureString(apiFooter.content?.contactInfo?.email) || staticFooter.content?.contactInfo?.email || '',
        address: ensureString(apiFooter.content?.contactInfo?.address) || ensureString(apiFooter.content?.companyInfo?.address) || staticFooter.content?.contactInfo?.address || '',
      },
      copyright: ensureString(apiFooter.content?.copyright) || staticFooter.content?.copyright || '',
      privacyLink: ensureString(apiFooter.content?.privacyLink) || staticFooter.content?.privacyLink || '/privacy',
      termsLink: ensureString(apiFooter.content?.termsLink) || staticFooter.content?.termsLink || '/terms',
    },
    isActive: apiFooter.isActive ?? staticFooter.isActive,
    order: apiFooter.order ?? staticFooter.order,
  };
};

export default useGlobalData;