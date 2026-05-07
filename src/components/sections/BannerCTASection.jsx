import { Link } from 'react-router-dom';
import AnimatedSection from '../AnimatedSection';
import { ArrowRight } from 'lucide-react';

const BannerCTASection = ({ section }) => {
  if (!section || section.isActive === false) return null;

  const { title, description, buttons = [] } = section;

  return (
    <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fade-up">
          <div className="max-w-3xl mx-auto text-center">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xl text-white/90 mb-8">
                {description}
              </p>
            )}

            {buttons && buttons.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4">
                {buttons.map((button, index) => {
                  const isExternal = button.link?.startsWith('http');
                  const ButtonComponent = isExternal ? 'a' : Link;
                  const buttonProps = isExternal
                    ? { href: button.link, target: '_blank', rel: 'noopener noreferrer' }
                    : { to: button.link };

                  return (
                    <ButtonComponent
                      key={index}
                      {...buttonProps}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                        button.style === 'primary'
                          ? 'bg-secondary text-white hover:bg-secondary/90 shadow-lg hover:shadow-xl'
                          : 'bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm'
                      }`}
                    >
                      {button.text}
                      <ArrowRight size={18} />
                    </ButtonComponent>
                  );
                })}
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default BannerCTASection;