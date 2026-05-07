import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';

const FAQSection = ({ section }) => {
  if (!section || section.isActive === false) return null;

  const { title, subtitle, items = [] } = section;
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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

        <div className="max-w-3xl mx-auto space-y-4">
          {items.map((item, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-primary pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-secondary flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-4 text-gray-600">
                    {item.answer}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;