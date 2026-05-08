// import AnimatedSection from '../AnimatedSection';
// import { CheckCircle } from 'lucide-react';

// const TimelineStepsSection = ({ section }) => {
//   if (!section || section.isActive === false) return null;

//   const { title, subtitle, items = [], orientation = 'vertical' } = section;

//   return (
//     <section className="py-20 bg-gray-50">
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

//         <div className="max-w-3xl mx-auto">
//           {items.map((item, index) => (
//             <AnimatedSection key={index} animation="fade-left" delay={index * 100}>
//               <div className="relative flex gap-6 pb-10 last:pb-0">
//                 {/* Timeline line */}
//                 {index < items.length - 1 && (
//                   <div className="absolute left-[22px] top-14 bottom-0 w-0.5 bg-secondary/30" />
//                 )}

//                 {/* Step number */}
//                 <div className="flex-shrink-0 w-11 h-11 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-lg z-10">
//                   {item.step || index + 1}
//                 </div>

//                 {/* Content */}
//                 <div className="flex-1 pt-1">
//                   <h3 className="text-xl font-semibold text-primary mb-3">
//                     {item.title}
//                   </h3>
//                   {item.description && (
//                     <p className="text-gray-600">
//                       {item.description}
//                     </p>
//                   )}
//                   {item.date && (
//                     <p className="text-sm text-secondary mt-2 font-medium">
//                       {item.date}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </AnimatedSection>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TimelineStepsSection;


import AnimatedSection from '../AnimatedSection';

const TimelineStepsSection = ({ section }) => {
  if (!section || section.isActive === false) return null;

  const { title, subtitle, items = [] } = section;

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <AnimatedSection animation="fade-up">
          {title && (
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-3 sm:mb-4 text-center">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm sm:text-base text-gray-600 text-center mb-10 sm:mb-12 lg:mb-16 max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </AnimatedSection>

        {/* Timeline */}
        <div className="max-w-2xl lg:max-w-3xl mx-auto">
          {items.map((item, index) => (
            <AnimatedSection
              key={index}
              animation="fade-left"
              delay={index * 100}
            >
              <div className="relative flex gap-4 sm:gap-6 lg:gap-8 pb-8 sm:pb-10 lg:pb-12 last:pb-0">

                {/* Connector line */}
                {index < items.length - 1 && (
                  <div className="absolute left-[20px] sm:left-[22px] top-11 sm:top-12 bottom-0 w-0.5 bg-secondary/30" />
                )}

                {/* Circle */}
                <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-base sm:text-lg z-10 mt-0.5">
                  {item.step || index + 1}
                </div>

                {/* Content */}
                <div className="flex-1 pt-0.5 sm:pt-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-primary mb-1.5 sm:mb-2 leading-snug">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm sm:text-base mb-1.5 text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                  {item.date && (
                    <p className="text-xs sm:text-sm text-secondary mt-2 font-medium">
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