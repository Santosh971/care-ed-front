// Page-specific data hooks
export { useHomeData, iconMap as homeIconMap } from './useHomeData';
export { useAboutData, iconMap as aboutIconMap } from './useAboutData';
export { useCareEdData, iconMap as careEdIconMap } from './useCareEdData';
export { useContactData, iconMap as contactIconMap } from './useContactData';

// Generic page data hook (kept for backward compatibility)
export { usePageData, useSection, useUpdateSection } from './usePageData';

// Global data hooks
export { useGlobalData } from './useGlobalData';
export { useContact, useContactData } from './useContact';

// Scroll animation hook
export { useScrollAnimation } from './useScrollAnimation';