// Static fallback data for all pages
// This data is used when the API is unavailable

// Import images for static data
import training from '../assets/images/training.avif';
import training_2 from '../assets/images/training.jpg';
import backimg from '../assets/images/college.jpg';
import aboutimg from '../assets/images/about.jpg';
import Personal from '../assets/images/personal.webp';
import foot from '../assets/images/foot.jpg';
import cpr from '../assets/images/cpr.jpg';
import join from '../assets/images/joinus.avif';
import aboutus from '../assets/images/about_bg.jpg';
import mission from '../assets/images/student.png';
import president from '../assets/images/president_2.png';
import clo from '../assets/images/clo.png';
import why_choose from '../assets/images/teaching.jpg';
import contactimg from '../assets/images/contact.jpeg';

// Home page static data
export const homeStaticData = {
  pageId: 'home',
  title: 'Home',
  sections: {
    hero: {
      sectionId: 'hero',
      title: 'Build Your Healthcare Career',
      subtitle: 'Professional Healthcare Training Since 1987',
      description: 'Quality education and professional training programs for aspiring healthcare professionals. Get certified and start making a difference.',
      images: [{ url: backimg, alt: 'Healthcare training facility' }],
      buttons: [
        { text: 'Explore Programs', link: '/care-ed', style: 'primary' },
        { text: 'Contact Us', link: '/contact', style: 'secondary' }
      ],
      trustIndicators: {
        avatarCount: 4,
        text: '500+ Students Graduated'
      },
      isActive: true,
      order: 1
    },
    stats: {
      sectionId: 'stats',
      title: 'Our Impact',
      items: [
        { number: 15, suffix: '+', label: 'Years Teaching', icon: 'Award' },
        { number: 100, suffix: '%', label: 'Licensed Instructors', icon: 'BadgeCheck' },
        { number: 500, suffix: '+', label: 'Students Graduated', icon: 'Users' },
        { number: 95, suffix: '%', label: 'Job Placement Rate', icon: 'Star' }
      ],
      isActive: true,
      order: 2
    },
    features: {
      sectionId: 'features',
      title: 'Why Study With Us',
      items: [
        { icon: 'Award', title: 'Accredited Programs', description: 'Registered under NB Private Occupational Training Act with licensed instructors.', image: null },
        { icon: 'GraduationCap', title: 'Experienced Faculty', description: 'Learn from licensed RN/LPN professionals with years of practical experience.', image: null },
        { icon: 'Briefcase', title: 'Career Support', description: 'Job placement assistance and guidance to help start your healthcare career.', image: null },
        { icon: 'Users', title: 'Small Class Sizes', description: 'Personalized attention with manageable class sizes for better learning.', image: null },
        { icon: 'Clock', title: 'Flexible Scheduling', description: 'Various program schedules to accommodate different needs and availability.', image: null }
      ],
      isActive: true,
      order: 3
    },
    programs: {
      sectionId: 'programs',
      title: 'Healthcare Training Programs',
      subtitle: 'Accredited programs designed to prepare you for a rewarding career in healthcare.',
      items: [
        { icon: 'GraduationCap', title: 'PSW Program', description: 'Approved Personal Support Worker program with comprehensive training, hands-on practicums, and job placement support.', link: '/care-ed', image: Personal },
        { icon: 'Heart', title: 'First Aid & CPR', description: 'Essential life-saving skills certification for healthcare professionals and caregivers at all levels.', link: '/care-ed', image: cpr },
        { icon: 'Activity', title: 'Foot Care Training', description: 'Advanced foot care training for nurses specializing in diabetic and geriatric foot care management.', link: '/care-ed', image: foot },
        { icon: 'BookOpen', title: 'Specialized Workshops', description: 'Professional development workshops including WHMIS, Safe Food Handling, and safeTalk certification.', link: '/care-ed', image: training }
      ],
      isActive: true,
      order: 4
    },
    about: {
      sectionId: 'about',
      title: 'Professional Healthcare Education & Training',
      description: 'Care-Ed Learning Center has been providing quality healthcare education and professional training since 1987. Our programs are designed to prepare students for rewarding careers in healthcare.',
      content: 'We offer approved training programs with hands-on practicums, classroom lectures, and professional mentoring. Our goal is to provide research-based knowledge and skill-building opportunities.',
      features: [
        'Licensed RN/LPN Instructors',
        'Approved Training Programs',
        'Hands-on Practicum',
        'Job Placement Support'
      ],
      images: [{ url: training_2, alt: 'About Care-Ed' }],
      badge: {
        number: 15,
        suffix: '+',
        label: 'Years Teaching'
      },
      buttons: [
        { text: 'Learn More About Us', link: '/about', style: 'primary' }
      ],
      isActive: true,
      order: 5
    },
    testimonials: {
      sectionId: 'testimonials',
      title: 'What Our Students Say',
      description: 'Hear from our graduates who have successfully started their healthcare careers.',
      items: [
        { quote: 'The PSW program at Care-Ed gave me the skills and confidence to start a rewarding career in healthcare. The instructors were amazing!', author: 'Sarah M.', role: 'PSW Graduate, Class of 2023' },
        { quote: 'I completed my First Aid and CPR certification here. The hands-on training and supportive environment made learning easy and enjoyable.', author: 'Michael T.', role: 'Healthcare Professional' },
        { quote: 'The foot care training program was comprehensive and practical. I now feel confident providing specialized care to my patients.', author: 'Jennifer L.', role: 'RN, Foot Care Nurse' }
      ],
      isActive: true,
      order: 6
    },
    cta: {
      sectionId: 'cta',
      title: 'Ready to Begin Your Healthcare Career?',
      subtitle: 'Start Your Journey',
      description: 'Join hundreds of graduates who have successfully started their careers in healthcare through our professional training programs.',
      features: [
        { icon: 'GraduationCap', label: 'PSW Program' },
        { icon: 'Heart', label: 'First Aid & CPR' },
        { icon: 'Activity', label: 'Foot Care' },
        { icon: 'BookOpen', label: 'Workshops' }
      ],
      badge: {
        number: 95,
        suffix: '%',
        label: 'Job Placement Rate'
      },
      buttons: [
        { text: 'Contact Us', link: '/contact', style: 'primary' }
      ],
      images: [{ url: join, alt: 'Healthcare students' }],
      isActive: true,
      order: 7
    },
    bottomCta: {
      sectionId: 'bottomCta',
      title: 'Enroll in Our Programs Today',
      description: 'Take the first step toward a rewarding career in healthcare. Contact us to learn more about our programs and enrollment.',
      buttons: [
        { text: 'View Programs', link: '/care-ed', style: 'primary' },
        { text: 'Contact Us', link: '/contact', style: 'secondary' }
      ],
      isActive: true,
      order: 8
    }
  }
};

// About page static data
export const aboutStaticData = {
  pageId: 'about',
  title: 'About Us',
  sections: {
    hero: {
      sectionId: 'hero',
      title: 'About Care-Ed',
      subtitle: 'Excellence in Healthcare Education Since 1987',
      description: 'Professional healthcare education since 1987. We provide quality training programs that prepare students for rewarding careers in healthcare.',
      images: [{ url: aboutus, alt: 'Care-Ed team' }],
      buttons: [
        { text: 'Contact Us', link: '/contact', style: 'primary' },
        { text: 'View Programs', link: '/care-ed', style: 'secondary' }
      ],
      isActive: true,
      order: 1
    },
    mission: {
      sectionId: 'mission',
      title: 'Our Mission',
      description: '"To provide customized, client-sensitive support services and education programs resulting in improved standards, attitudes and services."',
      content: {
        vision: 'Care-Ed Learning Center, established in 1987, is the educational division of Care-ed Inc. We offer approved training programs including Personal Support Worker (PSW), First Aid & CPR, Foot Care Management, and specialized workshops.'
      },
      stats: [
        { number: 15, suffix: '+', label: 'Years Teaching' },
        { number: 100, suffix: '%', label: 'Licensed Instructors' }
      ],
      images: [{ url: mission, alt: 'Healthcare education' }],
      isActive: true,
      order: 2
    },
    values: {
      sectionId: 'values',
      title: 'Our Values',
      subtitle: 'The principles that guide our educational programs.',
      items: [
        { icon: 'GraduationCap', title: 'Quality Education', description: 'We provide research-based knowledge and skill-building opportunities for healthcare professionals.' },
        { icon: 'Target', title: 'Student-Focused', description: 'Our programs are designed to meet the needs of students and prepare them for successful careers.' },
        { icon: 'Users', title: 'Community-Oriented', description: 'We listen and respond to the needs of our community and healthcare industry.' },
        { icon: 'Award', title: 'Excellence', description: 'We maintain rigorous standards through constant evaluation and licensed instructors.' }
      ],
      isActive: true,
      order: 3
    },
    timeline: {
      sectionId: 'timeline',
      title: 'Our Journey',
      subtitle: 'A legacy of healthcare education and professional training.',
      items: [
        { year: '1987', title: 'Company Founded', description: 'Care-ed was established by Jean E. Porter Mowatt and Sharon A. O\'Brien.' },
        { year: '1993', title: 'Educational Endowment', description: 'Established an Educational Endowment Fund to support caregiver education.' },
        { year: '2001', title: 'Learn While You Earn', description: 'Launched Employee in Action – Learn While You Earn Program.' },
        { year: '1987', title: 'Care-Ed Learning Center', description: 'Founded Care-Ed Learning Center for professional healthcare training.' },
        { year: 'Today', title: 'Continuing Excellence', description: '15+ years of quality healthcare education and professional training programs.' }
      ],
      isActive: true,
      order: 4
    },
    leadership: {
      sectionId: 'leadership',
      title: 'Leadership Team',
      subtitle: 'Dedicated professionals committed to excellence in healthcare education.',
      items: [
        { name: 'Jean E. Porter Mowatt', role: 'President & CEO', bio: 'Communications specialist with 39 years in cablevision and print media. Recipient of the Omer Girard Award for innovation in cable television.', image: president },
        { name: 'Sharon A. O\'Brien (1938-2024)', role: 'Executive Vice-President & CLO', bio: 'RN with social work and gerontology credentials. Developed the PSW program and Foot Care Management Course.', image: clo }
      ],
      isActive: true,
      order: 5
    },
    location: {
      sectionId: 'location',
      title: 'Location',
      description: 'Conveniently located in Saint John, New Brunswick, serving students from across the region.',
      visitLabel: 'Visit Us',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2825.4832!2d-66.0637!3d45.2715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDE2JzE3LjQiTiA2NsKwMDMnNDUuMyJX!5e0!3m2!1sen!2sca!4v1234567890',
      address: {
        street: '100 Prince Edward St Unit #111',
        city: 'Saint John, NB E2L 4M5'
      },
      phone: '(506) 634-8906',
      tollFree: '1(800) 561-2463',
      areas: ['Saint John', 'Quispamsis', 'Rothesay', 'Grand Bay-Westfield'],
      isActive: true,
      order: 6
    },
    whyChoose: {
      sectionId: 'whyChoose',
      title: 'Why Choose Care-Ed?',
      subtitle: 'Discover what makes us the right choice for your healthcare education.',
      items: [
        { title: 'Approved training programs under NB Private Occupational Training Act' },
        { title: 'Licensed RN/LPN instructors with practical experience' },
        { title: 'Hands-on practicum and professional mentoring' },
        { title: 'Gerontology-based approach to education' },
        { title: 'Job placement support for graduates' },
        { title: 'Small class sizes for personalized attention' }
      ],
      images: [{ url: why_choose, alt: 'Healthcare training' }],
      isActive: true,
      order: 7
    },
    cta: {
      sectionId: 'cta',
      title: 'Ready to Start Your Healthcare Career?',
      description: 'Contact us today to learn more about our programs and enrollment.',
      buttons: [
        { text: 'Contact Us', link: '/contact', style: 'primary' }
      ],
      isActive: true,
      order: 8
    }
  }
};

// Services page static data
export const servicesStaticData = {
  pageId: 'services',
  title: 'Services',
  sections: {
    hero: {
      sectionId: 'hero',
      title: 'Our Services',
      subtitle: 'Comprehensive Healthcare Services',
      description: 'From personal care to specialized programs, we offer a full range of services to meet your needs.',
      isActive: true,
      order: 1
    },
    services: {
      sectionId: 'services',
      title: 'Home Care Services',
      items: [
        { id: 'home-care', title: 'Home Care Services', description: 'Personalized care in the comfort of your home', icon: 'Home', link: '/services/home-care', features: ['Personal care', 'Meal preparation', 'Light housekeeping'] },
        { id: 'foot-care', title: 'Foot Care Services', description: 'Professional foot care for health and comfort', icon: 'Activity', link: '/services/foot-care', features: ['Nail care', 'Callus treatment', 'Diabetic foot care'] },
        { id: 'personal-support', title: 'Personal Support', description: 'Assistance with daily activities', icon: 'User', link: '/services/personal-support', features: ['Bathing assistance', 'Mobility support', 'Companionship'] },
        { id: 'emergency', title: 'Emergency Response', description: '24/7 emergency care services', icon: 'Phone', link: '/services/emergency-response', features: ['Pendant systems', 'Fall detection', 'Medical alerts'] },
        { id: 'bath-services', title: 'Specialized Bath Services', description: 'Safe and comfortable bathing assistance', icon: 'Droplet', link: '/services/bath-services', features: ['Accessible bathing', 'Safety equipment', 'Personal care'] },
        { id: 'phone-monitoring', title: 'Phone Monitoring', description: 'Regular check-ins for peace of mind', icon: 'MessageCircle', link: '/services/phone-monitoring', features: ['Daily calls', 'Wellness checks', 'Emergency escalation'] }
      ],
      isActive: true,
      order: 2
    },
    specialized: {
      sectionId: 'specialized',
      title: 'Specialized Programs',
      items: [
        { id: 'swift', title: 'SWIFT Program', description: 'Short-term intervention for seniors', icon: 'Zap' },
        { id: 'consultations', title: 'Professional Consultations', description: 'Expert healthcare consultations', icon: 'Users' },
        { id: 'workshops', title: 'Caregiver Workshops', description: 'Training for family caregivers', icon: 'BookOpen' },
        { id: 'end-of-life', title: 'End-of-Life Care', description: 'Compassionate palliative support', icon: 'Heart' }
      ],
      isActive: true,
      order: 3
    },
    insurance: {
      sectionId: 'insurance',
      title: 'Insurance Partners',
      description: 'We work with major insurance providers to make our services accessible.',
      items: [
        { name: 'Medavie Blue Cross' },
        { name: 'Blue Cross' },
        { name: 'Veterans Affairs Canada' },
        { name: 'Workers Compensation' }
      ],
      isActive: true,
      order: 4
    }
  }
};

// Care-Ed page static data
export const careEdStaticData = {
  pageId: 'care-ed',
  title: 'Care-Ed Programs',
  sections: {
    hero: {
      sectionId: 'hero',
      title: 'Care-Ed Learning Center',
      subtitle: 'Professional Training Since 1987',
      description: 'Professional healthcare education and training programs designed to prepare students for successful careers.',
      badge: {
        text: 'Professional Training Since 1987',
        icon: 'GraduationCap'
      },
      images: [],
      isActive: true,
      order: 1
    },
    intro: {
      sectionId: 'intro',
      title: 'Professional Healthcare Education',
      description: 'Care-Ed Learning Center is officially registered under the NB Private Occupational Training Act. We provide comprehensive training programs for individuals seeking careers in healthcare and professional certifications.',
      content: 'Our goal is to provide research-based knowledge and skill-building opportunities that prepare students for rewarding healthcare careers with licensed instructors and hands-on training.',
      stats: [
        { number: 15, suffix: '+', label: 'Years of Training' },
        { number: 100, suffix: '%', label: 'Licensed Instructors' }
      ],
      images: [],
      isActive: true,
      order: 2
    },
    programs: {
      sectionId: 'programs',
      title: 'Our Programs',
      subtitle: 'Comprehensive training programs designed to prepare you for a rewarding career in healthcare.',
      items: [
        { id: 'psw', title: 'Personal Support Worker (PSW) Program', description: 'Approved training program with hands-on practicums, classroom lectures, and professional mentoring. Comprehensive preparation for a rewarding career in healthcare.', duration: 'Full Program', icon: 'GraduationCap', features: ['Approved training program', 'Hands-on practicum experience', 'Classroom lectures', 'Professional mentoring', 'Job placement support'], prerequisites: ['High School or GED Certificate', 'Current CPR/First Aid Certificate', 'Criminal Record Check', 'Vulnerable Sector Check', 'Dept. of Social Development Record Check'] },
        { id: 'first-aid', title: 'First Aid & CPR Training', description: 'Essential life-saving skills certification for healthcare professionals, caregivers, and anyone interested in emergency preparedness.', duration: 'Various Levels', icon: 'BookOpen', features: ['All certification levels available', 'Healthcare provider level', 'Recertification courses', 'Group training available', 'Certification upon completion'] },
        { id: 'foot-care', title: 'Foot Care Management', description: 'Advanced foot care training for nurses specializing in diabetic and geriatric foot care. Requires current nursing registration.', duration: 'Certificate Program', icon: 'Users', features: ['For registered nurses (RN/LPN)', 'Diabetic foot care', 'Geriatric foot care', 'Hands-on training', 'Certificate upon completion'] }
      ],
      isActive: true,
      order: 3
    },
    workshops: {
      sectionId: 'workshops',
      title: 'Workshops',
      subtitle: 'Short, focused workshops to enhance your skills and meet certification requirements.',
      items: [
        { id: 'whmis', title: 'WHMIS', duration: '3 hours', description: 'Workplace Hazardous Materials Information System training for safe handling of hazardous materials.' },
        { id: 'food-safety', title: 'Safe Food Handling', duration: '3 hours', description: 'Essential sanitation and food safety practices for caregivers and healthcare workers.' },
        { id: 'safetalk', title: 'safeTALK', duration: '3 hours', description: 'Suicide warning signs recognition training to help identify and support those at risk.' }
      ],
      isActive: true,
      order: 4
    },
    accreditations: {
      sectionId: 'accreditations',
      title: 'Accreditations & Memberships',
      subtitle: 'Registered under NB Private Occupational Training Act with licensed instructors.',
      items: [
        { name: 'NBAPCU', description: 'New Brunswick Association of Personal Care Workers' },
        { name: 'NACC', description: 'National Association of Career Colleges' },
        { name: 'NBHSA', description: 'New Brunswick Health & Safety Association' }
      ],
      isActive: true,
      order: 5
    },
    instructors: {
      sectionId: 'instructors',
      title: 'Qualified Instructors',
      description: 'All our instructors hold current RN or LPN licenses and bring years of practical experience to the classroom. We maintain rigorous standards through constant evaluation of our teaching staff.',
      features: ['Current RN/LPN licenses', 'Years of practical experience', 'Ongoing professional development', 'Gerontology expertise', 'Patient-centered teaching approach'],
      images: [],
      isActive: true,
      order: 6
    },
    cta: {
      sectionId: 'cta',
      title: 'Ready to Start Your Healthcare Career?',
      description: 'Contact us today to learn more about our programs or to register for an upcoming session.',
      buttons: [
        { text: 'Contact Us', link: '/contact', style: 'primary' },
        { text: '(506) 634-8906', link: 'tel:+15066348906', style: 'secondary' }
      ],
      contactEmail: 'train@seniorwatch.com',
      contactName: 'Heidi',
      isActive: true,
      order: 7
    }
  }
};

// Careers page static data
export const careersStaticData = {
  pageId: 'careers',
  title: 'Careers',
  sections: {
    hero: {
      sectionId: 'hero',
      title: 'Career Services',
      subtitle: 'Student Success Center',
      description: 'We support our students throughout their journey — from training to job placement and beyond. Our career services team helps you build skills, find opportunities, and launch your healthcare career.',
      badge: {
        text: 'Student Success Center',
        icon: 'GraduationCap'
      },
      images: [],
      isActive: true,
      order: 1
    },
    careerServices: {
      sectionId: 'careerServices',
      title: 'Our Career Services',
      subtitle: 'We help students become job-ready and successfully placed in the healthcare industry.',
      items: [
        { id: 'job-placement-assistance', icon: 'Briefcase', title: 'Job Placement Assistance', subtitle: 'Connecting you with top healthcare employers', description: 'We connect graduates with healthcare employers and job opportunities across New Brunswick.', imageUrl: '/images/career-job-placement.jpg' },
        { id: 'resume-building', icon: 'FileText', title: 'Resume Building', subtitle: 'Stand out with a professional healthcare resume', description: 'Professional resume support to help you stand out in the healthcare job market.', imageUrl: '/images/career-resume.jpg' },
        { id: 'interview-preparation', icon: 'Users', title: 'Interview Preparation', subtitle: 'Walk in confident, walk out hired', description: 'Mock interviews and expert guidance to help you succeed in your job interviews.', imageUrl: '/images/career-interview.jpg' },
        { id: 'career-counselling', icon: 'Target', title: 'Career Counselling', subtitle: 'Your career path, guided by experts', description: 'One-on-one guidance to plan your career path in the healthcare industry.', imageUrl: '/images/career-counselling.jpg' },
        { id: 'internship-support', icon: 'GraduationCap', title: 'Internship Support', subtitle: 'Real-world experience through our partner network', description: 'Hands-on training and real-world experience through our partner network.', imageUrl: '/images/career-internship.jpg' },
        { id: 'skill-development', icon: 'Rocket', title: 'Skill Development', subtitle: 'Workshops to sharpen your professional edge', description: 'Workshops for communication, workplace readiness, and professional growth.', imageUrl: '/images/career-skills.jpg' }
      ],
      isActive: true,
      order: 2
    },
    careerJourney: {
      sectionId: 'careerJourney',
      title: 'Your Career Journey',
      subtitle: 'A clear path from education to employment — we guide you every step of the way.',
      items: [
        { icon: 'GraduationCap', title: 'Learn', description: 'Enroll in our accredited programs' },
        { icon: 'Award', title: 'Train', description: 'Gain hands-on practical experience' },
        { icon: 'Briefcase', title: 'Internship', description: 'Real-world placement opportunities' },
        { icon: 'Rocket', title: 'Get Hired', description: 'Launch your healthcare career' }
      ],
      isActive: true,
      order: 3
    },
    whyJoinUs: {
      sectionId: 'whyJoinUs',
      title: 'Why Work With Us?',
      description: "At Care-ed, we've been providing quality healthcare education and employment opportunities for over 15 years. We value our employees and offer competitive benefits, professional development, and a supportive work environment.",
      isActive: true,
      order: 4
    },
    positions: {
      sectionId: 'positions',
      title: 'Open Positions',
      subtitle: 'Explore our current job openings and find the perfect fit for your skills and interests.',
      items: [
        {
          id: 'psw',
          title: 'Personal Support Worker',
          location: 'Greater Saint John',
          type: 'Full-time / Part-time',
          description: 'Provide compassionate care to seniors in their homes or hospital settings. Assist with daily living activities, meal preparation, and wellness promotion.',
          requirements: [
            'Current CPR and First Aid Certification',
            'PSW Certificate (training available)',
            'Access to a car',
            'Background checks required'
          ]
        },
        {
          id: 'schedule-manager',
          title: 'Schedule Manager',
          location: 'Greater Saint John',
          type: 'Full-time',
          description: 'Coordinate and manage caregiver schedules to ensure seamless coverage for all clients. Handle scheduling conflicts and communicate with staff and families.',
          requirements: [
            'Strong organizational skills',
            'Experience in healthcare scheduling preferred',
            'Excellent communication skills',
            'Proficiency with scheduling software'
          ]
        },
        {
          id: 'foot-care-nurse',
          title: 'Foot Care Nurse',
          location: 'Greater Saint John',
          type: 'Full-time / Part-time',
          description: 'Provide professional foot care services to seniors, including treatment of calluses, corns, and thickened nails. Work in clinic, home, or hospital settings.',
          requirements: [
            'Current RN or LPN license',
            'Foot Care Management certification preferred',
            'Experience in geriatric care',
            'Valid driver\'s license'
          ]
        },
        {
          id: 'international-medical',
          title: 'Trained Medical Internationals',
          location: 'Greater Saint John',
          type: 'Full-time',
          description: 'International healthcare professionals looking to gain Canadian work experience in senior care. We provide support and mentorship.',
          requirements: [
            'Medical credentials from home country',
            'Interest in senior care',
            'Valid work permit',
            'Good communication skills in English'
          ]
        },
        {
          id: 'psw-training',
          title: 'PSW on-the-job Training for Internationals',
          location: 'Greater Saint John',
          type: 'Full-time',
          description: 'Combined training and employment program for international candidates. Learn while you earn through our Care-Ed Learning Center.',
          requirements: [
            'Interest in healthcare career',
            'Valid work permit',
            'Commitment to complete training',
            'Good communication skills'
          ]
        }
      ],
      isActive: true,
      order: 7
    },
    benefits: {
      sectionId: 'benefits',
      title: 'Benefits & Perks',
      sectionImage: null,
      items: [
        { icon: 'Heart', title: 'Health Insurance', description: 'Comprehensive health coverage with prescriptions, dental, and vision for full-time employees' },
        { icon: 'Users', title: 'Family Health Plan', description: 'Family health plan available for eligible employees' },
        { icon: 'GraduationCap', title: 'Training Programs', description: 'PSW training and professional development opportunities' },
        { icon: 'Clock', title: 'Flexible Hours', description: 'Part-time or full-time employment options to suit your schedule' }
      ],
      isActive: true,
      order: 5
    },
    employerConnections: {
      sectionId: 'employerConnections',
      title: 'Employer Connections',
      description: 'We maintain strong relationships with healthcare facilities, nursing homes, and home care providers across New Brunswick. Our graduates are sought after by employers who value quality training.',
      points: [
        'Direct connections with healthcare employers',
        'Job placement assistance for graduates',
        'Internship opportunities with partner facilities',
        'Career guidance from industry professionals'
      ],
      ctaCard: {
        title: 'For Healthcare Employers',
        description: 'Looking to hire qualified healthcare professionals? Partner with us to access trained and certified graduates ready to make an impact.',
        buttonText: 'Partner With Us',
        buttonLink: '/contact'
      },
      isActive: true,
      order: 6
    },
    generalRequirements: {
      sectionId: 'generalRequirements',
      title: 'General Requirements',
      description: "All positions require the following documentation and certifications. Don't worry if you don't have everything — we offer training programs to help you get qualified.",
      requirements: [
        'Current CPR and First Aid Certification',
        'PSW Certificate (training available through Care-Ed Learning Program)',
        'Willingness to work 30-44 hours per week',
        'Access to a car',
        'DSD Record Check',
        'Vulnerable Sector Check',
        'Criminal Record Check'
      ],
      isActive: true,
      order: 8
    },
    trainingCard: {
      sectionId: 'trainingCard',
      title: 'Training Available',
      description: "Don't have your PSW Certificate yet? We offer comprehensive training through our Care-Ed Learning Center. Our Learn While You Earn program allows you to gain valuable experience while completing your certification.",
      highlights: [
        'Comprehensive PSW certification program',
        'Hands-on clinical experience',
        'Flexible scheduling options',
        'CPR & First Aid certification included',
        'Job placement assistance upon completion'
      ],
      ctaText: 'Learn About PSW Training',
      ctaLink: '/care-ed',
      isActive: true,
      order: 9
    },
    howToApply: {
      sectionId: 'howToApply',
      title: 'How to Apply',
      description: 'Ready to join our team? Here\'s how to submit your application.',
      email: 'train@seniorwatch.com',
      phone: '(506) 634-8906',
      applicationFormat: [
        'Resume in MS Word or PDF format',
        'Cover letter indicating position of interest',
        'Include relevant certifications and references'
      ],
      isActive: true,
      order: 10
    },
    cta: {
      sectionId: 'cta',
      title: 'Ready to Start Your Healthcare Career?',
      description: 'Our career services team is here to guide you every step of the way. Get personalized career guidance from industry professionals.',
      buttons: [
        { text: 'Get Career Guidance', link: '/contact', style: 'primary' },
        { text: 'Explore Programs', link: '/care-ed', style: 'secondary' }
      ],
      isActive: true,
      order: 11
    }
  }
};

// Contact page static data
export const contactStaticData = {
  pageId: 'contact',
  title: 'Contact',
  sections: {
    hero: {
      sectionId: 'hero',
      title: 'Contact Us',
      subtitle: 'Get in Touch',
      description: 'We\'re here to answer your questions about our programs and services.',
      images: [{ url: contactimg, alt: 'Contact Care-Ed' }],
      isActive: true,
      order: 1
    },
    info: {
      sectionId: 'info',
      title: 'Contact Information',
      items: [
        { label: 'Address', value: '100 Prince Edward St Unit #111, Saint John, NB E2L 4M5', icon: 'MapPin', link: 'https://maps.google.com/?q=100+Prince+Edward+St+Saint+John+NB' },
        { label: 'Phone', value: '(506) 634-8906', icon: 'Phone', link: 'tel:+15066348906' },
        { label: 'Toll-Free', value: '1(800) 561-2463', icon: 'Phone', link: 'tel:+18005612463' },
        { label: 'Email', value: 'train@seniorwatch.com', icon: 'Mail', link: 'train@seniorwatch.com', isEmail: true }
      ],
      isActive: true,
      order: 2
    },
    hours: {
      sectionId: 'hours',
      title: 'Office Hours',
      items: [
        { days: 'Monday - Friday', hours: '8:00 AM - 5:00 PM' },
        { days: 'Saturday', hours: '9:00 AM - 12:00 PM' },
        { days: 'Sunday', hours: 'Closed' }
      ],
      isActive: true,
      order: 3
    },
    areas: {
      sectionId: 'areas',
      title: 'Serving Students From',
      description: 'We welcome students from the Greater Saint John area and surrounding communities:',
      items: [
        { name: 'Saint John' },
        { name: 'Moncton' },
        { name: 'Fredericton' },
        { name: 'Rothesay' },
        { name: 'Quispamsis' }
      ],
      isActive: true,
      order: 4
    },
    quickContact: {
      sectionId: 'quickContact',
      title: 'Quick Contact',
      description: 'Have questions about our programs? Our team is ready to help you get started on your healthcare career.',
      items: [
        { icon: 'Phone', title: 'Call Us', subtitle: 'For immediate assistance', value: '(506) 634-8906', link: 'tel:+15066348906' },
        { icon: 'Mail', title: 'Email Us', subtitle: 'For general inquiries', value: 'train@seniorwatch.com', link: 'train@seniorwatch.com', isEmail: true },
        { icon: 'MapPin', title: 'Visit Us', subtitle: 'At our office location', value: 'Get Directions', link: 'https://maps.google.com/?q=100+Prince+Edward+St+Saint+John+NB' }
      ],
      isActive: true,
      order: 5
    },
    cta: {
      sectionId: 'cta',
      title: 'Start Your Healthcare Career',
      description: 'Whether you\'re interested in our PSW program, certification courses, or have questions about enrollment, we\'d love to hear from you.',
      buttons: [
        { text: '(506) 634-8906', link: 'tel:+15066348906', style: 'primary' }
      ],
      isActive: true,
      order: 6
    }
  }
};

// Global sections (navbar, footer, branding)
export const globalStaticData = {
  pageId: 'global',
  title: 'Global Elements',
  sections: {
    branding: {
      sectionId: 'branding',
      title: 'Branding',
      content: {
        siteName: 'Care-Ed Learning Center',
        logo: {
          url: '',
          alt: 'Care-Ed Logo',
          publicId: ''
        },
        logoLight: {
          url: '',
          alt: 'Care-Ed Logo Light',
          publicId: ''
        },
        favicon: {
          url: '',
          publicId: ''
        }
      },
      isActive: true,
      order: 0
    },
    navbar: {
      sectionId: 'navbar',
      title: 'Navigation',
      content: {
        links: [
          { label: 'Home', path: '/' },
          { label: 'About', path: '/about' },
          { label: 'Programs', path: '/care-ed' },
          { label: 'Services', path: '/services' },
          { label: 'Careers', path: '/careers' },
          { label: 'Contact', path: '/contact' }
        ],
        ctaButton: { text: 'Enroll Now', link: '/care-ed' },
        contactInfo: {
          phone: '(506) 634-8906',
          email: 'info@carelearning.ca'
        },
        tagline: 'Professional Healthcare Training Since 1987'
      },
      isActive: true,
      order: 1
    },
    footer: {
      sectionId: 'footer',
      title: 'Footer',
      content: {
        companyInfo: {
          name: 'Care-Ed Learning Center',
          description: 'Professional healthcare education and training since 1987. Building careers through quality education.',
          address: '100 Prince Edward St, Saint John, NB'
        },
        quickLinks: [
          { label: 'Home', path: '/' },
          { label: 'About Us', path: '/about' },
          { label: 'Programs', path: '/care-ed' },
          { label: 'Contact', path: '/contact' }
        ],
        programs: [
          { label: 'PSW Program', path: '/care-ed' },
          { label: 'CPR & First Aid', path: '/care-ed' },
          { label: 'Foot Care Training', path: '/care-ed' }
        ],
        socialLinks: [
          { platform: 'Facebook', url: 'https://facebook.com/careed' },
          { platform: 'LinkedIn', url: 'https://linkedin.com/company/careed' }
        ],
        contactInfo: {
          phone: '(506) 634-8906',
          email: 'info@carelearning.ca',
          address: '100 Prince Edward St, Saint John, NB'
        },
        copyright: '© {year} Care-Ed Inc. All rights reserved.',
        privacyLink: '/privacy',
        termsLink: '/terms'
      },
      isActive: true,
      order: 2
    },
    contact: {
      sectionId: 'contact',
      title: 'Contact Information',
      content: {
        phone: '(506) 634-8906',
        phoneLink: 'tel:+15066348906',
        tollFree: '1(800) 561-2463',
        email: 'info@carelearning.ca',
        emailSecondary: 'train@seniorwatch.com',
        contactPersonName: 'Heidi',
        address: {
          street: '100 Prince Edward St Unit #111',
          city: 'Saint John',
          province: 'NB',
          postalCode: 'E2L 4M5',
          full: '100 Prince Edward St Unit #111, Saint John, NB E2L 4M5'
        },
        serviceAreas: ['Saint John', 'Quispamsis', 'Rothesay', 'Grand Bay-Westfield']
      },
      isActive: true,
      order: 3
    }
  }
};

// Get static data by page ID
export const getStaticPageData = (pageId) => {
  const pageData = {
    'home': homeStaticData,
    'about': aboutStaticData,
    'services': servicesStaticData,
    'care-ed': careEdStaticData,
    'careers': careersStaticData,
    'contact': contactStaticData,
    'global': globalStaticData
  };

  return pageData[pageId] || null;
};

// Export all static data
export default {
  homeStaticData,
  aboutStaticData,
  servicesStaticData,
  careEdStaticData,
  careersStaticData,
  contactStaticData,
  globalStaticData,
  getStaticPageData
};