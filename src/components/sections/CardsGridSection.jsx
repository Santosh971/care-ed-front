


import { useState } from 'react';
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

const DESCRIPTION_CHAR_LIMIT = 100;

const Card = ({ item, index }) => {
  const [expanded, setExpanded] = useState(false);

  const IconComponent = getIcon(item.icon);
  const CardWrapper = item.link ? Link : 'div';
  const cardProps = item.link ? { to: item.link } : {};

  const isLong = item.description && item.description.length > DESCRIPTION_CHAR_LIMIT;
  const displayText = isLong && !expanded
    ? item.description.slice(0, DESCRIPTION_CHAR_LIMIT).trimEnd() + '...'
    : item.description;

  return (
    <AnimatedSection animation="fade-up" delay={index * 100}>
      <div
        className={`
          group relative flex flex-col
          bg-gray-50 rounded-xl
          border border-transparent
          transition-all duration-300 ease-in-out
          hover:bg-white
          hover:border-secondary/30
          hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]
          hover:-translate-y-1
          h-full min-h-[220px]
        `}
      >
        <CardWrapper
          {...cardProps}
          className={`flex flex-col flex-1 p-6 ${item.link ? 'cursor-pointer' : ''}`}
          onClick={item.link ? undefined : (e) => e.preventDefault()}
        >
          {/* Icon */}
          <div
            className="
              inline-flex items-center justify-center
              w-12 h-12 rounded-lg mb-4 flex-shrink-0
              bg-secondary/15 text-secondary
              transition-all duration-300 ease-in-out
              group-hover:bg-secondary group-hover:text-white
              group-hover:scale-110 group-hover:rounded-xl
            "
          >
            <IconComponent size={24} />
          </div>

          {/* Title */}
          <h3
            className="
              text-xl font-semibold text-primary mb-2 flex-shrink-0
              transition-colors duration-300
              group-hover:text-secondary
            "
          >
            {item.title}
          </h3>

          {/* Description */}
          {item.description && (
            <div className="flex-1 flex flex-col justify-between">
              <p
                className="
                  text-gray-600 text-sm leading-relaxed
                  transition-colors duration-300
                  group-hover:text-gray-700
                "
              >
                {displayText}
              </p>

              {/* Read more / less toggle */}
              {isLong && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setExpanded((prev) => !prev);
                  }}
                  className="
                    mt-3 self-start
                    text-secondary text-sm font-medium
                    flex items-center gap-1
                    hover:underline focus:outline-none
                    transition-all duration-200
                  "
                >
                  {expanded ? 'Show less' : 'Read more'}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14" height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-300 ${expanded ? 'rotate-180' : 'rotate-0'}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Arrow — linked cards only */}
          {item.link && (
            <div
              className="
                mt-4 flex items-center gap-1 flex-shrink-0
                text-secondary text-sm font-medium
                opacity-0 -translate-x-2
                transition-all duration-300
                group-hover:opacity-100 group-hover:translate-x-0
              "
            >
              Learn more
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16" height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          )}
        </CardWrapper>
      </div>
    </AnimatedSection>
  );
};

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

        <div className={`grid ${gridCols[columns] || gridCols[3]} gap-6 items-start`}>
          {items.map((item, index) => (
            <Card key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardsGridSection;