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
} from "lucide-react";
import care from "../assets/images/care.jpg";
import join from "../assets/images/joinus.avif";
import AnimatedSection from "../components/AnimatedSection";
import { usePageData } from "../hooks/usePageData";
import { careersStaticData } from "../data/staticData";

function Careers() {
  const { data: pageData } = usePageData('careers');

  // Get sections from API or use static fallback
  const heroSection = pageData?.sections?.hero || careersStaticData.sections.hero;
  const positionsSection = pageData?.sections?.positions || careersStaticData.sections.positions;
  const benefitsSection = pageData?.sections?.benefits || careersStaticData.sections.benefits;
  const contactSection = pageData?.sections?.contact || careersStaticData.sections.contact;

  const positions = [
    {
      title: "Personal Support Worker",
      location: "Greater Saint John",
      type: "Full-time / Part-time",
      description:
        "Provide compassionate care to seniors in their homes or hospital settings. Assist with daily living activities, meal preparation, and wellness promotion.",
      requirements: [
        "Current CPR and First Aid Certification",
        "PSW Certificate (training available)",
        "Access to a car",
        "Background checks required",
      ],
    },
    {
      title: "Schedule Manager",
      location: "Greater Saint John",
      type: "Full-time",
      description:
        "Coordinate and manage caregiver schedules to ensure seamless coverage for all clients. Handle scheduling conflicts and communicate with staff and families.",
      requirements: [
        "Strong organizational skills",
        "Experience in healthcare scheduling preferred",
        "Excellent communication skills",
        "Proficiency with scheduling software",
      ],
    },
    {
      title: "Foot Care Nurse",
      location: "Greater Saint John",
      type: "Full-time / Part-time",
      description:
        "Provide professional foot care services to seniors, including treatment of calluses, corns, and thickened nails. Work in clinic, home, or hospital settings.",
      requirements: [
        "Current RN or LPN license",
        "Foot Care Management certification preferred",
        "Experience in geriatric care",
        "Valid driver's license",
      ],
    },
    {
      title: "Trained Medical Internationals",
      location: "Greater Saint John",
      type: "Full-time",
      description:
        "International healthcare professionals looking to gain Canadian work experience in senior care. We provide support and mentorship.",
      requirements: [
        "Medical credentials from home country",
        "Interest in senior care",
        "Valid work permit",
        "Good communication skills in English",
      ],
    },
    {
      title: "PSW on-the-job Training for Internationals",
      location: "Greater Saint John",
      type: "Full-time",
      description:
        "Combined training and employment program for international candidates. Learn while you earn through our Care-Ed Learning Center.",
      requirements: [
        "Interest in healthcare career",
        "Valid work permit",
        "Commitment to complete training",
        "Good communication skills",
      ],
    },
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health Insurance",
      description:
        "Comprehensive health coverage with prescriptions, dental, and vision for full-time employees",
    },
    {
      icon: Users,
      title: "Family Health Plan",
      description: "Family health plan available for eligible employees",
    },
    {
      icon: GraduationCap,
      title: "Training Programs",
      description: "PSW training and professional development opportunities",
    },
    {
      icon: Clock,
      title: "Flexible Hours",
      description:
        "Part-time or full-time employment options to suit your schedule",
    },
  ];

  const requirements = [
    "Current CPR and First Aid Certification",
    "PSW Certificate (training available through Care-Ed Learning Program)",
    "Willingness to work 30-44 hours per week",
    "Access to a car",
    "DSD Record Check",
    "Vulnerable Sector Check",
    "Criminal Record Check",
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary-dark text-white overflow-hidden lg:min-h-[50vh] py-10 lg:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${join})` }}
        ></div>
        <div className="container-custom relative py-10 lg:py-32">
          <div className="max-w-3xl">
            <AnimatedSection animation="fade-up">
              <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary-light px-4 py-2 rounded-full mb-6">
                <Briefcase size={16} />
                <span className="text-sm font-medium">Join Our Team</span>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={100}>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Careers at Care-ed
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={200}>
              <p className="text-xl text-gray-200 leading-relaxed">
                Launch your healthcare career with us. We offer employment opportunities
                for graduates and training programs to get you started.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="fade-right">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
                Why Work With Us?
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                At Care-ed, we've been providing quality healthcare education and
                employment opportunities for over 15 years. We value our employees
                and offer competitive benefits, professional development, and a
                supportive work environment.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <benefit.icon size={28} className="text-secondary mb-4" />
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-left">
              <img
                src={care}
                alt="Healthcare professionals"
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

      {/* Open Positions */}
      <section className="py-10 md:py-20 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                Open Positions
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our current job openings and find the perfect fit for your
                skills and interests.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" stagger>
            <div className="space-y-6">
              {positions.map((position, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
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
                        {position.requirements.map((req, idx) => (
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

      {/* General Requirements */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-stretch">
            <AnimatedSection animation="fade-right">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
                General Requirements
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                All positions require the following documentation and
                certifications. Don't worry if you don't have everything — we
                offer training programs to help you get qualified.
              </p>
              <ul className="space-y-4">
                {requirements.map((req, index) => (
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
                    Training Available
                  </h3>
                  <p className="text-gray-200 leading-relaxed mb-6">
                    Don't have your PSW Certificate yet? We offer comprehensive
                    training through our Care-Ed Learning Center. Our Learn While
                    You Earn program allows you to gain valuable experience while
                    completing your certification.
                  </p>
                  <h4 className="text-lg font-semibold mb-4">Program Highlights:</h4>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={18} />
                      <span>Comprehensive PSW certification program</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={18} />
                      <span>Hands-on clinical experience</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={18} />
                      <span>Flexible scheduling options</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={18} />
                      <span>CPR & First Aid certification included</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={18} />
                      <span>Job placement assistance upon completion</span>
                    </li>
                  </ul>
                </div>
                <Link
                  to="/care-ed"
                  className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-full font-medium transition-colors self-start"
                >
                  Learn About PSW Training
                  <ChevronRight size={18} />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-10 md:py-20 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                How to Apply
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Ready to join our team? Here's how to submit your application.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail size={24} className="text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-1">
                        Email Your Application
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Send resume and cover letter to:
                      </p>
                      <a
                        href="mailto:train@seniorwatch.com"
                        className="text-secondary hover:underline"
                      >
                        train@seniorwatch.com
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
                        For questions about positions:
                      </p>
                      <a
                        href="tel:+15066348906"
                        className="text-secondary hover:underline"
                      >
                        (506) 634-8906
                      </a>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-primary mb-3">
                    Application Format:
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Resume in MS Word or PDF format</li>
                    <li>• Cover letter indicating position of interest</li>
                    <li>• Include relevant certifications and references</li>
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
              Start Your Healthcare Career
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join our team of dedicated healthcare professionals or enroll in
              our training programs to begin your career in healthcare.
            </p>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-secondary px-8 py-4 rounded-full font-semibold transition-colors"
              >
                Contact Us
                <ChevronRight size={20} />
              </Link>
              <a
                href="tel:+15066348906"
                className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold transition-colors border-2 border-white"
              >
                <Phone size={20} />
                (506) 634-8906
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

export default Careers;
