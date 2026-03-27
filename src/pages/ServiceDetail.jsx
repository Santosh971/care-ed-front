import { useParams, Link } from "react-router-dom";
import {
  Phone,
  ChevronRight,
  CheckCircle,
  Clock,
  Heart,
  Activity,
  Users,
  Home,
  Briefcase,
  BookOpen,
  Shield,
  Star,
  Award,
  MapPin,
  Calendar,
  DollarSign,
  ArrowLeft,
} from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import Counter from "../components/Counter";
import home_img from "../assets/images/home.jpg";

const serviceData = {
  "home-care": {
    icon: Home,
    title: "Home Care Services",
    shortDescription: "Scheduled visits by qualified personnel, ranging from minimum 1-hour to 24/7 coverage.",
    heroDescription: "Professional home care services tailored to meet your unique needs, delivered with compassion and expertise by our qualified personnel.",
    image: home_img,
    overview: "Our Home Care Services provide scheduled visits by qualified personnel, offering flexible care solutions ranging from a minimum of 1-hour visits to comprehensive 24/7 coverage. Each care plan is developed by health professionals to ensure the highest quality of personalized care.",
    features: [
      {
        icon: Clock,
        title: "Flexible Scheduling",
        description: "Care plans tailored to your schedule, from 1-hour visits to round-the-clock 24/7 coverage."
      },
      {
        icon: Heart,
        title: "Personalized Care Plans",
        description: "Individual care plans developed by health professionals to meet your specific needs."
      },
      {
        icon: Users,
        title: "Qualified Personnel",
        description: "Experienced and trained caregivers who are passionate about providing excellent care."
      },
      {
        icon: Shield,
        title: "Health Professional Oversight",
        description: "All care plans are supervised by health professionals to ensure quality."
      }
    ],
    services: [
      "Personal care assistance (bathing, dressing, grooming)",
      "Medication reminders and management",
      "Light housekeeping and laundry",
      "Meal preparation and nutrition support",
      "Companionship and social activities",
      "Transportation to appointments",
      "Respite care for family caregivers",
      "Safety supervision and fall prevention"
    ],
    pricing: [
      { name: "1-Hour Visit", description: "Minimum visit for basic care needs" },
      { name: "Half-Day Care", description: "4-hour visits for extended support" },
      { name: "Full-Day Care", description: "8-hour comprehensive care coverage" },
      { name: "24/7 Live-In Care", description: "Round-the-clock care and supervision" }
    ],
    faqs: [
      {
        question: "How do you develop a care plan?",
        answer: "Our health professionals conduct an initial assessment to understand your needs, preferences, and health conditions. Based on this assessment, we create a personalized care plan that is regularly reviewed and adjusted as needed."
      },
      {
        question: "Are your caregivers insured and bonded?",
        answer: "Yes, all our caregivers are fully insured, bonded, and undergo thorough background checks before being hired. They also receive ongoing training to maintain high standards of care."
      },
      {
        question: "Can care be provided on short notice?",
        answer: "Yes, we offer emergency services for short-term assignments. Contact us to discuss your immediate needs."
      },
      {
        question: "Do you provide care in facilities?",
        answer: "Yes, we provide care at home, in hospitals, and in special care homes. Our services are flexible to meet your location needs."
      }
    ]
  },
  "foot-care": {
    icon: Activity,
    title: "Foot Care by Nurses",
    shortDescription: "Professional foot care services provided by trained RN/LPN Foot Care Nurses.",
    heroDescription: "Expert foot care services delivered by certified Foot Care Nurses, providing treatment and preventive care for seniors and individuals with specialized foot care needs.",
    image: "/images/foot-care-detail.jpg",
    overview: "Our Foot Care services are provided by trained RN/LPN Foot Care Nurses who specialize in diabetic and geriatric foot care. We offer treatment for calluses, corns, thickened nails, and general foot care at our clinic, special care homes, or hospital settings.",
    features: [
      {
        icon: Award,
        title: "Certified Nurses",
        description: "All foot care is provided by licensed RN/LPN nurses with specialized foot care training."
      },
      {
        icon: Heart,
        title: "Diabetic Foot Care",
        description: "Specialized care for diabetic patients to prevent complications and maintain foot health."
      },
      {
        icon: Users,
        title: "Multiple Locations",
        description: "Services available at our clinic, special care homes, or hospital settings."
      },
      {
        icon: Shield,
        title: "Insurance Accepted",
        description: "We accept Blue Cross and Veterans Affairs coverage for eligible services."
      }
    ],
    services: [
      "Callus and corn treatment",
      "Thickened nail care and trimming",
      "Diabetic foot assessment and care",
      "Geriatric foot care",
      "Ingrown toenail treatment",
      "Fungal nail treatment",
      "Foot health education",
      "Preventive care recommendations"
    ],
    conditions: [
      "Diabetes-related foot issues",
      "Arthritis and joint problems",
      "Circulatory problems",
      "Thickened or ingrown nails",
      "Calluses and corns",
      "Age-related foot changes"
    ],
    faqs: [
      {
        question: "How often should I have foot care?",
        answer: "For most seniors and diabetic patients, we recommend foot care every 6-8 weeks. However, the frequency depends on individual needs and conditions. Our nurses will advise on the best schedule for you."
      },
      {
        question: "Do I need a referral for foot care?",
        answer: "No referral is necessary for our foot care services. You can contact us directly to schedule an appointment."
      },
      {
        question: "What insurance do you accept?",
        answer: "We accept Blue Cross and Veterans Affairs coverage. We also process private insurance claims. Contact us to verify your coverage."
      },
      {
        question: "Can you come to my home for foot care?",
        answer: "Yes, we offer home visits for patients who cannot travel to our clinic. We also provide services at special care homes and hospitals."
      }
    ]
  },
  "personal-support": {
    icon: Users,
    title: "Personal Support Workers",
    shortDescription: "Compassionate PSWs providing attendant care, housekeeping, and wellness support.",
    heroDescription: "Our dedicated Personal Support Workers provide compassionate care and practical assistance to help you maintain independence and quality of life at home.",
    image: "/images/psw-detail.jpg",
    overview: "Our Personal Support Workers (PSWs) are compassionate, trained professionals who provide a wide range of services including attendant care, light housekeeping, meal preparation, wellness promotion, socialization support, and palliative care. They work under the supervision of health professionals to ensure quality care.",
    features: [
      {
        icon: Heart,
        title: "Compassionate Care",
        description: "Our PSWs are selected for their genuine compassion and dedication to helping others."
      },
      {
        icon: Award,
        title: "Fully Trained",
        description: "All PSWs complete comprehensive training programs and maintain current certifications."
      },
      {
        icon: Clock,
        title: "Flexible Hours",
        description: "Care available on your schedule, from occasional visits to full-time live-in support."
      },
      {
        icon: Shield,
        title: "Professional Oversight",
        description: "Care supervised by registered nurses to ensure quality and safety."
      }
    ],
    services: [
      "Attendant care and personal assistance",
      "Light housekeeping and home maintenance",
      "Meal preparation and nutrition support",
      "Wellness promotion and exercise assistance",
      "Socialization and companionship",
      "Palliative care support",
      "Respite care for family caregivers",
      "Assistance with activities of daily living"
    ],
    specializedCare: [
      {
        title: "Palliative Care Support",
        description: "Compassionate end-of-life care support for patients and families, working with healthcare teams."
      },
      {
        title: "Dementia Care",
        description: "Specialized support for individuals with Alzheimer's and other forms of dementia."
      },
      {
        title: "Post-Surgery Care",
        description: "Recovery assistance following surgery, including wound care and rehabilitation support."
      }
    ],
    faqs: [
      {
        question: "What qualifications do your PSWs have?",
        answer: "All our PSWs have completed approved Personal Support Worker programs and maintain current certifications. They undergo thorough background checks and receive ongoing training."
      },
      {
        question: "Can PSWs administer medication?",
        answer: "PSWs can provide medication reminders and assistance with pre-dispensed medications. For complex medication management, we coordinate with nursing staff."
      },
      {
        question: "What is the difference between a PSW and a nurse?",
        answer: "PSWs provide personal care and daily living assistance, while nurses handle medical tasks like wound care and complex medication management. We can provide both as part of a comprehensive care plan."
      },
      {
        question: "Do you provide overnight care?",
        answer: "Yes, we offer overnight care and 24/7 live-in care options for clients who need continuous support."
      }
    ]
  },
  "emergency-services": {
    icon: Clock,
    title: "Emergency Services",
    shortDescription: "24/7 emergency coverage for short-term assignments at home or hospital.",
    heroDescription: "Round-the-clock emergency care services for unexpected situations, providing immediate support when you need it most.",
    image: "/images/emergency-detail.jpg",
    overview: "Our Emergency Services provide at-home or hospital emergency coverage for short-term assignments. Whether you need immediate care after surgery, unexpected caregiver absence, or urgent support, our team is available 24/7 to respond quickly. We process private insurance and Blue Cross claims.",
    features: [
      {
        icon: Clock,
        title: "24/7 Availability",
        description: "Our team is available around the clock for emergency situations and urgent care needs."
      },
      {
        icon: MapPin,
        title: "Home or Hospital",
        description: "Flexible care locations - we can provide services at your home or in hospital settings."
      },
      {
        icon: Shield,
        title: "Insurance Processing",
        description: "We handle private insurance and Blue Cross claims to simplify your experience."
      },
      {
        icon: Award,
        title: "Rapid Response",
        description: "Quick deployment of qualified caregivers for urgent care situations."
      }
    ],
    services: [
      "Emergency caregiver replacement",
      "Post-surgery care support",
      "Urgent personal care needs",
      "Hospital discharge support",
      "Respite for family caregivers",
      "24/7 monitoring and support",
      "Medical appointment accompaniment",
      "Short-term intensive care"
    ],
    situations: [
      "Unexpected caregiver absence",
      "Post-operative recovery",
      "Sudden illness or health changes",
      "Family emergency requiring care coverage",
      "Hospital-to-home transition",
      "Acute care needs"
    ],
    faqs: [
      {
        question: "How quickly can you respond to an emergency?",
        answer: "We strive to respond to emergency requests within hours, depending on the situation and location. Contact our 24/7 line for immediate assistance."
      },
      {
        question: "What qualifies as an emergency?",
        answer: "Any situation where you need immediate care support - such as unexpected caregiver absence, post-surgery needs, or sudden health changes. We're here to help in any urgent situation."
      },
      {
        question: "Is emergency care covered by insurance?",
        answer: "Many insurance plans cover emergency care services. We process Blue Cross claims and can help verify your private insurance coverage."
      },
      {
        question: "Can emergency care transition to regular care?",
        answer: "Yes, if you need ongoing care after an emergency situation, we can seamlessly transition you to our regular home care services with a personalized care plan."
      }
    ]
  },
  "bath-services": {
    icon: Heart,
    title: "Bath Only Services",
    shortDescription: "Safe bathing assistance for independent seniors.",
    heroDescription: "Specialized bathing assistance for independent seniors who need help getting in and out of the bath safely, providing peace of mind for you and your family.",
    image: "/images/bath-detail.jpg",
    overview: "Our Bath Only Services are designed for independent seniors who just need a helping hand with bathing. Our trained caregivers provide safe, dignified assistance with getting in and out of the bath, ensuring your safety and comfort while maintaining your independence.",
    features: [
      {
        icon: Shield,
        title: "Safety First",
        description: "Trained caregivers ensure safe bathing experiences with proper support and supervision."
      },
      {
        icon: Heart,
        title: "Dignified Care",
        description: "We respect your privacy and dignity while providing the assistance you need."
      },
      {
        icon: Clock,
        title: "Scheduled Visits",
        description: "Regular scheduled visits that fit your routine, whether daily, weekly, or as needed."
      },
      {
        icon: Award,
        title: "Experienced Staff",
        description: "Caregivers trained in safe bathing techniques and fall prevention."
      }
    ],
    services: [
      "Safe bath entry and exit assistance",
      "Shower support and supervision",
      "Bathroom safety assessment",
      "Personal care assistance",
      "Fall prevention support",
      "Light personal grooming assistance"
    ],
    benefits: [
      "Maintain your independence at home",
      "Reduce risk of bathroom falls",
      "Peace of mind for family members",
      "Professional, respectful assistance",
      "Flexible scheduling options",
      "Affordable targeted care"
    ],
    faqs: [
      {
        question: "How long does a bath visit take?",
        answer: "A typical bath visit takes 1-2 hours, depending on your needs. We ensure you have adequate time for a comfortable, unhurried bathing experience."
      },
      {
        question: "Do you bring any equipment?",
        answer: "We can assist with safety equipment recommendations. If needed, we can suggest bathroom modifications like grab bars or bath chairs to improve safety."
      },
      {
        question: "What if I only need occasional help?",
        answer: "Our services are flexible. We can provide regular scheduled visits or occasional assistance as needed. Contact us to discuss your specific requirements."
      },
      {
        question: "Can this service be combined with other care?",
        answer: "Yes, bath services can be part of a broader care plan. Many clients combine this with our other home care services for comprehensive support."
      }
    ]
  },
  "phone-monitoring": {
    icon: Phone,
    title: "Phone Monitoring",
    shortDescription: "Regular phone check-ins by RNs to monitor health and wellness.",
    heroDescription: "Professional telephone monitoring by Registered Nurses who assess your health, medication, nutrition, and safety through regular check-ins.",
    image: "/images/phone-monitoring-detail.jpg",
    overview: "Our Phone Monitoring service connects you with a Registered Nurse who regularly monitors your physical condition, medication administration, nutrition, mental status, and safety through scheduled phone check-ins. This service is ideal for seniors living independently who want regular wellness oversight.",
    features: [
      {
        icon: Award,
        title: "RN Oversight",
        description: "All monitoring is conducted by Registered Nurses with clinical expertise."
      },
      {
        icon: Clock,
        title: "Regular Check-ins",
        description: "Scheduled calls at times that work for you - daily, weekly, or as needed."
      },
      {
        icon: Shield,
        title: "Health Assessment",
        description: "Comprehensive monitoring of physical condition, mental status, and safety."
      },
      {
        icon: Heart,
        title: "Family Updates",
        description: "Regular updates to family members about your health and wellbeing."
      }
    ],
    monitoring: [
      "Physical condition assessment",
      "Medication administration monitoring",
      "Nutrition and hydration tracking",
      "Mental status evaluation",
      "Safety verification",
      "Overall wellness check",
      "Symptom monitoring",
      "Emergency escalation"
    ],
    checkInSchedule: [
      { name: "Daily Check-ins", description: "Perfect for those needing daily wellness monitoring" },
      { name: "Weekly Check-ins", description: "Regular oversight for stable independent living" },
      { name: "Bi-weekly Check-ins", description: "Periodic wellness checks for peace of mind" },
      { name: "Custom Schedule", description: "Tailored to your specific needs and preferences" }
    ],
    faqs: [
      {
        question: "What happens if the RN identifies a concern?",
        answer: "If any concerns are identified during a check-in, the RN will take appropriate action - this may include contacting family members, recommending a doctor visit, or coordinating emergency services if needed."
      },
      {
        question: "Can family members receive updates?",
        answer: "Yes, family members can receive regular updates about your health and wellbeing. We can provide weekly or monthly reports, or immediate notification if concerns arise."
      },
      {
        question: "Is this service covered by insurance?",
        answer: "Phone monitoring may be covered under some insurance plans. We can help verify your coverage and process claims where applicable."
      },
      {
        question: "Can phone monitoring be combined with in-person care?",
        answer: "Absolutely. Phone monitoring works well as a complement to our home care services, providing additional oversight between in-person visits."
      }
    ]
  }
};

const specializedData = {
  "swift-planning": {
    icon: Briefcase,
    title: "SWIFT Pre-Planning Service",
    shortDescription: "Pre-planning for hospital discharge scenarios with support for families and employers.",
    overview: "Our SWIFT (Senior Wellness and Independence Facilitation Team) Pre-Planning Service helps families and employers prepare for hospital discharge scenarios before they happen. This proactive approach ensures smoother transitions and better outcomes.",
    features: [
      "Pre-discharge planning consultation",
      "Family coordination and support",
      "Employer resource guidance",
      "Home safety assessment",
      "Care transition planning",
      "Resource coordination"
    ]
  },
  "consultations": {
    icon: BookOpen,
    title: "Consultations",
    shortDescription: "Assessment for services, family planning, resources, care management, and environmental safety.",
    overview: "Our consultation services provide expert assessment and guidance for families navigating senior care decisions. We help with service assessments, family planning, resource identification, care management, and environmental safety monitoring.",
    features: [
      "Comprehensive needs assessment",
      "Family care planning guidance",
      "Community resource connections",
      "Care management support",
      "Home safety evaluations",
      "Long-term care planning"
    ]
  },
  "workshops": {
    icon: Users,
    title: "Educational Workshops",
    shortDescription: "Workshops on elder abuse, caregiver support, depression, Alzheimer's, and dementia.",
    overview: "We offer educational workshops covering important topics such as elder abuse recognition and prevention, caregiver support and self-care, managing depression, and understanding Alzheimer's and other forms of dementia.",
    features: [
      "Elder abuse awareness",
      "Caregiver support strategies",
      "Depression in seniors",
      "Alzheimer's education",
      "Dementia care techniques",
      "Communication skills"
    ]
  },
  "end-of-life": {
    icon: Heart,
    title: "End-of-Life Care Program",
    shortDescription: "5-part National Palliative Care Certificate Program for paraprofessionals and family caregivers.",
    overview: "Our End-of-Life Care Program is a comprehensive 5-part National Palliative Care Certificate Program designed for paraprofessionals and family caregivers. This program provides the knowledge and skills needed to provide compassionate end-of-life care.",
    features: [
      "National certification program",
      "Five comprehensive modules",
      "For paraprofessionals",
      "Family caregiver training",
      "Palliative care principles",
      "Practical caregiving skills"
    ]
  }
};

function ServiceDetail() {
  const { slug } = useParams();
  const service = serviceData[slug];
  const specialized = specializedData[slug];

  if (!service && !specialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-8">The service you're looking for doesn't exist.</p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-full font-semibold transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const data = service || specialized;
  const Icon = data.icon;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary-dark text-white overflow-hidden min-h-[50vh] py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

        <div className="container-custom relative py-20 lg:py-32">
          <AnimatedSection animation="fade-up">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Services
            </Link>
          </AnimatedSection>

          <div className="max-w-3xl">
            <AnimatedSection animation="fade-up" delay={100}>
              <div className="w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center mb-6">
                <Icon size={40} className="text-white" />
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={200}>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                {data.title}
              </h1>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={300}>
              <p className="text-xl text-gray-200 leading-relaxed">
                {data.heroDescription || data.shortDescription}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="fade-right">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
                About This Service
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {data.overview}
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-full font-semibold transition-colors"
              >
                Get Started
                <ChevronRight size={18} />
              </Link>
            </AnimatedSection>
            <AnimatedSection animation="fade-left">
              <div className="grid grid-cols-2 gap-4">
                {data.features && typeof data.features[0] === 'object' && data.features.slice(0, 4).map((feature, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                      <feature.icon size={24} className="text-secondary" />
                    </div>
                    <h3 className="font-semibold text-primary mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services List Section */}
      {data.services && (
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                  What's Included
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Our {data.title.toLowerCase()} include a comprehensive range of support options.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" stagger>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {data.services.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle size={20} className="text-secondary" />
                    </div>
                    <p className="text-gray-700 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Pricing Options (for applicable services) */}
      {data.pricing && (
        <section className="py-20 bg-white">
          <div className="container-custom">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                  Care Options
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Flexible care packages designed to meet your needs.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" stagger>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {data.pricing.map((option, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 text-white text-center"
                  >
                    <h3 className="text-xl font-bold mb-3">{option.name}</h3>
                    <p className="text-white/80">{option.description}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Check-in Schedule (for phone monitoring) */}
      {data.checkInSchedule && (
        <section className="py-20 bg-white">
          <div className="container-custom">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                  Check-in Schedule Options
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Choose the frequency that works best for your situation.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" stagger>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {data.checkInSchedule.map((option, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-secondary transition-colors"
                  >
                    <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                      <Calendar size={28} className="text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3">{option.name}</h3>
                    <p className="text-gray-600">{option.description}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {data.benefits && (
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                  Benefits
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Why choose our {data.title.toLowerCase()}?
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" stagger>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {data.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-white rounded-xl p-6 shadow-lg"
                  >
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={20} className="text-white" />
                    </div>
                    <p className="text-gray-700 font-medium">{benefit}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Specialized Care (for PSW) */}
      {data.specializedCare && (
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                  Specialized Care
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Our PSWs are trained in specialized care areas.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" stagger>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {data.specializedCare.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                      <Heart size={28} className="text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Conditions Section (for foot care) */}
      {data.conditions && (
        <section className="py-20 bg-white">
          <div className="container-custom">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                  Conditions We Treat
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Our foot care nurses are trained to address various foot health concerns.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-up">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {data.conditions.map((condition, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-gray-50 rounded-xl px-6 py-4"
                  >
                    <CheckCircle size={20} className="text-secondary flex-shrink-0" />
                    <span className="text-gray-700">{condition}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Situations Section (for emergency) */}
      {data.situations && (
        <section className="py-20 bg-white">
          <div className="container-custom">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                  When to Call Us
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Our emergency services are available for a variety of urgent situations.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-up">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {data.situations.map((situation, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-gray-50 rounded-xl px-6 py-4"
                  >
                    <Clock size={20} className="text-secondary flex-shrink-0" />
                    <span className="text-gray-700">{situation}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Monitoring Section (for phone monitoring) */}
      {data.monitoring && (
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                  What We Monitor
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Our RNs assess multiple aspects of your health and wellbeing during each check-in.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-up">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {data.monitoring.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-white rounded-xl px-6 py-4 shadow-lg"
                  >
                    <CheckCircle size={20} className="text-secondary flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Features for specialized services (string features) */}
      {data.features && typeof data.features[0] === 'string' && (
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                  What's Included
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Comprehensive support and guidance for your care journey.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-up">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {data.features.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-white rounded-xl px-6 py-4 shadow-lg"
                  >
                    <CheckCircle size={20} className="text-secondary flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {data.faqs && (
        <section className="py-20 bg-white">
          <div className="container-custom">
            <AnimatedSection animation="fade-up">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Find answers to common questions about our {data.title.toLowerCase()}.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-up">
              <div className="max-w-3xl mx-auto space-y-4">
                {data.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-2xl p-6"
                  >
                    <h3 className="text-lg font-semibold text-primary mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="container-custom text-center">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Contact us today to learn more about our {data.title.toLowerCase()} or to schedule a consultation.
            </p>
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

export default ServiceDetail;