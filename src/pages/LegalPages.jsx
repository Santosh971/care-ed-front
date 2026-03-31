import { useState, useEffect } from 'react';
import { pagesAPI } from '../services/api';
import { legalStaticData } from '../data/legalStaticData';
import AnimatedSection from '../components/AnimatedSection';
import { Loader2 } from 'lucide-react';

// Generic Legal Page Component for both Privacy Policy and Terms of Service
const LegalPage = ({ pageType }) => {
  const pageId = pageType;
  const staticData = legalStaticData[pageId];

  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fromApi, setFromApi] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await pagesAPI.getPage(pageId);
        if (response.success && response.data) {
          setPageData(response.data);
          setFromApi(true);
        } else {
          setPageData(staticData);
          setFromApi(false);
        }
      } catch (error) {
        console.error('Error fetching legal page:', error);
        setPageData(staticData);
        setFromApi(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [pageId]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-secondary" />
      </div>
    );
  }

  // Check if page is active
  if (pageData?.isActive === false) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container-custom py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-primary mb-4">Page Unavailable</h1>
            <p className="text-gray-600">
              This page is currently unavailable. Please check back later or contact us for more information.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Get page content
  const title = pageData?.title || staticData.title;
  const subtitle = pageData?.subtitle || staticData.subtitle;
  const content = pageData?.content || staticData.content;
  const lastUpdated = pageData?.lastUpdated || staticData.lastUpdated;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16 lg:py-20">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {title}
              </h1>
              {subtitle && (
                <p className="text-lg md:text-xl text-gray-200">
                  {subtitle}
                </p>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 lg:py-16">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
                <div
                  className="prose prose-lg max-w-none
                    prose-headings:text-primary prose-headings:font-semibold
                    prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                    prose-p:text-gray-600 prose-p:mb-4 prose-p:leading-relaxed
                    prose-ul:text-gray-600 prose-ul:mb-4
                    prose-li:mb-2
                    prose-a:text-secondary prose-a:no-underline hover:prose-a:underline
                    prose-address:not-italic prose-address:text-gray-600"
                  dangerouslySetInnerHTML={{ __html: content }}
                />

                {/* Last Updated */}
                {lastUpdated && (
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      <strong>Last Updated:</strong> {new Date(lastUpdated).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

// Privacy Policy Page
export const PrivacyPolicy = () => <LegalPage pageType="privacy-policy" />;

// Terms of Service Page
export const TermsOfService = () => <LegalPage pageType="terms-of-service" />;

export default LegalPage;