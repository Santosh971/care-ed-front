import AnimatedSection from '../AnimatedSection';
import { ArrowRight, GraduationCap } from 'lucide-react';

const HeroSection = ({ section }) => {
  if (!section || section.isActive === false) return null;

  const {
    title,
    subtitle,
    description,
    images = [],
    buttons = [],
    trustIndicators
  } = section;

  const heroImage = images?.[0]?.url;

  return (
    <section className="relative bg-gradient-to-br from-primary to-primary-dark text-white overflow-hidden lg:min-h-[50vh] lg:py-24">
      {/* Background Image */}
      {heroImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
      )}

      <div className="container-custom relative py-10 lg:py-32">
        <div className="max-w-3xl items-center py-10 lg:py-24">
          <AnimatedSection animation="fade-up">
            {subtitle && (
              <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary-light px-4 py-2 rounded-full mb-6">
                <GraduationCap size={16} />
                <span className="text-sm font-medium">{subtitle}</span>
              </div>
            )}
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={100}>
            {title && (
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                {title}
              </h1>
            )}
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            {description && (
              <p className="text-xl text-gray-200 leading-relaxed">
                {description}
              </p>
            )}
          </AnimatedSection>

          {/* Buttons */}
          {buttons && buttons.length > 0 && (
            <AnimatedSection animation="fade-up" delay={300}>
              <div className="flex flex-wrap gap-4 mt-8">
                {buttons.map((button, index) => (
                  <a
                    key={index}
                    href={button.link}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${button.style === 'primary'
                        ? 'bg-secondary text-white hover:bg-secondary/90 shadow-lg hover:shadow-xl'
                        : 'bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm'
                      }`}
                  >
                    {button.text}
                    <ArrowRight size={18} />
                  </a>
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* Trust Indicators */}
          {trustIndicators && (
            <div className="flex items-center gap-4 text-white/80 mt-8">
              <div className="flex -space-x-2">
                {Array.from({ length: trustIndicators.avatarCount || 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-secondary/50 flex items-center justify-center text-sm font-medium"
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span className="text-sm">{trustIndicators.text || 'Students trust us'}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;