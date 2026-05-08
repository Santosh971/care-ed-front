// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import AnimatedSection from '../AnimatedSection';
// import {
//   Heart, Brain, Users, BookOpen, Phone, MessageCircle,
//   Hospital, Stethoscope, Pill, Globe, LifeBuoy, Home, ChevronDown
// } from 'lucide-react';

// const iconMap = {
//   Heart, Brain, Users, BookOpen, Phone, MessageCircle,
//   Hospital, Stethoscope, Pill, Globe, LifeBuoy, Home
// };

// const getIcon = (iconName) => iconMap[iconName] || Heart;

// const DESCRIPTION_CHAR_LIMIT = 120;

// const SupportCard = ({ item, index }) => {
//   const [expanded, setExpanded] = useState(false);

//   const IconComponent = getIcon(item.icon);

//   const isLong = item.description && item.description.length > DESCRIPTION_CHAR_LIMIT;
//   const displayText = isLong && !expanded
//     ? item.description.slice(0, DESCRIPTION_CHAR_LIMIT).trimEnd() + '...'
//     : item.description;

//   return (
//     <AnimatedSection animation="fade-up" delay={index * 100}>
//       <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
//         <div className="flex items-start gap-4 flex-1">
//           <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary/20 text-secondary flex items-center justify-center">
//             <IconComponent size={24} />
//           </div>
//           <div className="flex-1 flex flex-col">
//             <h3 className="text-lg font-semibold text-primary mb-2">
//               {item.title}
//             </h3>
//             {item.description && (
//               <div className="flex-1">
//                 <p className="text-gray-600 text-sm mb-2">
//                   {displayText}
//                 </p>
//                 {isLong && (
//                   <button
//                     type="button"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       e.stopPropagation();
//                       setExpanded((prev) => !prev);
//                     }}
//                     className="text-secondary text-sm font-medium flex items-center gap-1 hover:underline focus:outline-none"
//                   >
//                     {expanded ? 'Show less' : 'Read more'}
//                     <ChevronDown
//                       size={14}
//                       className={`transition-transform duration-200 ${expanded ? 'rotate-180' : 'rotate-0'}`}
//                     />
//                   </button>
//                 )}
//               </div>
//             )}
//             {item.contactInfo && (
//               <p className="text-secondary font-medium text-sm mt-auto">
//                 {item.contactInfo}
//               </p>
//             )}
//             {item.link && (
//               <Link
//                 to={item.link}
//                 className="inline-block text-secondary hover:text-secondary/80 font-medium text-sm mt-2"
//               >
//                 Learn more →
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </AnimatedSection>
//   );
// };

// const SupportCardsSection = ({ section }) => {
//   if (!section || section.isActive === false) return null;

//   const { title, subtitle, items = [], columns = 2 } = section;

//   const gridCols = {
//     1: 'grid-cols-1',
//     2: 'grid-cols-1 md:grid-cols-2',
//     3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
//     4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
//   };

//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <AnimatedSection animation="fade-up">
//           {title && (
//             <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
//               {title}
//             </h2>
//           )}
//           {subtitle && (
//             <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
//               {subtitle}
//             </p>
//           )}
//         </AnimatedSection>

//         <div className={`grid ${gridCols[columns] || gridCols[2]} gap-6 max-w-4xl mx-auto items-stretch`}>
//           {items.map((item, index) => (
//             <SupportCard key={index} item={item} index={index} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SupportCardsSection;




import { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../AnimatedSection';
import {
  Heart, Brain, Users, BookOpen, Phone, MessageCircle,
  Hospital, Stethoscope, Pill, Globe, LifeBuoy, Home, ChevronDown
} from 'lucide-react';

const iconMap = {
  Heart, Brain, Users, BookOpen, Phone, MessageCircle,
  Hospital, Stethoscope, Pill, Globe, LifeBuoy, Home
};

const getIcon = (iconName) => iconMap[iconName] || Heart;

const DESCRIPTION_CHAR_LIMIT = 120;

const SupportCard = ({ item, index }) => {
  const [expanded, setExpanded] = useState(false);

  const IconComponent = getIcon(item.icon);

  const isLong = item.description && item.description.length > DESCRIPTION_CHAR_LIMIT;
  const displayText = isLong && !expanded
    ? item.description.slice(0, DESCRIPTION_CHAR_LIMIT).trimEnd() + '...'
    : item.description;

  return (
    <AnimatedSection animation="fade-up" delay={index * 100}>
      <div className="
        group relative flex flex-col
        bg-white rounded-xl
        border border-transparent
        shadow-md
        transition-all duration-300 ease-in-out
        hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]
        hover:border-secondary/30
        hover:-translate-y-1
        h-full min-h-[180px]
      ">
        <div className="flex items-start gap-4 flex-1 p-6">

          {/* Icon */}
          <div className="
            flex-shrink-0 w-12 h-12 rounded-lg
            bg-secondary/20 text-secondary
            flex items-center justify-center
            transition-all duration-300
            group-hover:bg-secondary group-hover:text-white
            group-hover:scale-110 group-hover:rounded-xl
          ">
            <IconComponent size={24} />
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col min-w-0">

            {/* Title */}
            <h3 className="
              text-lg font-semibold text-primary mb-2
              transition-colors duration-300
              group-hover:text-secondary
            ">
              {item.title}
            </h3>

            {/* Description */}
            {item.description && (
              <div className="flex-1 flex flex-col">
                <p className="text-gray-600 text-sm leading-relaxed mb-2
                  transition-colors duration-300
                  group-hover:text-gray-700
                ">
                  {displayText}
                </p>

                {/* Read more / Show less */}
                {isLong && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setExpanded((prev) => !prev);
                    }}
                    className="
                      self-start
                      text-secondary text-sm font-medium
                      flex items-center gap-1
                      hover:underline focus:outline-none
                      transition-all duration-200
                    "
                  >
                    {expanded ? 'Show less' : 'Read more'}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${
                        expanded ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </button>
                )}
              </div>
            )}

            {/* Contact info — pinned to bottom */}
            {item.contactInfo && (
              <p className="text-secondary font-medium text-sm mt-auto pt-2">
                {item.contactInfo}
              </p>
            )}

            {/* Learn more link */}
            {item.link && (
              <Link
                to={item.link}
                className="
                  inline-flex items-center gap-1
                  text-secondary hover:text-secondary/80
                  font-medium text-sm mt-2
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
              </Link>
            )}

          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

const SupportCardsSection = ({ section }) => {
  if (!section || section.isActive === false) return null;

  const { title, subtitle, items = [], columns = 2 } = section;

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
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

        <div className={`grid ${gridCols[columns] || gridCols[2]} gap-6 items-start`}>
          {items.map((item, index) => (
            <SupportCard key={index} item={item} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default SupportCardsSection;