import { Link } from "react-router-dom";
import {
  Phone,
  ChevronRight,
  CheckCircle,
  GraduationCap,
  BookOpen,
  Award,
  Users,
} from "lucide-react";
import train from "../assets/images/train.jpg";
import Professional from "../assets/images/professional.jpg";
import Instructors from "../assets/images/instructors.jpg";
import AnimatedSection from "../components/AnimatedSection";
import Counter from "../components/Counter";
import useCareEdData, { iconMap, getIcon } from "../hooks/useCareEdData";
import useGlobalData from "../hooks/useGlobalData";
import { getGmailLink } from "../utils/email";

function CareEd() {
  const {
    heroSection,
    introSection,
    programsSection,
    workshopsSection,
    accreditationsSection,
    instructorsSection,
    ctaSection,
    loading,
    fromApi
  } = useCareEdData();

  // Get global contact settings for fallback
  const { contactSection } = useGlobalData();
  const globalContact = contactSection?.content || {};

  // Map programs data
  const programs = programsSection?.items?.map((item) => ({
    ...item,
    icon: getIcon(item.icon || 'GraduationCap'),
  })) || [];

  // Map workshops data
  const workshops = workshopsSection?.items || [];

  // Map accreditations data
  const accreditations = accreditationsSection?.items || [];

  // Map instructors features
  const instructorFeatures = instructorsSection?.features || [];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary-dark text-white overflow-hidden lg:min-h-[50vh] lg:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: heroSection?.images?.[0]?.url ? `url(${heroSection.images[0].url})` : `url(${train})` }}
        ></div>

        <div className="container-custom relative py-10 lg:py-32">
          <div className="max-w-3xl items-center py-10 lg:py-24">
            <AnimatedSection animation="fade-up">
              <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary-light px-4 py-2 rounded-full mb-6">
                <GraduationCap size={16} />
                <span className="text-sm font-medium">
                  {heroSection?.badge?.text || heroSection?.subtitle || "Professional Training Since 1987"}
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={100}>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                {heroSection?.title || "Care-Ed Learning Center"}
              </h1>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <p className="text-xl text-gray-200 leading-relaxed">
                {heroSection?.description || "Professional healthcare education and training programs designed to prepare students for successful careers."}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="fade-right">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
                {introSection?.title || "Professional Healthcare Education"}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {introSection?.description || "Care-Ed Learning Center is officially registered under the NB Private Occupational Training Act. We provide comprehensive training programs for individuals seeking careers in healthcare and professional certifications."}
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {introSection?.content || "Our goal is to provide research-based knowledge and skill-building opportunities that prepare students for rewarding healthcare careers with licensed instructors and hands-on training."}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {(introSection?.stats || [
                  { number: 15, suffix: "+", label: "Years of Training" },
                  { number: 100, suffix: "%", label: "Licensed Instructors" }
                ]).map((stat, index) => (
                  <div key={index} className="bg-secondary/10 rounded-xl p-4">
                    <div className="text-3xl font-bold text-primary">
                      <Counter end={stat.number} suffix={stat.suffix} />
                    </div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-left">
              <img
                src={introSection?.images?.[0]?.url || Professional}
                alt="Training classroom"
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

      {/* Main Programs Section */}
      <section className="py-10 md:py-20 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                {programsSection?.title || "Our Programs"}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {programsSection?.subtitle || "Comprehensive training programs designed to prepare you for a rewarding career in healthcare."}
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" stagger>
            <div className="space-y-8">
              {programs.map((program, index) => (
                <div
                  key={program.id || index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <program.icon size={32} className="text-secondary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-primary mb-2">
                          {program.title}
                        </h3>
                        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                          {program.duration}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {program.description}
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-primary mb-3">
                          What You'll Learn:
                        </h4>
                        <ul className="space-y-2">
                          {program.features?.map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-2 text-gray-700"
                            >
                              <CheckCircle size={16} className="text-secondary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {program.prerequisites && program.prerequisites.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-primary mb-3">
                            Prerequisites:
                          </h4>
                          <ul className="space-y-2">
                            {program.prerequisites.map((prereq, idx) => (
                              <li
                                key={idx}
                                className="flex items-center gap-2 text-gray-700 text-sm"
                              >
                                <ChevronRight
                                  size={16}
                                  className="text-primary"
                                />
                                {prereq}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-full font-semibold transition-colors"
                      >
                        Contact Us
                        <ChevronRight size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Workshops Section */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                {workshopsSection?.title || "Workshops"}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {workshopsSection?.subtitle || "Short, focused workshops to enhance your skills and meet certification requirements."}
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" stagger>
            <div className="grid md:grid-cols-3 gap-8">
              {workshops.map((workshop, index) => (
                <div key={workshop.id || index} className="bg-gray-50 rounded-2xl p-8 shadow-lg">
                  <div className="inline-block bg-secondary text-white px-3 py-1 rounded-full text-sm mb-4">
                    {workshop.duration}
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-4">
                    {workshop.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {workshop.description}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Accreditation Section */}
      <section className="py-10 md:py-20 bg-primary">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                {accreditationsSection?.title || "Accreditations & Memberships"}
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                {accreditationsSection?.subtitle || "Registered under NB Private Occupational Training Act with licensed instructors."}
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" stagger>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {accreditations.map((acc, index) => (
                <div
                  key={index}
                  className="bg-white/10 rounded-2xl p-8 text-center"
                >
                  <Award
                    size={40}
                    className="text-secondary-light mx-auto mb-4"
                  />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {acc.name}
                  </h3>
                  <p className="text-gray-300">{acc.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Instructor Section */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="fade-right">
              <img
                src={instructorsSection?.images?.[0]?.url || Instructors}
                alt="Professional instructors"
                className="rounded-2xl shadow-xl w-full object-cover h-[400px]"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </AnimatedSection>
            <AnimatedSection animation="fade-left">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
                {instructorsSection?.title || "Qualified Instructors"}
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {instructorsSection?.description || "All our instructors hold current RN or LPN licenses and bring years of practical experience to the classroom. We maintain rigorous standards through constant evaluation of our teaching staff."}
              </p>
              <ul className="space-y-4">
                {instructorFeatures.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="text-secondary" size={20} />
                    <span className="text-gray-700">{typeof item === 'string' ? item : item.title || item.description}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-20 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <div className="bg-secondary rounded-2xl p-12 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                {ctaSection?.title || "Ready to Start Your Healthcare Career?"}
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                {ctaSection?.description || "Contact us today to learn more about our programs or to register for an upcoming session."}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to={ctaSection?.buttons?.[0]?.link || "/contact"}
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-secondary px-8 py-4 rounded-full font-semibold transition-colors"
                >
                  {ctaSection?.buttons?.[0]?.text || "Contact Us"}
                  <ChevronRight size={20} />
                </Link>
                {ctaSection?.buttons?.[1] && (
                  <a
                    href={ctaSection.buttons[1].link}
                    className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold transition-colors border-2 border-white"
                  >
                    <Phone size={20} />
                    {ctaSection.buttons[1].text}
                  </a>
                )}
              </div>
              {/* {ctaSection?.contactEmail && (
                <p className="text-white/80 mt-6">
                  <strong>Contact:</strong> {ctaSection.contactName || 'Us'} at{' '}
                  <a href={getGmailLink(ctaSection.contactEmail)} className="underline">
                    {ctaSection.contactEmail}
                  </a>
                </p>
              )} */}
              {(globalContact.contactPersonName || globalContact.email) && (
                <p className="text-white/80 mt-6">
                  <strong>Contact:</strong> {globalContact.contactPersonName || 'Heidi'} at{' '}
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                      globalContact.email || ' info@carelearning.ca'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {globalContact.email || ' info@carelearning.ca'}
                  </a>
                </p>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

export default CareEd;