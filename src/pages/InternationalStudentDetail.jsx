import { Link, useParams } from 'react-router-dom';
import { useInternationalStudentPage } from '../hooks/useInternationalStudents';
import { renderSections } from '../components/sections';
import { ChevronLeft } from 'lucide-react';

const InternationalStudentDetail = () => {
  const { slug } = useParams();
  const { data, loading, error, fromApi } = useInternationalStudentPage(slug);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          {/* <Link
            to="/international-students"
            className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80"
          >
            <ChevronLeft size={20} />
            Back to International Students
          </Link> */}
        </div>
      </div>
    );
  }

  // Get all sections - handle both object and array formats
  let sections = [];
  if (data.sections) {
    if (Array.isArray(data.sections)) {
      sections = data.sections;
    } else if (typeof data.sections === 'object') {
      sections = Object.values(data.sections);
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

  // Get page title for breadcrumb
  const pageTitle = data.title || 'International Students';

  return (
    <main>
      {/* Breadcrumb - Hidden
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-secondary">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link to="/international-students" className="text-gray-500 hover:text-secondary">
              International Students
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-primary font-medium">{pageTitle}</span>
          </nav>
        </div>
      </div>
      */}

      {/* Dynamic Sections */}
      {sectionsWithoutTrustIndicators.length > 0 ? (
        renderSections(sectionsWithoutTrustIndicators)
      ) : (
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-primary mb-4">{pageTitle}</h1>
            <p className="text-gray-600">Content coming soon...</p>
          </div>
        </section>
      )}

      {/* Back to International Students Link */}
      {/* <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <Link
            to="/international-students"
            className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 font-medium"
          >
            <ChevronLeft size={20} />
            Back to International Students
          </Link>
        </div>
      </section> */}
    </main>
  );
};

export default InternationalStudentDetail;