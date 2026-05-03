import { useParams, Link } from "react-router-dom";
import {
  Briefcase,
  FileText,
  Users,
  Target,
  GraduationCap,
  Rocket,
  ArrowLeft,
  CheckCircle,
  Award,
  Heart,
  Clock,
} from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import { usePageData } from "../hooks/usePageData";
import { careersStaticData } from "../data/staticData";
import fallbackHero from "../assets/images/joinus.avif";

// Icon mapping for dynamic icon rendering
const iconMap = {
  Briefcase,
  FileText,
  Users,
  Target,
  GraduationCap,
  Rocket,
  Award,
  Heart,
  Clock,
  CheckCircle,
};

// Static fallback data for career services
const staticCareerServices = [
  {
    id: "job-placement-assistance",
    title: "Job Placement Assistance",
    subtitle: "Connecting you with top healthcare employers",
    description: "We connect graduates with healthcare employers and job opportunities across New Brunswick.",
    icon: "Briefcase",
    imageUrl: "/images/career-job-placement.jpg",
    fullDescription: "Our comprehensive job placement assistance program connects graduates with healthcare employers and job opportunities across New Brunswick. We work directly with hospitals, nursing homes, home care agencies, and other healthcare facilities to match qualified candidates with rewarding positions.",
    highlights: [
      "Direct connections with healthcare employers",
      "Resume optimization for healthcare positions",
      "Interview preparation and coaching",
      "Job matching based on skills and preferences",
      "Ongoing support after placement"
    ]
  },
  {
    id: "resume-building",
    title: "Resume Building",
    subtitle: "Stand out with a professional healthcare resume",
    description: "Professional resume support to help you stand out in the healthcare job market.",
    icon: "FileText",
    imageUrl: "/images/career-resume.jpg",
    fullDescription: "Our resume building service provides professional support to help you create a compelling healthcare resume that highlights your skills, training, and certifications. We understand what healthcare employers look for and help you present your qualifications effectively.",
    highlights: [
      "Healthcare-focused resume templates",
      "Highlight relevant certifications",
      "Showcase clinical experience",
      "Optimize for applicant tracking systems",
      "Tailor content for specific positions"
    ]
  },
  {
    id: "interview-preparation",
    title: "Interview Preparation",
    subtitle: "Walk in confident, walk out hired",
    description: "Mock interviews and expert guidance to help you succeed in your job interviews.",
    icon: "Users",
    imageUrl: "/images/career-interview.jpg",
    fullDescription: "Our interview preparation program includes mock interviews and expert guidance to help you succeed in your healthcare job interviews. We cover common healthcare interview questions, behavioral interviews, and scenario-based questions specific to patient care.",
    highlights: [
      "Mock interview sessions",
      "Healthcare-specific question preparation",
      "Behavioral interview techniques",
      "Body language and presentation tips",
      "Follow-up and thank you guidance"
    ]
  },
  {
    id: "career-counselling",
    title: "Career Counselling",
    subtitle: "Your career path, guided by experts",
    description: "One-on-one guidance to plan your career path in the healthcare industry.",
    icon: "Target",
    imageUrl: "/images/career-counselling.jpg",
    fullDescription: "Our career counselling service offers one-on-one guidance to help you plan your career path in the healthcare industry. Whether you're just starting out or looking to advance your career, our experienced counselors can help you make informed decisions about your professional future.",
    highlights: [
      "Personalized career roadmapping",
      "Skills assessment and gap analysis",
      "Specialization recommendations",
      "Long-term career planning",
      "Continuing education guidance"
    ]
  },
  {
    id: "internship-support",
    title: "Internship Support",
    subtitle: "Real-world experience through our partner network",
    description: "Hands-on training and real-world experience through our partner network.",
    icon: "GraduationCap",
    imageUrl: "/images/career-internship.jpg",
    fullDescription: "Our internship support program provides hands-on training and real-world experience through our extensive partner network. We connect students with clinical placements, practicums, and internship opportunities at healthcare facilities throughout the region.",
    highlights: [
      "Partnerships with healthcare facilities",
      "Clinical placement coordination",
      "Practicum supervision",
      "Real-world skill application",
      "Networking opportunities"
    ]
  },
  {
    id: "skill-development",
    title: "Skill Development",
    subtitle: "Workshops to sharpen your professional edge",
    description: "Workshops for communication, workplace readiness, and professional growth.",
    icon: "Rocket",
    imageUrl: "/images/career-skills.jpg",
    fullDescription: "Our skill development workshops focus on communication, workplace readiness, and professional growth. These sessions help you develop essential soft skills that complement your technical healthcare training and make you a more effective healthcare professional.",
    highlights: [
      "Professional communication skills",
      "Workplace etiquette and professionalism",
      "Time management and organization",
      "Team collaboration techniques",
      "Leadership development"
    ]
  }
];

// Helper function to map API service item to standardized shape
const mapServiceItem = (apiItem, staticFallback) => {
  // Extract image URL from various possible field shapes
  const imageUrl = apiItem?.imageUrl ||
    apiItem?.image?.url ||
    apiItem?.cardImage?.url ||
    staticFallback?.imageUrl ||
    "";

  return {
    id: apiItem?.id || staticFallback?.id || "",
    title: apiItem?.title || staticFallback?.title || "",
    subtitle: apiItem?.subtitle || staticFallback?.subtitle || "",
    description: apiItem?.description || staticFallback?.description || "",
    icon: apiItem?.icon || staticFallback?.icon || "Briefcase",
    imageUrl: imageUrl,
    fullDescription: apiItem?.fullDescription || staticFallback?.fullDescription || "",
    highlights: apiItem?.highlights || staticFallback?.highlights || []
  };
};

function CareerServiceDetail() {
  const { serviceId } = useParams();
  const { data: pageData } = usePageData('careers');

  // Get career services section from API or static fallback
  const careerServicesSection = pageData?.sections?.careerServices || careersStaticData.sections.careerServices;

  // Find the service item from API data
  const apiServiceItem = careerServicesSection?.items?.find(
    (item) => item?.id === serviceId ||
      item?.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === serviceId
  );

  // Find static fallback for this service
  const staticService = staticCareerServices.find((item) => item.id === serviceId);

  // Map API response to standardized shape, using static fallback for missing fields
  const serviceItem = mapServiceItem(apiServiceItem, staticService);

  // If no service found, use static fallback
  if (!serviceItem.id && staticService) {
    Object.assign(serviceItem, staticService);
  }

  // Get icon component
  const IconComponent = iconMap[serviceItem?.icon] || Briefcase;

  // Use service imageUrl if available, otherwise fallback
  const heroImage = serviceItem?.imageUrl || fallbackHero;

  if (!serviceItem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-6">The career service you're looking for doesn't exist.</p>
          <Link
            to="/careers#careerServices"
            className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Career Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary-dark text-white overflow-hidden lg:min-h-[50vh] lg:py-24">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Background image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${heroImage})` }}
        />

        <div className="container-custom relative py-10 lg:py-32">
          <div className="max-w-4xl mx-auto py-10 lg:py-24">
            {/* Back navigation */}
            {/* <AnimatedSection animation="fade-up">
              <Link
                to="/careers#careerServices"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
              >
                <ArrowLeft size={18} />
                <span>Back to Career Services</span>
              </Link>
            </AnimatedSection> */}

            {/* Hero content */}
            <AnimatedSection animation="fade-up" delay={100}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center">
                  <IconComponent size={32} className="text-secondary-light" />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-6xl font-bold">
                    {serviceItem.title}
                  </h1>
                  {serviceItem.subtitle && (
                    <p className="text-lg text-secondary-light mt-1">
                      {serviceItem.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Detail Content Section */}
      <section className="py-12 lg:py-20">
        <div className="container-custom">
          <div className="max-w-8xl mx-auto">
            <AnimatedSection animation="fade-up">
              <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
                {/* Full description */}
                {(serviceItem.fullDescription || serviceItem.description) && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-primary mb-4">
                      About This Service
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {serviceItem.fullDescription || serviceItem.description}
                    </p>
                  </div>
                )}

                {/* Highlights */}
                {serviceItem.highlights && serviceItem.highlights.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-primary mb-4">
                      What's Included
                    </h2>
                    <ul className="space-y-3">
                      {serviceItem.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={20} />
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </AnimatedSection>

            {/* CTA Section */}
            <AnimatedSection animation="fade-up" delay={100}>
              <div className="mt-8 bg-secondary rounded-2xl p-8 text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  Ready to Get Started?
                </h3>
                <p className="text-white/90 mb-6">
                  Contact our career services team to learn more about how we can help.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-secondary px-8 py-3 rounded-full font-semibold transition-colors"
                >
                  Contact Us
                  <ArrowLeft size={18} className="rotate-180" />
                </Link>
              </div>
            </AnimatedSection>

            {/* Back to Careers */}
            {/* <AnimatedSection animation="fade-up" delay={200}>
              <div className="mt-8 text-center">
                <Link
                  to="/careers#careerServices"
                  className="inline-flex items-center gap-2 text-secondary hover:text-secondary-dark font-medium transition-colors"
                >
                  <ArrowLeft size={18} />
                  Back to Career Services
                </Link>
              </div>
            </AnimatedSection> */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CareerServiceDetail;