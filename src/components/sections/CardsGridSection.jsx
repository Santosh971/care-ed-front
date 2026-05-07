import { Link } from 'react-router-dom';
import AnimatedSection from '../AnimatedSection';
import {
  GraduationCap, Heart, Activity, BookOpen, Award, Briefcase,
  Clock, Users, Star, BadgeCheck, Target, Phone, Home, Building,
  Bed, FileText, ClipboardCheck, DollarSign, Languages, Brain,
  Globe, Calendar, MessageCircle, Hospital, Stethoscope, Pill,
  MessageSquare, Laptop, MapPin, Shield, Scroll, HelpCircle, LifeBuoy, Megaphone
} from 'lucide-react';

const iconMap = {
  GraduationCap, Heart, Activity, BookOpen, Award, Briefcase,
  Clock, Users, Star, BadgeCheck, Target, Phone, Home, Building,
  Bed, FileText, ClipboardCheck, DollarSign, Languages, Brain,
  Globe, Calendar, MessageCircle, Hospital, Stethoscope, Pill,
  MessageSquare, Laptop, MapPin, Shield, Scroll, HelpCircle, LifeBuoy, Megaphone
};

const getIcon = (iconName) => iconMap[iconName] || Award;

const CardsGridSection = ({ section }) => {
  if (!section || section.isActive === false) return null;

  const { title, subtitle, items = [], columns = 3 } = section;

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

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
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </AnimatedSection>

        <div className={`grid ${gridCols[columns] || gridCols[3]} gap-6`}>
          {items.map((item, index) => {
            const IconComponent = getIcon(item.icon);
            const CardWrapper = item.link ? Link : 'div';
            const cardProps = item.link ? { to: item.link } : {};

            return (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <CardWrapper
                  {...cardProps}
                  className={`block bg-gray-50 rounded-xl p-6 transition-all duration-300 ${
                    item.link ? 'hover:bg-secondary/10 hover:shadow-lg cursor-pointer group' : ''
                  }`}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${
                    item.link ? 'bg-secondary/20 text-secondary group-hover:bg-secondary group-hover:text-white' : 'bg-secondary/20 text-secondary'
                  } transition-colors`}>
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-gray-600">
                      {item.description}
                    </p>
                  )}
                </CardWrapper>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CardsGridSection;