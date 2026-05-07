// Section components for International Students pages
// Each component receives a 'section' prop and renders the appropriate section type

import HeroSection from './HeroSection';
import RichTextSection from './RichTextSection';
import FAQSection from './FAQSection';
import CardsGridSection from './CardsGridSection';
import TimelineStepsSection from './TimelineStepsSection';
import PolicyTableSection from './PolicyTableSection';
import SupportCardsSection from './SupportCardsSection';
import ContactCardSection from './ContactCardSection';
import LinkResourcesSection from './LinkResourcesSection';
import BannerCTASection from './BannerCTASection';

// Section type to component mapping
const sectionComponents = {
  hero: HeroSection,
  richText: RichTextSection,
  faq: FAQSection,
  faq_2: FAQSection,
  faq_3: FAQSection,
  faq_4: FAQSection,
  cardsGrid: CardsGridSection,
  timelineSteps: TimelineStepsSection,
  policyTable: PolicyTableSection,
  policyTable_2: PolicyTableSection,
  supportCards: SupportCardsSection,
  contactCard: ContactCardSection,
  linkResources: LinkResourcesSection,
  linkResources_2: LinkResourcesSection,
  linkResources_3: LinkResourcesSection,
  linkResources_4: LinkResourcesSection,
  bannerCTA: BannerCTASection
};

// Render a section by type
export const renderSection = (section, key = null) => {
  if (!section || section.isActive === false) return null;

  const SectionComponent = sectionComponents[section.sectionId] ||
    sectionComponents[section.sectionId.split('_')[0]];

  if (!SectionComponent) {
    console.warn(`Unknown section type: ${section.sectionId}`);
    return null;
  }

  return <SectionComponent key={key} section={section} />;
};

// Render all sections for a page
export const renderSections = (sections = []) => {
  if (!sections || !Array.isArray(sections)) return null;

  // Filter active sections and sort by order
  const activeSections = sections
    .filter(section => section.isActive !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return activeSections.map((section, index) =>
    renderSection(section, section.sectionId || index)
  );
};

// Export individual components
export {
  HeroSection,
  RichTextSection,
  FAQSection,
  CardsGridSection,
  TimelineStepsSection,
  PolicyTableSection,
  SupportCardsSection,
  ContactCardSection,
  LinkResourcesSection,
  BannerCTASection
};

// Export default mapping
export default sectionComponents;