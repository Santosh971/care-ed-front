import AnimatedSection from '../AnimatedSection';
import { ArrowRight } from 'lucide-react';

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
    <section className="relative min-h-[60vh] flex items-center">
      {/* Background Image */}
      {heroImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80" />
        </div>
      )}

      {/* Fallback gradient background */}
      {!heroImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary" />
      )}

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl">
          <AnimatedSection animation="fade-up">
            {subtitle && (
              <p className="text-secondary font-medium mb-4 text-lg">
                {subtitle}
              </p>
            )}
            {title && (
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                {description}
              </p>
            )}

            {/* Buttons */}
            {buttons && buttons.length > 0 && (
              <div className="flex flex-wrap gap-4 mb-8">
                {buttons.map((button, index) => (
                  <a
                    key={index}
                    href={button.link}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      button.style === 'primary'
                        ? 'bg-secondary text-white hover:bg-secondary/90 shadow-lg hover:shadow-xl'
                        : 'bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm'
                    }`}
                  >
                    {button.text}
                    <ArrowRight size={18} />
                  </a>
                ))}
              </div>
            )}

            {/* Trust Indicators */}
            {trustIndicators && (
              <div className="flex items-center gap-4 text-white/80">
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
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;