import AnimatedSection from '../AnimatedSection';
import { CheckCircle } from 'lucide-react';

const TimelineStepsSection = ({ section }) => {
  if (!section || section.isActive === false) return null;

  const { title, subtitle, items = [], orientation = 'vertical' } = section;

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

        <div className="max-w-3xl mx-auto">
          {items.map((item, index) => (
            <AnimatedSection key={index} animation="fade-left" delay={index * 100}>
              <div className="relative flex gap-6 pb-8 last:pb-0">
                {/* Timeline line */}
                {index < items.length - 1 && (
                  <div className="absolute left-[22px] top-12 bottom-0 w-0.5 bg-secondary/30" />
                )}

                {/* Step number */}
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-lg z-10">
                  {item.step || index + 1}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-gray-600">
                      {item.description}
                    </p>
                  )}
                  {item.date && (
                    <p className="text-sm text-secondary mt-2 font-medium">
                      {item.date}
                    </p>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineStepsSection;