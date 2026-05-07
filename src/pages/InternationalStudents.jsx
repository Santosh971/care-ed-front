import { Link } from 'react-router-dom';
import { useInternationalStudentsLanding, useInternationalStudentsNav } from '../hooks/useInternationalStudents';
import { renderSections } from '../components/sections';
import AnimatedSection from '../components/AnimatedSection';
import {
  GraduationCap, FileText, ClipboardCheck, DollarSign, Languages,
  Home, Heart, Brain, Users, BookOpen, Globe, Shield, HelpCircle, Phone, Link as LinkIcon
} from 'lucide-react';

const iconMap = {
  GraduationCap, FileText, ClipboardCheck, DollarSign, Languages,
  Home, Heart, Brain, Users, BookOpen, Globe, Shield, HelpCircle, Phone, Link: LinkIcon
};

const getIcon = (iconName) => iconMap[iconName] || BookOpen;

// Quick Links component for landing page
const QuickLinksSection = ({ pages, loading }) => {
  if (loading || !pages || pages.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
            Resources for International Students
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Everything you need to know about studying with us as an international student
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {pages.map((page, index) => (
            <AnimatedSection key={page.pageId || index} animation="fade-up" delay={index * 50}>
              <Link
                to={`/international-students/${page.slug}`}
                className="block bg-white rounded-lg p-4 shadow-sm hover:shadow-md hover:bg-secondary/5 transition-all group"
              >
                <h3 className="font-medium text-primary group-hover:text-secondary transition-colors text-center">
                  {page.title}
                </h3>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

const InternationalStudents = () => {
  const { data: landingData, loading: landingLoading, error: landingError } = useInternationalStudentsLanding();
  const { pages: navPages, loading: navLoading } = useInternationalStudentsNav();

  // Show loading state
  if (landingLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Use data from API or fallback
  const pageData = landingData || {
    pageId: 'international-students',
    title: 'International Students',
    sections: {}
  };

  // Get sections - handle both object and array formats
  let sections = [];
  if (pageData.sections) {
    if (Array.isArray(pageData.sections)) {
      sections = pageData.sections;
    } else if (typeof pageData.sections === 'object') {
      sections = Object.values(pageData.sections);
    }
  }

  // Sort sections by order
  sections.sort((a, b) => (a.order || 0) - (b.order || 0));

  // Filter active sections
  const activeSections = sections.filter(s => s.isActive !== false);

  // Remove trust indicators from sections for International Students pages
  const sectionsWithoutTrustIndicators = activeSections.map(section => {
    const { trustIndicators, ...rest } = section;
    return rest;
  });

  return (
    <main>
      {/* Render all sections dynamically */}
      {sectionsWithoutTrustIndicators.length > 0 ? (
        renderSections(sectionsWithoutTrustIndicators)
      ) : (
        // Fallback content if no sections
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-primary mb-4">International Students</h1>
            <p className="text-gray-600">Content coming soon...</p>
          </div>
        </section>
      )}

      {/* Quick Links Section - Using navigation data */}
      <QuickLinksSection pages={navPages} loading={navLoading} />
    </main>
  );
};

export default InternationalStudents;