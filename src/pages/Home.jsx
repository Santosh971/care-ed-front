import { Link } from "react-router-dom";
import {
  Heart,
  GraduationCap,
  Users,
  Phone,
  ChevronRight,
  Activity,
  BookOpen,
  Briefcase,
  Award,
  Star,
  BadgeCheck,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import training_2 from "../assets/images/training.jpg";
import backimg from "../assets/images/college.jpg";
import Personal from "../assets/images/personal.webp";
import foot from "../assets/images/foot.jpg";
import cpr from "../assets/images/cpr.jpg";
import join from "../assets/images/joinus.avif";
import AnimatedSection from "../components/AnimatedSection";
import Counter from "../components/Counter";
import useHomeData, { iconMap } from "../hooks/useHomeData";

// Helper to get icon component from string name
const getIcon = (iconName) => iconMap[iconName] || Award;

// Static images for programs fallback
const staticImages = {
  Personal,
  foot,
  cpr,
  training: backimg
};

function Home() {
  const {
    heroSection,
    statsSection,
    featuresSection,
    programsSection,
    aboutSection,
    testimonialsSection,
    ctaSection,
    bottomCtaSection,
    loading,
    fromApi
  } = useHomeData();

  // Process stats for display - convert icon strings to components
  const stats = statsSection?.items?.map((item) => ({
    ...item,
    icon: getIcon(item.icon)
  })) || [];

  // Process features for display
  const features = featuresSection?.items?.map((item) => ({
    ...item,
    icon: getIcon(item.icon)
  })) || [];

  // Process programs for display
  const programs = programsSection?.items?.map((item, index) => ({
    ...item,
    icon: getIcon(item.icon),
    image: item.image || Object.values(staticImages)[index] || Personal
  })) || [];

  // Process testimonials for display
  const testimonials = testimonialsSection?.items || [];

  // Hero section data
  const heroTitle = heroSection?.title || "Build Your Healthcare Career";
  const heroSubtitle = heroSection?.subtitle || "Professional Healthcare Training Since 2007";
  const heroDescription = heroSection?.description || "Quality education and professional training programs for aspiring healthcare professionals. Get certified and start making a difference.";
  const heroImage = heroSection?.images?.[0]?.url || backimg;

  return (
    <div>
      {/* Hero Section - Full Size Background Image */}
      <section
        className="relative lg:min-h-screen min-h-[65vh] text-white overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "left",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60"></div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>

        <div className="container-custom relative lg:min-h-screen min-h-[60vh] flex items-center py-20 md:py-24 pb-32 md:pb-20">
          <div className="max-w-2xl">
            <AnimatedSection animation="fade-up">
              <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary-light px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-4 md:mb-6 backdrop-blur-sm border border-secondary/30">
                <GraduationCap size={14} className="md:w-4 md:h-4" />
                <span className="text-xs md:text-sm font-medium">
                  {heroSubtitle}
                </span>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={100}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                {heroTitle.split(' ').map((word, i) =>
                  word === 'Career' || word === 'Healthcare' ? (
                    <span key={i} className="text-secondary-light">{word} </span>
                  ) : (
                    <span key={i}>{word} </span>
                  )
                )}
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={200}>
              <p className="text-base md:text-lg lg:text-xl text-gray-200 mb-6 md:mb-8 leading-relaxed">
                {heroDescription}
              </p>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={300}>
              <div className="flex flex-wrap gap-3 md:gap-4 mb-8 md:mb-12">
                <Link
                  to={heroSection?.buttons?.[0]?.link || "/care-ed"}
                  className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-sm md:text-base transition-all transform hover:scale-105 shadow-lg shadow-secondary/30"
                >
                  {heroSection?.buttons?.[0]?.text || "Explore Programs"}
                  <ChevronRight size={16} className="md:w-5 md:h-5" />
                </Link>
                <Link
                  to={heroSection?.buttons?.[1]?.link || "/contact"}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-sm md:text-base transition-all border border-white/30 backdrop-blur-sm"
                >
                  <Phone size={16} className="md:w-5 md:h-5" />
                  {heroSection?.buttons?.[1]?.text || "Contact Us"}
                </Link>
              </div>
            </AnimatedSection>

            {/* Trust Indicators */}
            <AnimatedSection animation="fade-up" delay={400}>
              <div className="flex flex-wrap items-center gap-4 md:gap-8">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {Array.from({ length: heroSection?.trustIndicators?.avatarCount || 4 }, (_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-secondary-light to-secondary flex items-center justify-center text-white text-xs font-bold border-2 border-white/30"
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs md:text-sm text-gray-200">
                    {heroSection?.trustIndicators?.text || "500+ Students Graduated"}
                  </span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex items-start justify-center pt-2">
            <div className="w-1 h-3 bg-white/60 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Stats Section - Floating Cards */}
      <section className="py-4 md:py-8 bg-transparent relative -mt-16 md:-mt-24 z-10">
        <div className="container-custom">
          <AnimatedSection animation="fade-up" stagger>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-4 md:p-6 text-center hover:shadow-2xl transition-all transform hover:-translate-y-1 border border-gray-100"
                >
                  <stat.icon
                    size={20}
                    className="text-secondary mx-auto mb-2 md:mb-3 md:w-6 md:h-6"
                  />
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-1">
                    <Counter end={stat.number} suffix={stat.suffix} />
                  </div>
                  <div className="text-gray-600 text-xs md:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <AnimatedSection animation="fade-up" stagger>
            <div className="grid md:grid-cols-3 gap-4 md:gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 md:gap-4 p-4 md:p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-all border border-gray-100"
                >
                  {feature.image ? (
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-secondary to-secondary-dark rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon
                        size={20}
                        className="text-white md:w-6 md:h-6"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-primary mb-1 md:mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-10 md:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-8 md:mb-12 lg:mb-16">
              <span className="inline-block bg-secondary/10 text-secondary px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4">
                {programsSection?.subtitle || "Our Programs"}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3 md:mb-4">
                {programsSection?.title || "Healthcare Training Programs"}
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                {programsSection?.description || "Accredited programs designed to prepare you for a rewarding career in healthcare."}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" stagger>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
              {programs.map((program, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  {/* Top Section - Image */}
                  <div className="relative h-36 md:h-48 overflow-hidden bg-gradient-to-br from-primary to-primary-dark">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {program.image ? (
                        <>
                          <img
                            src={program.image}
                            alt={program.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/60 to-transparent"></div>
                        </>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <program.icon size={48} className="text-white/20" />
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <program.icon
                          size={20}
                          className="text-white md:w-6 md:h-6"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Section - Content */}
                  <div className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-primary mb-2 md:mb-3 group-hover:text-secondary transition-colors duration-300">
                      {program.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-3 md:mb-4 line-clamp-3">
                      {program.description}
                    </p>
                    <Link
                      to={program.link || '/care-ed'}
                      className="inline-flex items-center gap-2 text-secondary hover:text-secondary-dark font-semibold text-sm md:text-base transition-colors group/link"
                    >
                      Learn More
                      <ArrowRight
                        size={16}
                        className="group-hover/link:translate-x-1 transition-transform duration-300"
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={300}>
            <div className="text-center">
              <Link
                to="/care-ed"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-6 py-3 md:px-10 md:py-4 rounded-full font-semibold text-sm md:text-base transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                View All Programs <ChevronRight size={18} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* About Section */}
      <section className="py-10 md:py-20 lg:py-24 bg-gradient-to-br from-primary via-primary to-primary-dark text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <div className="absolute top-20 right-20 w-64 h-64 bg-secondary rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-40 w-48 h-48 bg-white rounded-full blur-3xl"></div>
          </div>
        </div>
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <AnimatedSection animation="fade-right">
              <div className="relative">
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-16 h-16 md:w-20 md:h-20 bg-secondary/30 rounded-xl"></div>
                  <img
                    src={aboutSection?.images?.[0]?.url || training_2}
                    alt="About Care-Ed"
                    className="rounded-2xl md:rounded-3xl shadow-2xl w-full object-cover h-64 md:h-[400px] lg:h-[500px] relative z-10"
                    loading="lazy"
                  />
                  <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-secondary text-white p-4 md:p-8 rounded-xl md:rounded-2xl shadow-xl z-20">
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold">
                      <Counter end={aboutSection?.badge?.number || 15} suffix={aboutSection?.badge?.suffix || "+"} />
                    </div>
                    <div className="text-sm md:text-lg">{aboutSection?.badge?.label || "Years Teaching"}</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-left">
              <span className="inline-block bg-secondary/20 text-secondary-light px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4">
                About Us
              </span>
              {/* <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 md:mb-6">
                {aboutSection?.title || "Professional Healthcare Education & Training"}
              </h2> */}
              <h2 className="text-2xl md:text-3xl lg:text-[43px] font-bold mb-4 md:mb-6 ">
                {aboutSection?.title || "Professional Healthcare Education & Training"}
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-200 mb-4 md:mb-6 leading-relaxed">
                {aboutSection?.description || "Care-Ed Learning Center has been providing quality healthcare education and professional training since 2007. Our programs are designed to prepare students for rewarding careers in healthcare."}
              </p>
              <p className="text-gray-300 text-sm md:text-base mb-6 md:mb-8 leading-relaxed">
                {aboutSection?.content || "We offer approved training programs with hands-on practicums, classroom lectures, and professional mentoring. Our goal is to provide research-based knowledge and skill-building opportunities."}
              </p>
              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                {(aboutSection?.features || [
                  "Licensed RN/LPN Instructors",
                  "Approved Training Programs",
                  "Hands-on Practicum",
                  "Job Placement Support",
                ]).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 md:gap-3 bg-white/10 rounded-lg md:rounded-xl p-3 md:p-4 backdrop-blur-sm"
                  >
                    <CheckCircle
                      className="text-secondary-light flex-shrink-0"
                      size={16}
                    />
                    <span className="text-white text-xs md:text-sm lg:text-base">
                      {typeof item === 'string' ? item : item.title || item}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                to={aboutSection?.buttons?.[0]?.link || "/about"}
                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-sm md:text-base transition-all shadow-lg"
              >
                {aboutSection?.buttons?.[0]?.text || "Learn More About Us"} <ChevronRight size={18} />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonialsSection?.isActive !== false && (
        <section className="py-10 md:py-20 lg:py-24 bg-white">
          <div className="container-custom">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-8 md:mb-12 lg:mb-16">
                <span className="inline-block bg-secondary/10 text-secondary px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4">
                  Testimonials
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-primary mb-3 md:mb-4">
                  {testimonialsSection?.title || "What Our Students Say"}
                </h2>
                <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                  {testimonialsSection?.description || "Hear from our graduates who have successfully started their healthcare careers."}
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" stagger>
              {/* <div className="grid md:grid-cols-3 gap-4 md:gap-8">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-lg border border-gray-100 relative"
                  >
                    <div className="absolute top-4 md:top-6 left-6 md:left-8 text-4xl md:text-6xl text-secondary/20 font-serif">
                      "
                    </div>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 md:mb-6 relative z-10 pt-6 md:pt-8">
                      {testimonial.quote}
                    </p>
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base">
                        {testimonial.author?.charAt(0) || 'A'}
                      </div>
                      <div>
                        <div className="font-semibold text-primary text-sm md:text-base">
                          {testimonial.author}
                        </div>
                        <div className="text-xs md:text-sm text-gray-500">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div> */}
              <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-lg border border-gray-100 relative flex flex-col h-full min-h-[220px] md:min-h-[260px]"
                  >
                    <div className="absolute top-4 md:top-6 left-6 md:left-8 text-4xl md:text-6xl text-secondary/20 font-serif">
                      "
                    </div>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 md:mb-6 relative z-10 pt-6 md:pt-8 flex-1">
                      {testimonial.quote}
                    </p>
                    <div className="flex items-center gap-3 md:gap-4 mt-auto">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base flex-shrink-0">
                        {testimonial.author?.charAt(0) || 'A'}
                      </div>
                      <div>
                        <div className="font-semibold text-primary text-sm md:text-base">
                          {testimonial.author}
                        </div>
                        <div className="text-xs md:text-sm text-gray-500">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-10 md:py-20 lg:py-24 bg-gradient-to-br from-secondary to-secondary-dark text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <AnimatedSection animation="fade-right">
              <span className="inline-block bg-white/20 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4">
                {ctaSection?.subtitle || "Start Your Journey"}
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-4 md:mb-6">
                {ctaSection?.title || "Ready to Begin Your Healthcare Career?"}
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-white/90 mb-6 md:mb-8 leading-relaxed">
                {ctaSection?.description || "Join hundreds of graduates who have successfully started their careers in healthcare through our professional training programs."}
              </p>
              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                {(ctaSection?.features || [
                  { icon: 'GraduationCap', label: 'PSW Program' },
                  { icon: 'Heart', label: 'First Aid & CPR' },
                  { icon: 'Activity', label: 'Foot Care' },
                  { icon: 'BookOpen', label: 'Workshops' },
                ]).map((item, index) => {
                  const IconComponent = iconMap[item.icon] || GraduationCap;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-white/10 rounded-lg md:rounded-xl backdrop-blur-sm"
                    >
                      <IconComponent
                        size={18}
                        className="text-white/80 md:w-6 md:h-6"
                      />
                      <span className="text-white text-xs md:text-sm lg:text-base font-medium">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
              <Link
                to={ctaSection?.buttons?.[0]?.link || "/contact"}
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-secondary px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-sm md:text-base transition-all shadow-lg"
              >
                {ctaSection?.buttons?.[0]?.text || "Contact Us"} <ChevronRight size={18} />
              </Link>
            </AnimatedSection>
            <AnimatedSection animation="fade-left">
              <div className="relative">
                <img
                  src={ctaSection?.images?.[0]?.url || join}
                  alt="Healthcare students"
                  className="rounded-2xl md:rounded-3xl shadow-2xl w-full object-cover h-64 md:h-[400px] lg:h-[500px]"
                  loading="lazy"
                />
                <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white text-primary p-4 md:p-6 rounded-xl md:rounded-2xl shadow-xl">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary rounded-full flex items-center justify-center">
                      <GraduationCap className="text-white" size={20} />
                    </div>
                    <div>
                      <div className="text-xl md:text-2xl lg:text-3xl font-bold">
                        <Counter end={ctaSection?.badge?.number || 95} suffix={ctaSection?.badge?.suffix || "%"} />
                      </div>
                      <div className="text-gray-600 text-xs md:text-sm">
                        {ctaSection?.badge?.label || "Job Placement Rate"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-10 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-dark to-secondary"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
        </div>
        <div className="container-custom relative text-center">
          <AnimatedSection animation="fade-up">
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
              {bottomCtaSection?.title || "Enroll in Our Programs Today"}
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-white/90 mb-6 md:mb-10 max-w-2xl mx-auto px-4">
              {bottomCtaSection?.description || "Take the first step toward a rewarding career in healthcare. Contact us to learn more about our programs and enrollment."}
            </p>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              <Link
                to={bottomCtaSection?.buttons?.[0]?.link || "/care-ed"}
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-primary px-6 py-3 md:px-10 md:py-5 rounded-full font-semibold text-sm md:text-base lg:text-lg transition-all shadow-lg"
              >
                {bottomCtaSection?.buttons?.[0]?.text || "View Programs"}
              </Link>
              <Link
                to={bottomCtaSection?.buttons?.[1]?.link || "/contact"}
                className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 text-white px-6 py-3 md:px-10 md:py-5 rounded-full font-semibold text-sm md:text-base lg:text-lg transition-all border-2 border-white"
              >
                <Phone size={18} className="md:w-5 md:h-5 lg:w-6 lg:h-6" />
                {bottomCtaSection?.buttons?.[1]?.text || "Contact Us"}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

export default Home;