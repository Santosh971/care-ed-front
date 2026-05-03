import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Briefcase,
  Heart,
  Users,
  GraduationCap,
  CheckCircle,
  ChevronRight,
  ArrowRight,
  Building2,
  Target,
  Rocket,
  Award,
  FileText,
  Loader2,
  Send,
} from "lucide-react";
import care from "../assets/images/care.jpg";
import join from "../assets/images/joinus.avif";
import AnimatedSection from "../components/AnimatedSection";
import { usePageData } from "../hooks/usePageData";
import { useGlobalData } from "../hooks/useGlobalData";
import { careersStaticData } from "../data/staticData";
import { getGmailLink } from "../utils/email";
import { contactAPI } from "../services/api";
import { useState } from "react";
// Icon mapping for dynamic icon rendering
const iconMap = {
  Heart,
  Users,
  GraduationCap,
  Clock,
  Briefcase,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Building2,
  Target,
  Rocket,
  Award,
  FileText,
};

// Static Career Services data (student-focused)
const careerServicesData = [
  {
    id: "job-placement-assistance",
    title: "Job Placement Assistance",
    subtitle: "Connecting you with top healthcare employers",
    description: "We connect graduates with healthcare employers and job opportunities across New Brunswick.",
    icon: Briefcase,
    imageUrl: "/images/career-job-placement.jpg"
  },
  {
    id: "resume-building",
    title: "Resume Building",
    subtitle: "Stand out with a professional healthcare resume",
    description: "Professional resume support to help you stand out in the healthcare job market.",
    icon: FileText,
    imageUrl: "/images/career-resume.jpg"
  },
  {
    id: "interview-preparation",
    title: "Interview Preparation",
    subtitle: "Walk in confident, walk out hired",
    description: "Mock interviews and expert guidance to help you succeed in your job interviews.",
    icon: Users,
    imageUrl: "/images/career-interview.jpg"
  },
  {
    id: "career-counselling",
    title: "Career Counselling",
    subtitle: "Your career path, guided by experts",
    description: "One-on-one guidance to plan your career path in the healthcare industry.",
    icon: Target,
    imageUrl: "/images/career-counselling.jpg"
  },
  {
    id: "internship-support",
    title: "Internship Support",
    subtitle: "Real-world experience through our partner network",
    description: "Hands-on training and real-world experience through our partner network.",
    icon: GraduationCap,
    imageUrl: "/images/career-internship.jpg"
  },
  {
    id: "skill-development",
    title: "Skill Development",
    subtitle: "Workshops to sharpen your professional edge",
    description: "Workshops for communication, workplace readiness, and professional growth.",
    icon: Rocket,
    imageUrl: "/images/career-skills.jpg"
  },
];

// Career Journey Steps
const careerJourneySteps = [
  {
    title: "Learn",
    description: "Enroll in our accredited programs",
    icon: GraduationCap,
  },
  {
    title: "Train",
    description: "Gain hands-on practical experience",
    icon: Award,
  },
  {
    title: "Internship",
    description: "Real-world placement opportunities",
    icon: Briefcase,
  },
  {
    title: "Get Hired",
    description: "Launch your healthcare career",
    icon: Rocket,
  },
];

function Careers() {
  const { data: pageData } = usePageData('careers');
  const { contactSection } = useGlobalData();

  // Get global contact info for fallback
  const globalContact = contactSection?.content || {};

  // Get sections from API or use static fallback
  const heroSection = pageData?.sections?.hero || careersStaticData.sections.hero;
  const careerServicesSection = pageData?.sections?.careerServices || careersStaticData.sections.careerServices;
  const careerJourneySection = pageData?.sections?.careerJourney || careersStaticData.sections.careerJourney;
  const whyJoinUsSection = pageData?.sections?.whyJoinUs || careersStaticData.sections.whyJoinUs;
  const positionsSection = pageData?.sections?.positions || careersStaticData.sections.positions;
  const benefitsSection = pageData?.sections?.benefits || careersStaticData.sections.benefits;
  const employerConnectionsSection = pageData?.sections?.employerConnections || careersStaticData.sections.employerConnections;
  const generalRequirementsSection = pageData?.sections?.generalRequirements || careersStaticData.sections.generalRequirements;
  const trainingCardSection = pageData?.sections?.trainingCard || careersStaticData.sections.trainingCard;
  const howToApplySection = pageData?.sections?.howToApply || careersStaticData.sections.howToApply;
  const ctaSection = pageData?.sections?.cta || careersStaticData.sections.cta;

  // Get contact info from Global Settings (site-wide contact details)
  // "Email Us" card - uses primary email from global settings
  const contactEmail = globalContact.email || "info@carelearning.ca";
  // "Call Us" card - uses phone display and link from global settings
  const contactPhone = globalContact.phone || "(506) 634-8906";
  const contactPhoneLink = globalContact.phoneLink || "tel:+15066348906";

  // Get icon component from string name
  const getIcon = (iconName) => iconMap[iconName] || CheckCircle;

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null); // "success" | "error" | null

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormStatus(null);
    try {
      const response = await contactAPI.submit({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        source: "careers-hero-form",
      });
      if (response.success) {
        setFormStatus("success");
        setFormData({ name: "", email: "", phone: "", interest: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setFormStatus("error");
    } finally {
      setFormSubmitting(false);
    }
  };
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary-dark text-white overflow-hidden lg:min-h-[60vh] py-10 lg:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${join})` }}
        />

        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10"
            style={{
              background: "radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)",
              animation: "pulse 6s ease-in-out infinite",
            }}
          />
          <div
            className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full opacity-5"
            style={{
              background: "radial-gradient(circle, white 0%, transparent 70%)",
              animation: "pulse 8s ease-in-out infinite 2s",
            }}
          />
        </div>

        <div className="container-custom relative py-10 lg:py-16">
          <div className="grid lg:grid-cols-[1fr_420px] gap-12 items-center">

            {/* Left — Hero Text (care-ed style) */}
            <div className="max-w-3xl py-4 lg:py-8">
              <AnimatedSection animation="fade-up">
                <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary-light px-4 py-2 rounded-full mb-6">
                  <GraduationCap size={16} />
                  <span className="text-sm font-medium">{heroSection?.badge?.text || heroSection?.subtitle || "Student Success Center"}</span>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={100}>
                <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                  {heroSection?.title || "Career Services"}
                </h1>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={200}>
                <p className="text-xl text-gray-200 leading-relaxed">
                  {heroSection?.description || "We support our students throughout their journey — from training to job placement and beyond. Our career services team helps you build skills, find opportunities, and launch your healthcare career."}
                </p>
              </AnimatedSection>
            </div>

            {/* Right — Animated Floating Form */}
            {/* Right — Animated Floating Form */}
            <div
              style={{
                animation: "floatCard 5s ease-in-out infinite",
              }}
            // className="absolute left-[1000px] bottom-[-150px] -translate-x-1/3 translate-y-1/2"
            >
              <style>{`
    @keyframes floatCard {
      0%, 100% { transform: translateY(-6px); }
      50% { transform: translateY(-16px); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 0.1; }
      50% { transform: scale(1.15); opacity: 0.18; }
    }
  `}</style>

              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-secondary to-secondary-dark" />

                <div className="p-5 lg:p-6">
                  <h2 className="text-lg font-bold text-primary mb-1 text-center">
                    Get Career Guidance
                  </h2>
                  <p className="text-xs text-gray-500 text-center mb-4">
                    Fill in the form and we'll contact you.
                  </p>

                  <form onSubmit={handleFormSubmit} className="space-y-3">

                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Jane Doe"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="jane@example.com"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="(506) 000-0000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        How can we help?
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        placeholder="How can we help you?"
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-colors"
                    >
                      {formSubmitting ? "Sending..." : "Submit"}
                      {!formSubmitting && <ChevronRight size={16} />}
                    </button>

                    {formStatus === "success" && (
                      <p className="text-green-600 text-xs text-center font-medium">
                        ✓ Submitted successfully
                      </p>
                    )}
                    {formStatus === "error" && (
                      <p className="text-red-500 text-xs text-center">
                        Something went wrong
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Our Career Services Section */}
      <section className="py-10 md:py-20 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                {careerServicesSection?.title || "Our Career Services"}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {careerServicesSection?.subtitle || "We help students become job-ready and successfully placed in the healthcare industry."}
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(careerServicesSection?.items || careerServicesData).map((service, index) => {
                const IconComponent = getIcon(service.icon) || (typeof service.icon === 'function' ? service.icon : CheckCircle);
                // Generate service ID from title if not provided
                const serviceId = service.id || service.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || `service-${index}`;
                return (
                  <Link
                    key={index}
                    to={`/careers/services/${serviceId}`}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden flex flex-col h-[230px]"
                  >
                    {/* Circular image background or fallback */}
                    <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
                      {service.imageUrl ? (
                        <img
                          src={service.imageUrl}
                          alt=""
                          className="w-full h-full object-cover rounded-bl-full opacity-10"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.classList.add('bg-secondary/20', 'rounded-bl-full');
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-secondary/20 rounded-bl-full" />
                      )}
                    </div>

                    {/* Top content — grows to fill space */}
                    <div className="flex flex-col flex-1 min-h-0">
                      <IconComponent size={28} className="text-secondary mb-3 flex-shrink-0" />
                      <h3 className="text-lg font-semibold text-primary mb-1 group-hover:text-secondary transition-colors line-clamp-1 flex-shrink-0">
                        {service.title}
                      </h3>
                      {service.subtitle && (
                        <p className="text-sm text-secondary mb-1 line-clamp-1 flex-shrink-0">
                          {service.subtitle}
                        </p>
                      )}
                      <p className="text-gray-600 text-sm line-clamp-2 flex-shrink-0">
                        {service.description}
                      </p>
                    </div>

                    {/* Learn more — always pinned to bottom */}
                    <div className="mt-auto pt-3 flex items-center gap-1 text-secondary text-sm font-medium flex-shrink-0">
                      Learn more
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Your Career Journey Section */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                {careerJourneySection?.title || "Your Career Journey"}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {careerJourneySection?.subtitle || "A clear path from education to employment — we guide you every step of the way."}
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="grid md:grid-cols-4 gap-4">
              {(careerJourneySection?.items || careerJourneySteps).map((step, index) => {
                const IconComponent = getIcon(step.icon) || (typeof step.icon === 'function' ? step.icon : CheckCircle);
                return (
                  <div key={index} className="relative">
                    <div className="bg-primary/5 rounded-xl p-6 text-center h-full">
                      <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent size={28} className="text-secondary" />
                      </div>
                      <div className="text-sm text-secondary font-semibold mb-2">
                        Step {index + 1}
                      </div>
                      <h3 className="text-xl font-semibold text-primary mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {step.description}
                      </p>
                    </div>
                    {index < (careerJourneySection?.items || careerJourneySteps).length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                        <ArrowRight className="text-secondary" size={24} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-10 md:py-20 bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="fade-right">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
                {whyJoinUsSection.title}
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {whyJoinUsSection.description}
              </p>
              <div className="grid grid-cols-2 gap-6">
                {benefitsSection.items?.map((benefit, index) => {
                  const IconComponent = getIcon(benefit.icon);
                  return (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                      <IconComponent size={28} className="text-secondary mb-4" />
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-left">
              <img
                src={benefitsSection.sectionImage?.url || care}
                alt="Healthcare professionals"
                className="rounded-2xl shadow-xl w-full object-cover h-[510px]"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Employer Connections Section */}
      <section className="py-10 md:py-20 bg-primary text-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fade-right">
              <div className="flex items-center gap-3 mb-4">
                <Building2 size={32} className="text-secondary-light" />
                <h2 className="text-3xl lg:text-4xl font-bold">
                  {employerConnectionsSection?.title || "Employer Connections"}
                </h2>
              </div>
              <p className="text-gray-200 mb-6 leading-relaxed text-lg">
                {employerConnectionsSection?.description || "We maintain strong relationships with healthcare facilities, nursing homes, and home care providers across New Brunswick. Our graduates are sought after by employers who value quality training."}
              </p>
              <ul className="space-y-3">
                {(employerConnectionsSection?.points || [
                  "Direct connections with healthcare employers",
                  "Job placement assistance for graduates",
                  "Internship opportunities with partner facilities",
                  "Career guidance from industry professionals"
                ]).map((point, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="text-secondary-light flex-shrink-0" size={20} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
            <AnimatedSection animation="fade-left">
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur">
                <h3 className="text-xl font-semibold mb-4">
                  {employerConnectionsSection?.ctaCard?.title || "For Healthcare Employers"}
                </h3>
                <p className="text-gray-200 mb-6">
                  {employerConnectionsSection?.ctaCard?.description || "Looking to hire qualified healthcare professionals? Partner with us to access trained and certified graduates ready to make an impact."}
                </p>
                <Link
                  to={employerConnectionsSection?.ctaCard?.buttonLink || "/contact"}
                  className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-full font-medium transition-colors"
                >
                  {employerConnectionsSection?.ctaCard?.buttonText || "Partner With Us"}
                  <ChevronRight size={18} />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Work With Us Section (Open Positions) */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                Work With Us
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {positionsSection.subtitle}
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" stagger>
            <div className="space-y-6">
              {positionsSection.items?.map((position, index) => (
                <div
                  key={position.id || index}
                  className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-semibold text-primary mb-2">
                          {position.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-gray-600">
                          <span className="flex items-center gap-2">
                            <MapPin size={16} className="text-secondary" />
                            {position.location}
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock size={16} className="text-secondary" />
                            {position.type}
                          </span>
                        </div>
                      </div>
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-full font-medium transition-colors"
                      >
                        Apply Now
                        <ChevronRight size={18} />
                      </Link>
                    </div>
                    <p className="text-gray-600 mb-6">{position.description}</p>
                    <div>
                      <h4 className="font-semibold text-primary mb-3">
                        Requirements:
                      </h4>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {position.requirements?.map((req, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-gray-700 text-sm"
                          >
                            <CheckCircle size={16} className="text-secondary" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Training & Requirements Section */}
      <section className="py-10 md:py-20 bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-stretch">
            <AnimatedSection animation="fade-right">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
                {generalRequirementsSection.title}
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {generalRequirementsSection.description}
              </p>
              <ul className="space-y-4">
                {generalRequirementsSection.requirements?.map((req, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="text-secondary" size={20} />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
            <AnimatedSection animation="fade-left">
              <div className="bg-primary rounded-2xl p-8 text-white flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">
                    {trainingCardSection.title}
                  </h3>
                  <p className="text-gray-200 leading-relaxed mb-6">
                    {trainingCardSection.description}
                  </p>
                  <h4 className="text-lg font-semibold mb-4">Program Highlights:</h4>
                  <ul className="space-y-3 mb-6">
                    {trainingCardSection.highlights?.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={18} />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  to={trainingCardSection.ctaLink}
                  className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-full font-medium transition-colors self-start"
                >
                  {trainingCardSection.ctaText}
                  <ChevronRight size={18} />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Get Career Guidance Section */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                {howToApplySection.title}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {howToApplySection.description}
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="max-w-3xl mx-auto">
              <div className="bg-gray-50 rounded-2xl shadow-lg p-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail size={24} className="text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-1">
                        Email Us
                      </h3>
                      <p className="text-gray-600 text-sm">
                        For career guidance and inquiries:
                      </p>
                      <a
                        href={getGmailLink(contactEmail)}
                        className="text-secondary hover:underline"
                      >
                        {contactEmail}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone size={24} className="text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-1">
                        Call Us
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Speak with our career counselor:
                      </p>
                      <a
                        href={contactPhoneLink}
                        className="text-secondary hover:underline"
                      >
                        {contactPhone}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <h4 className="font-semibold text-primary mb-3">
                    What to Include:
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    {howToApplySection.applicationFormat?.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-20 bg-secondary">
        <div className="container-custom text-center">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              {ctaSection?.title || "Ready to Start Your Healthcare Career?"}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {ctaSection?.description || "Our career services team is here to guide you every step of the way. Get personalized career guidance from industry professionals."}
            </p>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to={ctaSection?.buttons?.[0]?.link || "/contact"}
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-secondary px-8 py-4 rounded-full font-semibold transition-colors"
              >
                {ctaSection?.buttons?.[0]?.text || "Get Career Guidance"}
                <ChevronRight size={20} />
              </Link>
              <Link
                to={ctaSection?.buttons?.[1]?.link || "/care-ed"}
                className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-4 rounded-full font-semibold transition-colors"
              >
                {ctaSection?.buttons?.[1]?.text || "Explore Programs"}
                <ChevronRight size={20} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

export default Careers;