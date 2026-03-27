import { Link } from "react-router-dom";
import {
  Phone,
  ChevronRight,
  Clock,
  Heart,
  Activity,
  Users,
  Home,
  Briefcase,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Shield,
  Star,
  Award,
} from "lucide-react";
import help from "../assets/images/help.jpg";
import care from "../assets/images/care.jpg";
import home_img from "../assets/images/home.jpg";
import foot from "../assets/images/foot.jpg";
import personal from "../assets/images/personal.jpg";
import training from "../assets/images/training.avif";
import AnimatedSection from "../components/AnimatedSection";
import Counter from "../components/Counter";
import { usePageData } from "../hooks/usePageData";
import { servicesStaticData } from "../data/staticData";

function Services() {
  const { data: pageData } = usePageData('services');

  // Get sections from API or use static fallback
  const heroSection = pageData?.sections?.hero || servicesStaticData.sections.hero;
  const servicesSection = pageData?.sections?.services || servicesStaticData.sections.services;
  const specializedSection = pageData?.sections?.specialized || servicesStaticData.sections.specialized;
  const insuranceSection = pageData?.sections?.insurance || servicesStaticData.sections.insurance;

  const services = [
    {
      icon: Home,
      title: "Home Care Services",
      slug: "home-care",
      description:
        "Scheduled visits by qualified personnel, ranging from minimum 1-hour to 24/7 coverage. Our care plans are developed by health professionals.",
      features: [
        "Personalized care plans",
        "Flexible scheduling",
        "1-hour minimum to 24/7 coverage",
        "Light housekeeping available",
        "Health professional oversight",
      ],
      image: home_img,
    },
    {
      icon: Activity,
      title: "Foot Care by Nurses",
      slug: "foot-care",
      description:
        "Professional foot care services provided by trained RN/LPN Foot Care Nurses. We treat calluses, corns, and thickened nails at our clinic, special care homes, or hospital settings.",
      features: [
        "Treatment for calluses and corns",
        "Thickened nail care",
        "Clinic or home visits",
        "Blue Cross accepted",
        "Veterans Affairs accepted",
      ],
      image: foot,
    },
    {
      icon: Users,
      title: "Personal Support Workers",
      slug: "personal-support",
      description:
        "Our compassionate PSWs provide attendant care, light housekeeping, meal preparation, wellness promotion, socialization support, and palliative care.",
      features: [
        "Attendant care",
        "Light housekeeping",
        "Meal preparation",
        "Wellness promotion",
        "Palliative care support",
      ],
      image: personal,
    },
    {
      icon: Clock,
      title: "Emergency Services",
      slug: "emergency-services",
      description:
        "At home or hospital emergency coverage for short-term assignments. We process private insurance and Blue Cross claims.",
      features: [
        "24/7 availability",
        "Short-term assignments",
        "Home or hospital care",
        "Insurance claims processing",
        "Blue Cross coverage",
      ],
      image: care,
    },
    {
      icon: Heart,
      title: "Bath Only Services",
      slug: "bath-services",
      description:
        "Assistance for independent seniors who need help getting in and out of the bath safely.",
      features: [
        "Safe bathing assistance",
        "For independent seniors",
        "Professional support",
        "Scheduled visits",
      ],
      image: help,
    },
    {
      icon: Phone,
      title: "Phone Monitoring",
      slug: "phone-monitoring",
      description:
        "RN monitors physical condition, medication administration, nutrition, mental status, and safety through regular phone check-ins.",
      features: [
        "Regular wellness checks",
        "Medication monitoring",
        "Nutrition tracking",
        "Mental status assessment",
        "Safety verification",
      ],
      image: training,
    },
  ];

  const specializedServices = [
    {
      title: "SWIFT Pre-Planning Service",
      slug: "swift-planning",
      description:
        "Pre-planning for hospital discharge scenarios with support for families and employers.",
      icon: Briefcase,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Consultations",
      slug: "consultations",
      description:
        "Assessment for services, family planning, resources, care management, and environmental safety monitoring.",
      icon: BookOpen,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Workshops",
      slug: "workshops",
      description:
        "Educational workshops on elder abuse, caregiver support, depression, Alzheimer's, and dementia.",
      icon: Users,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "End-of-Life Care Program",
      slug: "end-of-life",
      description:
        "5-part National Palliative Care Certificate Program for paraprofessionals and family caregivers.",
      icon: Heart,
      color: "from-red-500 to-red-600",
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Trusted & Verified",
      description:
        "All caregivers are thoroughly screened with background checks and professional certifications.",
    },
    {
      icon: Star,
      title: "Quality Care",
      description:
        "We maintain rigorous standards through constant evaluation and ongoing training.",
    },
    {
      icon: Heart,
      title: "Compassionate Team",
      description:
        "Our team treats every individual with dignity, respect, and genuine compassion.",
    },
  ];

  const insurancePartners = [
    { name: "Blue Cross", description: "Accepted for eligible services" },
    { name: "Veterans Affairs", description: "Coverage for veterans" },
    { name: "Private Insurance", description: "Claims processing available" },
  ];

  return (
    <div>
      {/* Hero Section */}
      {/* <section className="relative bg-gradient-to-br from-primary to-primary-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576765608535-5f04d1e3f4af?w=1920&q=80')] bg-cover bg-center opacity-15"></div>
        <div className="container-custom relative py-20 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Comprehensive care services designed to meet the unique needs of
              seniors and their families. Available 24/7 with personalized care
              plans.
            </p>
          </div>
        </div>
      </section> */}

      <section className="relative lg:min-h-screen min-h-[55vh] text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={help}
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

        <div className="container-custom relative lg:min-h-screen min-h-[55vh] flex items-center py-24">
          <div className="max-w-3xl">
            <AnimatedSection animation="fade-up">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Our Services
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={150}>
              <p className="text-xl text-gray-200 leading-relaxed">
                Comprehensive care services designed to meet the unique needs of
                seniors and their families. Available 24/7 with personalized care
                plans.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>
      {/* Main Services Section */}
      <section className="py-10 md:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <span className="inline-block bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
                What We Offer
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
                Home Care Services
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Professional care services tailored to your individual needs,
                delivered with compassion and expertise.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" stagger>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  {/* Top Section - Image */}
                  <Link to={`/services/${service.slug}`}>
                    <div className="relative h-48 overflow-hidden cursor-pointer">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <service.icon size={24} className="text-white" />
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Bottom Section - Content */}
                  <div className="p-6">
                    <Link to={`/services/${service.slug}`}>
                      <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors duration-300 cursor-pointer">
                        {service.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-4">
                      {service.features.slice(0, 4).map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-gray-700 text-sm"
                        >
                          <CheckCircle size={16} className="text-secondary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-secondary hover:text-secondary-dark font-semibold transition-colors"
                    >
                      Learn More
                      <ChevronRight size={18} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <AnimatedSection animation="fade-up" stagger>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-all border border-gray-100"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-secondary to-secondary-dark rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Specialized Services */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                Specialized Programs
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
                Specialized Programs
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Additional services and programs to support seniors and their
                families.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" stagger>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {specializedServices.map((service, index) => (
                <Link
                  key={index}
                  to={`/services/${service.slug}`}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-secondary font-medium mt-4 text-sm">
                    Learn More <ChevronRight size={16} />
                  </span>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Care Process */}
      <section className="py-10 md:py-20 bg-gradient-to-br from-primary via-primary to-primary-dark text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="fade-right">
              <span className="inline-block bg-secondary/20 text-secondary-light px-4 py-2 rounded-full text-sm font-medium mb-4">
                Our Process
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Our Care Process
              </h2>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                We follow a comprehensive approach to ensure you receive the
                right care for your unique needs.
              </p>
              <div className="space-y-6">
                {[
                  {
                    step: "1",
                    title: "Initial Consultation",
                    description:
                      "We meet with you and your family to understand your needs and preferences.",
                  },
                  {
                    step: "2",
                    title: "Care Assessment",
                    description:
                      "Our health professionals develop a personalized care plan tailored to your situation.",
                  },
                  {
                    step: "3",
                    title: "Caregiver Matching",
                    description:
                      "We match you with qualified caregivers who best fit your needs and personality.",
                  },
                  {
                    step: "4",
                    title: "Ongoing Support",
                    description:
                      "Continuous monitoring and adjustments to ensure the highest quality of care.",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-left">
              <div className="relative">
                <img
                  src={care}
                  alt="Care process"
                  className="rounded-3xl shadow-2xl w-full object-cover h-[500px]"
                  loading="lazy"
                />
                <div className="absolute -bottom-6 -left-6 bg-white text-primary p-6 rounded-2xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                      <Award className="text-white" size={24} />
                    </div>
                    <div>
                      <div className="text-3xl font-bold">
                        <Counter end={38} suffix="+" />
                      </div>
                      <div className="text-gray-600">Years of Experience</div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Insurance Section */}
      <section className="py-10 md:py-20 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <span className="inline-block bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
                Insurance & Coverage
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
                Insurance & Coverage
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We work with various insurance providers to make our services
                accessible.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" stagger>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {insurancePartners.map((partner, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Shield size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {partner.name}
                  </h3>
                  <p className="text-gray-600">{partner.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-20 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container-custom relative text-center">
          <AnimatedSection animation="fade-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Contact us today for a free consultation. We're available 24/7 to
              discuss your care needs.
            </p>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-secondary px-10 py-5 rounded-full font-semibold transition-all shadow-lg text-lg"
              >
                Request a Consultation
                <ArrowRight size={20} />
              </Link>
              <a
                href="tel:+15066348906"
                className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 text-white px-10 py-5 rounded-full font-semibold transition-all border-2 border-white text-lg"
              >
                <Phone size={22} />
                (506) 634-8906
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

export default Services;
