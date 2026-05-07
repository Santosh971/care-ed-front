import { Link } from 'react-router-dom';
import AnimatedSection from '../AnimatedSection';
import {
  Heart, Brain, Users, BookOpen, Phone, MessageCircle,
  Hospital, Stethoscope, Pill, Globe, LifeBuoy, Home
} from 'lucide-react';

const iconMap = {
  Heart, Brain, Users, BookOpen, Phone, MessageCircle,
  Hospital, Stethoscope, Pill, Globe, LifeBuoy, Home
};

const getIcon = (iconName) => iconMap[iconName] || Heart;

const SupportCardsSection = ({ section }) => {
  if (!section || section.isActive === false) return null;

  const { title, subtitle, items = [] } = section;

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {items.map((item, index) => {
            const IconComponent = getIcon(item.icon);

            return (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary/20 text-secondary flex items-center justify-center">
                      <IconComponent size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-gray-600 text-sm mb-2">
                          {item.description}
                        </p>
                      )}
                      {item.contactInfo && (
                        <p className="text-secondary font-medium text-sm">
                          {item.contactInfo}
                        </p>
                      )}
                      {item.link && (
                        <Link
                          to={item.link}
                          className="inline-block text-secondary hover:text-secondary/80 font-medium text-sm mt-2"
                        >
                          Learn more →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SupportCardsSection;