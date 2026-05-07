import AnimatedSection from '../AnimatedSection';

const RichTextSection = ({ section }) => {
  if (!section || section.isActive === false) return null;

  const { title, subtitle, content, introduction, contentBlocks } = section;

  // Check if using new structured format or legacy HTML format
  const hasStructuredContent = contentBlocks && contentBlocks.length > 0;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fade-up">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-gray-600 text-lg text-center mb-8 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}

          {/* New structured content format */}
          {hasStructuredContent ? (
            <div className="max-w-4xl mx-auto">
              {introduction && (
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  {introduction}
                </p>
              )}

              {contentBlocks.map((block, blockIndex) => (
                <div key={blockIndex} className="mb-8 last:mb-0">
                  {block.heading && (
                    <h3 className="text-xl font-semibold text-primary mb-4">
                      {block.heading}
                    </h3>
                  )}
                  {block.description && (
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {block.description}
                    </p>
                  )}
                  {block.items && block.items.length > 0 && (
                    <ul className="space-y-2">
                      {block.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex gap-3 text-gray-600">
                          <span className="text-secondary mt-1">•</span>
                          <span>
                            {item.title && <strong className="text-primary">{item.title}:</strong>} {item.description}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* Rich text HTML content format */
            content && (
              <div className="max-w-4xl mx-auto">
                <div
                  className="prose prose-lg prose-headings:text-primary prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-600 prose-li:text-gray-600 prose-ul:list-disc prose-ol:list-decimal"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            )
          )}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default RichTextSection;