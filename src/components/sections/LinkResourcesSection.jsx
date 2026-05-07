import { ExternalLink } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';

const LinkResourcesSection = ({ section }) => {
  if (!section || section.isActive === false) return null;

  const { title, subtitle, items = [] } = section;

  // Group items by category if available
  const groupedItems = items.reduce((acc, item) => {
    const category = item.category || 'General';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  const isExternalUrl = (url) => url.startsWith('http://') || url.startsWith('https://');

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fade-up">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          {Object.entries(groupedItems).map(([category, categoryItems], categoryIndex) => (
            <AnimatedSection key={category} animation="fade-up" delay={categoryIndex * 100}>
              {Object.keys(groupedItems).length > 1 && (
                <h3 className="text-lg font-semibold text-secondary mb-4 mt-8 first:mt-0">
                  {category}
                </h3>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryItems.map((item, index) => {
                  const isExternal = isExternalUrl(item.url);
                  const LinkComponent = isExternal ? 'a' : 'a';
                  const linkProps = isExternal
                    ? { href: item.url, target: '_blank', rel: 'noopener noreferrer' }
                    : { href: item.url };

                  return (
                    <LinkComponent
                      key={index}
                      {...linkProps}
                      className="block bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-primary group-hover:text-secondary transition-colors">
                            {item.title}
                          </h4>
                          {item.description && (
                            <p className="text-sm text-gray-600 mt-1">
                              {item.description}
                            </p>
                          )}
                        </div>
                        {isExternal && (
                          <ExternalLink size={16} className="text-gray-400 group-hover:text-secondary flex-shrink-0 ml-2" />
                        )}
                      </div>
                    </LinkComponent>
                  );
                })}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LinkResourcesSection;