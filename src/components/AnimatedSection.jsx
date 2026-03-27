import { useEffect, useRef, useState } from 'react';

const AnimatedSection = ({
  children,
  animation = 'fade-up',
  delay = 0,
  className = '',
  stagger = false,
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const animationClass = stagger ? 'animate-stagger' : `animate-${animation}`;
  const delayClass = delay > 0 ? `delay-${delay}` : '';
  const visibleClass = isVisible ? 'visible' : '';

  return (
    <div
      ref={ref}
      className={`${animationClass} ${delayClass} ${visibleClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;