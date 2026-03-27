import { Link } from "react-router-dom";
import {
  CheckCircle,
  Award,
  Users,
  GraduationCap,
  Target,
  Clock,
  MapPin,
  BadgeCheck,
  Heart,
  Activity,
  BookOpen,
  Briefcase,
  Star,
  Phone,
} from "lucide-react";
import aboutus from "../assets/images/about_bg.jpg";
import mission from "../assets/images/student.png";
import president from "../assets/images/president_2.png";
import clo from "../assets/images/clo.png";
import why_choose from "../assets/images/teaching.jpg";
import AnimatedSection from "../components/AnimatedSection";
import Counter from "../components/Counter";
import useAboutData from "../hooks/useAboutData";

// Icon mapping
const iconMap = {
  GraduationCap,
  Target,
  Users,
  Award,
  CheckCircle,
  Clock,
  MapPin,
  BadgeCheck,
  Heart,
  Activity,
  BookOpen,
  Briefcase,
  Star,
  Phone,
};

// Helper to get icon component from string name
const getIcon = (iconName) => iconMap[iconName] || Award;

// Static fallback data
const staticTimeline = [
  { year: "1987", title: "Company Founded", description: "Care-ed was established by Jean E. Porter Mowatt and Sharon A. O'Brien." },
  { year: "1993", title: "Educational Endowment", description: "Established an Educational Endowment Fund to support caregiver education." },
  { year: "2001", title: "Learn While You Earn", description: "Launched Employee in Action – Learn While You Earn Program." },
  { year: "2007", title: "Care-Ed Learning Center", description: "Founded Care-Ed Learning Center for professional healthcare training." },
  { year: "Today", title: "Continuing Excellence", description: "15+ years of quality healthcare education and professional training programs." },
];

const staticLeadership = [
  {
    name: "Jean E. Porter Mowatt",
    role: "President & CEO",
    bio: "Communications specialist with 39 years in cablevision and print media. Recipient of the Omer Girard Award for innovation in cable television.",
    image: president,
  },
  {
    name: "Sharon A. O'Brien (1938-2024)",
    role: "Executive Vice-President & CLO",
    bio: "RN with social work and gerontology credentials. Developed the PSW program and Foot Care Management Course.",
    image: clo,
  },
];

const staticValues = [
  { icon: GraduationCap, title: "Quality Education", description: "We provide research-based knowledge and skill-building opportunities for healthcare professionals." },
  { icon: Target, title: "Student-Focused", description: "Our programs are designed to meet the needs of students and prepare them for successful careers." },
  { icon: Users, title: "Community-Oriented", description: "We listen and respond to the needs of our community and healthcare industry." },
  { icon: Award, title: "Excellence", description: "We maintain rigorous standards through constant evaluation and licensed instructors." },
];

function About() {
  const {
    heroSection,
    missionSection,
    valuesSection,
    timelineSection,
    leadershipSection,
    locationSection,
    whyChooseSection,
    ctaSection,
    loading,
    fromApi
  } = useAboutData();

  // Map timeline data
  const timeline = timelineSection?.items?.map((item, index) => ({
    year: item.year || staticTimeline[index]?.year,
    title: item.title || staticTimeline[index]?.title,
    description: item.description || staticTimeline[index]?.description,
  })) || staticTimeline;

  // Map leadership data
  const leadership = leadershipSection?.items?.map((item, index) => ({
    name: item.name || staticLeadership[index]?.name,
    role: item.role || staticLeadership[index]?.role,
    bio: item.bio || staticLeadership[index]?.bio,
    // Handle image as URL string or object with url property
    image: item.image?.url || item.image || staticLeadership[index]?.image,
  })) || staticLeadership;

  // Map values data
  const values = valuesSection?.items?.map((item, index) => ({
    icon: getIcon(item.icon) || staticValues[index]?.icon || Award,
    title: item.title || staticValues[index]?.title,
    description: item.description || staticValues[index]?.description,
  })) || staticValues;

  // Map location areas
  const locationAreas = locationSection?.areas || locationSection?.items?.map(item => item.name) || ['Saint John', 'Quispamsis', 'Rothesay', 'Grand Bay-Westfield'];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative lg:min-h-screen min-h-[60vh] text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroSection?.images?.[0]?.url || aboutus}
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

        <div className="container-custom relative lg:min-h-screen min-h-[60vh] flex items-center py-24">
          <div className="max-w-3xl">
            <AnimatedSection animation="fade-up">
              <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary-light px-4 py-2 rounded-full mb-6 backdrop-blur-sm border border-secondary/30">
                <GraduationCap size={16} />
                <span className="text-sm font-medium">{heroSection?.subtitle || "Our Story"}</span>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={100}>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                About <span className="text-secondary-light">{heroSection?.title || "Care-Ed"}</span>
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={200}>
              <p className="text-xl text-gray-200 leading-relaxed mb-8">
                {heroSection?.description || "Professional healthcare education since 2007. We provide quality training programs that prepare students for rewarding careers in healthcare."}
              </p>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={300}>
              <div className="flex flex-wrap gap-4">
                <Link
                  to={heroSection?.buttons?.[0]?.link || "/contact"}
                  className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-full font-semibold transition-all"
                >
                  {heroSection?.buttons?.[0]?.text || "Contact Us"}
                  <CheckCircle size={18} />
                </Link>
                <Link
                  to={heroSection?.buttons?.[1]?.link || "/care-ed"}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-semibold transition-all border border-white/30 backdrop-blur-sm"
                >
                  {heroSection?.buttons?.[1]?.text || "View Programs"}
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="fade-right">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
                {missionSection?.title || "Our Mission"}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {missionSection?.description || `"To provide customized, client-sensitive support services and education programs resulting in improved standards, attitudes and services."`}
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                {missionSection?.content?.vision || "Care-Ed Learning Center, established in 2007, is the educational division of Care-ed Inc. We offer approved training programs including Personal Support Worker (PSW), First Aid & CPR, Foot Care Management, and specialized workshops."}
              </p>
              <div className="grid grid-cols-2 gap-6">
                {(missionSection?.stats || [
                  { number: 15, suffix: "+", label: "Years Teaching" },
                  { number: 100, suffix: "%", label: "Licensed Instructors" }
                ]).map((stat, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 flex items-center justify-between">
                    <div>
                      <div className="text-4xl font-bold text-primary mb-2">
                        <Counter end={stat.number} suffix={stat.suffix} />
                      </div>
                      <div className="text-gray-600">{stat.label}</div>
                    </div>
                    <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center">
                      {index === 0 ? <Award size={28} className="text-secondary" /> : <BadgeCheck size={28} className="text-secondary" />}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-left">
              <img
                src={missionSection?.images?.[0]?.url || mission}
                alt="Healthcare education"
                className="rounded-2xl shadow-xl w-full object-cover h-[400px]"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-10 md:py-20 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                {valuesSection?.title || "Our Values"}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {valuesSection?.subtitle || "The principles that guide our educational programs."}
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" stagger>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg text-center"
                >
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon size={32} className="text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                {timelineSection?.title || "Our Journey"}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {timelineSection?.subtitle || "A legacy of healthcare education and professional training."}
              </p>
            </div>
          </AnimatedSection>
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <AnimatedSection key={index} animation="fade-left" delay={index * 100}>
                <div className="flex gap-8 mb-12 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-secondary rounded-full"></div>
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-secondary/20 mt-2"></div>
                    )}
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6 flex-1">
                    <div className="text-2xl font-bold text-secondary mb-1">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-10 md:py-20 bg-primary">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                {leadershipSection?.title || "Leadership Team"}
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                {leadershipSection?.subtitle || "Dedicated professionals committed to excellence in healthcare education."}
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" stagger>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {leadership.map((person, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl"
                >
                  <div className="h-114 overflow-hidden">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-semibold text-primary mb-1">
                      {person.name}
                    </h3>
                    <div className="text-secondary font-medium mb-4">
                      {person.role}
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {person.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="fade-right">
              <img
                src={whyChooseSection?.images?.[0]?.url || why_choose}
                alt="Healthcare training"
                className="rounded-2xl shadow-xl w-full object-cover h-[400px]"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </AnimatedSection>
            <AnimatedSection animation="fade-left">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
                {whyChooseSection?.title || "Why Choose Care-Ed?"}
              </h2>
              {whyChooseSection?.subtitle && (
                <p className="text-gray-600 text-lg mb-6">
                  {whyChooseSection.subtitle}
                </p>
              )}
              <ul className="space-y-6">
                {(whyChooseSection?.items || [
                  { title: "Approved training programs under NB Private Occupational Training Act" },
                  { title: "Licensed RN/LPN instructors with practical experience" },
                  { title: "Hands-on practicum and professional mentoring" },
                  { title: "Gerontology-based approach to education" },
                  { title: "Job placement support for graduates" },
                  { title: "Small class sizes for personalized attention" },
                ]).map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <CheckCircle
                      className="text-secondary flex-shrink-0 mt-1"
                      size={24}
                    />
                    <span className="text-gray-700 text-lg">{typeof item === 'string' ? item : item.title || item.description}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section className="py-10 md:py-20 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <div className="bg-primary rounded-2xl p-12 text-white">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                    {locationSection?.title || "Location"}
                  </h2>
                  <p className="text-gray-200 mb-8 leading-relaxed">
                    {locationSection?.description || "Conveniently located in Saint John, New Brunswick, serving students from across the region."}
                  </p>
                  <div className="space-y-4">
                    {(locationAreas || ['Saint John', 'Quispamsis', 'Rothesay', 'Grand Bay-Westfield']).map((area, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle
                          size={20}
                          className="text-secondary-light"
                        />
                        <span className="text-lg">{typeof area === 'object' ? area.name : area}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white/10 rounded-4xl p-4">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <MapPin size={24} className="text-secondary-light" />
                        <h3 className="text-xl font-semibold">{locationSection?.visitLabel || "Visit Us"}</h3>
                      </div>
                      <p className="text-gray-200 mb-2">
                        {locationSection?.address?.street || "100 Prince Edward St Unit #111"}
                      </p>
                      <p className="text-gray-200 mb-4">
                        {locationSection?.address?.city || "Saint John, NB E2L 4M5"}
                      </p>
                      <p className="text-gray-200 mb-1">
                        Phone: {locationSection?.phone || "(506) 634-8906"}
                      </p>
                      <p className="text-gray-200">
                        Toll-Free: {locationSection?.tollFree || "1(800) 561-2463"}
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-2xl overflow-hidden aspect-square">
                      <iframe
                        src={locationSection?.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2825.4832!2d-66.0637!3d45.2715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDE2JzE3LjQiTiA2NsKwMDMnNDUuMyJX!5e0!3m2!1sen!2sca!4v1234567890"}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Care-ed Location"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary">
        <div className="container-custom text-center">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold text-white mb-4">
              {ctaSection?.title || "Ready to Start Your Healthcare Career?"}
            </h2>
            <p className="text-white/90 mb-6">
              {ctaSection?.description || "Contact us today to learn more about our programs and enrollment."}
            </p>
            <Link
              to={ctaSection?.buttons?.[0]?.link || "/contact"}
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-secondary px-8 py-4 rounded-full font-semibold transition-colors"
            >
              {ctaSection?.buttons?.[0]?.text || "Contact Us"}
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

export default About;