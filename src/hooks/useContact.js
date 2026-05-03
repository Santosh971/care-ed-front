import { useGlobalData } from './useGlobalData';

/**
 * Hook to get contact information from global settings
 * Provides a single source of truth for all contact info across the site
 *
 * @returns {Object} contact object with all contact fields
 */
export function useContact() {
  const { contactSection } = useContactData();
  return contactSection;
}

/**
 * Separate hook for contact data processing
 * This allows useGlobalData to be mocked in tests
 */
export function useContactData() {
  const globalData = useGlobalData();

  // Default fallback values
  const defaultContact = {
    phone: '(506) 634-8906',
    phoneLink: 'tel:+15066348906',
    email: 'info@carelearning.ca',
    emailSecondary: 'train@seniorwatch.com',
    contactPersonName: 'Heidi',
    address: {
      street: '100 Prince Edward St Unit #111',
      city: 'Saint John',
      province: 'NB',
      postalCode: 'E2L 4M5',
      full: '100 Prince Edward St Unit #111, Saint John, NB E2L 4M5'
    },
    serviceAreas: ['Saint John', 'Quispamsis', 'Rothesay', 'Grand Bay-Westfield']
  };

  // Get contact section from global data
  const contactSection = globalData?.contactSection || defaultContact;

  return {
    contactSection,
    loading: globalData?.loading || false,
    fromApi: globalData?.fromApi || false
  };
}

export default useContact;