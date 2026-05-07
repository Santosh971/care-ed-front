// Static fallback data for International Students pages
// This data is used when the API is unavailable

// ============================================
// LANDING PAGE STATIC DATA
// ============================================

export const internationalStudentsLandingData = {
  pageId: 'international-students',
  title: 'International Students',
  slug: 'international-students',
  parentCategory: null,
  order: 0,
  seo: {
    metaTitle: 'International Students | Care-Ed Learning Center',
    metaDescription: 'Welcome international students to Care-Ed Learning Center. Find programs, admissions, housing support, and resources for studying healthcare in Canada.',
    ogImage: null,
    canonicalUrl: '/international-students'
  },
  sections: {
    hero: {
      sectionId: 'hero',
      title: 'Welcome International Students',
      subtitle: 'Your Journey to Healthcare Excellence Starts Here',
      description: 'Care-Ed Learning Center welcomes students from around the world. We provide comprehensive support services to help you succeed in your healthcare education journey in Canada.',
      images: [],
      buttons: [
        { text: 'Explore Programs', link: '/international-students/programs', style: 'primary' },
        { text: 'How to Apply', link: '/international-students/how-to-apply', style: 'secondary' }
      ],
      isActive: true,
      order: 1
    },
    cardsGrid: {
      sectionId: 'cardsGrid',
      title: 'Resources for International Students',
      subtitle: 'Everything you need to know about studying with us',
      items: [
        { icon: 'GraduationCap', title: 'Programs', description: 'Explore healthcare programs designed for international students.', link: '/international-students/programs' },
        { icon: 'FileText', title: 'How to Apply', description: 'Step-by-step guide to your application process.', link: '/international-students/how-to-apply' },
        { icon: 'ClipboardCheck', title: 'Admission Requirements', description: 'Check requirements for international applicants.', link: '/international-students/admission-requirements' },
        { icon: 'DollarSign', title: 'Tuition & Fees', description: 'Understand costs, payment options, and refund policies.', link: '/international-students/tuition-fees' },
        { icon: 'Languages', title: 'Language Requirements', description: 'English language proficiency requirements.', link: '/international-students/language-requirements' },
        { icon: 'Home', title: 'Housing Support', description: 'Find accommodation options and support services.', link: '/international-students/housing-support' }
      ],
      columns: 3,
      isActive: true,
      order: 2
    },
    supportCards: {
      sectionId: 'supportCards',
      title: 'Support Services',
      subtitle: 'Were here to support you every step of the way',
      items: [
        { icon: 'Heart', title: 'Health Support', description: 'Access healthcare services and insurance information.', link: '/international-students/health-support' },
        { icon: 'Brain', title: 'Mental Health', description: 'Counseling and crisis support services.', link: '/international-students/mental-health' },
        { icon: 'Users', title: 'Community', description: 'Connect with peers and community resources.', link: '/international-students/social-support' },
        { icon: 'BookOpen', title: 'Academic Support', description: 'Tutoring, study groups, and academic resources.', link: '/international-students/academic-support' }
      ],
      isActive: true,
      order: 3
    },
    linkResources: {
      sectionId: 'linkResources',
      title: 'Important Resources',
      items: [
        { title: 'Immigration & Study Permits', description: 'Visa information and study permit guidance.', url: '/international-students/immigration', category: 'Visa' },
        { title: 'Student Rights', description: 'Know your rights and responsibilities.', url: '/international-students/student-rights', category: 'Legal' },
        { title: 'Student Advisor', description: 'Contact your dedicated international student advisor.', url: '/international-students/student-advisor', category: 'Support' },
        { title: 'FAQ', description: 'Answers to frequently asked questions.', url: '/international-students/faq', category: 'Help' }
      ],
      isActive: true,
      order: 4
    },
    bannerCTA: {
      sectionId: 'bannerCTA',
      title: 'Ready to Start Your Journey?',
      description: 'Contact our international student advisor for personalized guidance.',
      buttons: [
        { text: 'Contact Advisor', link: '/international-students/student-advisor', style: 'primary' },
        { text: 'Apply Now', link: '/international-students/how-to-apply', style: 'secondary' }
      ],
      isActive: true,
      order: 5
    }
  }
};

// ============================================
// CHILD PAGES STATIC DATA
// ============================================

export const internationalStudentsChildPages = [
  {
    pageId: 'is-programs',
    title: 'Programs for International Students',
    slug: 'programs',
    parentCategory: 'international-students',
    order: 1,
    seo: {
      metaTitle: 'Programs for International Students | Care-Ed Learning Center',
      metaDescription: 'Explore healthcare training programs available for international students at Care-Ed Learning Center.',
      ogImage: null,
      canonicalUrl: '/international-students/programs'
    },
    sections: {
      hero: {
        sectionId: 'hero',
        title: 'Programs for International Students',
        subtitle: 'Healthcare Training Programs',
        description: 'Care-Ed Learning Center offers internationally recognized healthcare training programs designed to prepare you for a successful career in the healthcare industry.',
        images: [],
        buttons: [
          { text: 'Apply Now', link: '/international-students/how-to-apply', style: 'primary' }
        ],
        isActive: true,
        order: 1
      },
      cardsGrid: {
        sectionId: 'cardsGrid',
        title: 'Available Programs',
        subtitle: 'Choose from our comprehensive healthcare programs',
        items: [
          { icon: 'GraduationCap', title: 'Personal Support Worker (PSW)', description: 'Comprehensive training for a rewarding career in healthcare support. Includes clinical placements and hands-on experience.', link: '/care-ed' },
          { icon: 'Heart', title: 'First Aid & CPR', description: 'Essential life-saving skills certification recognized internationally.', link: '/care-ed' },
          { icon: 'Activity', title: 'Foot Care Management', description: 'Specialized training for healthcare professionals focusing on diabetic and geriatric foot care.', link: '/care-ed' },
          { icon: 'BookOpen', title: 'Specialized Workshops', description: 'Professional development including WHMIS, Safe Food Handling, and more.', link: '/care-ed' }
        ],
        columns: 2,
        isActive: true,
        order: 2
      },
      richText: {
        sectionId: 'richText',
        title: 'Program Benefits for International Students',
        content: '<h2>Why Choose Our Programs?</h2><p>Our programs are designed with international students in mind:</p><ul><li><strong>Accredited Curriculum:</strong> All programs meet Canadian healthcare standards and are recognized by employers.</li><li><strong>Hands-on Training:</strong> Practical experience through clinical placements in healthcare facilities.</li><li><strong>Career Support:</strong> Job placement assistance and resume building workshops.</li><li><strong>Flexible Scheduling:</strong> Various class times to accommodate different needs.</li><li><strong>Small Class Sizes:</strong> Personalized attention from experienced instructors.</li></ul>',
        isActive: true,
        order: 3
      },
      bannerCTA: {
        sectionId: 'bannerCTA',
        title: 'Questions About Our Programs?',
        description: 'Contact our admissions team for detailed program information.',
        buttons: [
          { text: 'Contact Us', link: '/international-students/student-advisor', style: 'primary' }
        ],
        isActive: true,
        order: 4
      }
    }
  },
  {
    pageId: 'is-apply',
    title: 'How to Apply',
    slug: 'how-to-apply',
    parentCategory: 'international-students',
    order: 2,
    seo: {
      metaTitle: 'How to Apply | International Students | Care-Ed Learning Center',
      metaDescription: 'Step-by-step guide to applying as an international student at Care-Ed Learning Center.',
      ogImage: null,
      canonicalUrl: '/international-students/how-to-apply'
    },
    sections: {
      hero: {
        sectionId: 'hero',
        title: 'How to Apply',
        subtitle: 'Your Application Journey',
        description: 'Follow these steps to begin your healthcare education journey at Care-Ed Learning Center. Our admissions team is here to help you every step of the way.',
        images: [],
        buttons: [],
        isActive: true,
        order: 1
      },
      timelineSteps: {
        sectionId: 'timelineSteps',
        title: 'Application Steps',
        subtitle: 'Follow these steps to complete your application',
        items: [
          { step: 1, title: 'Research Programs', description: 'Explore our healthcare training programs and choose the one that fits your career goals. Review admission requirements and program details.' },
          { step: 2, title: 'Check Requirements', description: 'Ensure you meet all admission requirements including academic qualifications, language proficiency, and visa eligibility.' },
          { step: 3, title: 'Prepare Documents', description: 'Gather required documents: academic transcripts, English proficiency test results, passport copy, and identification photos.' },
          { step: 4, title: 'Submit Application', description: 'Complete the online application form and submit all required documents. Pay the application fee.' },
          { step: 5, title: 'Receive Offer', description: 'Once approved, you will receive a letter of acceptance. This is required for your study permit application.' },
          { step: 6, title: 'Apply for Study Permit', description: 'Apply for your Canadian study permit through Immigration, Refugees and Citizenship Canada (IRCC).' },
          { step: 7, title: 'Confirm Enrollment', description: 'Once your visa is approved, confirm your enrollment and prepare for your arrival in Canada.' }
        ],
        isActive: true,
        order: 2
      },
      contactCard: {
        sectionId: 'contactCard',
        title: 'Need Help with Your Application?',
        contactName: 'International Student Advisor',
        email: 'international@carelearning.ca',
        phone: '+1 (506) 634-8906',
        address: '100 Prince Edward St Unit #111, Saint John, NB E2L 4M5, Canada',
        hours: [
          { day: 'Monday - Friday', time: '9:00 AM - 5:00 PM (AST)' }
        ],
        isActive: true,
        order: 3
      },
      faq: {
        sectionId: 'faq',
        title: 'Application FAQs',
        items: [
          { question: 'How long does the application process take?', answer: 'The application review typically takes 5-10 business days. Study permit processing varies by country and can take several weeks to months.' },
          { question: 'Can I apply before taking my English proficiency test?', answer: 'Yes, you can submit your application, but you must provide your English proficiency test results before enrollment confirmation.' },
          { question: 'Is there an application fee?', answer: 'Yes, a non-refundable application fee is required. Contact our admissions office for current fee information.' }
        ],
        isActive: true,
        order: 4
      },
      bannerCTA: {
        sectionId: 'bannerCTA',
        title: 'Ready to Start Your Application?',
        description: 'Contact our international student advisor for personalized assistance.',
        buttons: [
          { text: 'Contact Advisor', link: '/international-students/student-advisor', style: 'primary' }
        ],
        isActive: true,
        order: 5
      }
    }
  },
  {
    pageId: 'is-admission-requirements',
    title: 'Admission Requirements',
    slug: 'admission-requirements',
    parentCategory: 'international-students',
    order: 3,
    seo: {
      metaTitle: 'Admission Requirements | International Students | Care-Ed Learning Center',
      metaDescription: 'Learn about admission requirements for international students applying to Care-Ed Learning Center healthcare programs.',
      ogImage: null,
      canonicalUrl: '/international-students/admission-requirements'
    },
    sections: {
      hero: {
        sectionId: 'hero',
        title: 'Admission Requirements',
        subtitle: 'Requirements for International Students',
        description: 'Review the admission requirements for international students. Our admissions team is available to answer any questions about your eligibility.',
        images: [],
        buttons: [],
        isActive: true,
        order: 1
      },
      policyTable: {
        sectionId: 'policyTable',
        title: 'General Requirements',
        headers: ['Requirement', 'Details', 'Notes'],
        rows: [
          ['Age', 'Minimum 18 years old', 'Must be of legal age'],
          ['Education', 'High school diploma or equivalent', 'Translated and authenticated'],
          ['English Proficiency', 'IELTS 6.0 or equivalent', 'See language requirements'],
          ['Valid Passport', 'Must be valid for study duration', 'Minimum 6 months validity'],
          ['Study Permit', 'Required for study in Canada', 'Apply after acceptance'],
          ['Health Insurance', 'Mandatory for all students', 'Can be arranged through school']
        ],
        isActive: true,
        order: 2
      },
      richText: {
        sectionId: 'richText',
        title: 'Document Requirements',
        content: '<h3>Required Documents</h3><p>All international applicants must submit the following documents:</p><ul><li><strong>Completed Application Form:</strong> Fill out all sections accurately.</li><li><strong>Academic Transcripts:</strong> Official transcripts from all secondary and post-secondary institutions, translated into English.</li><li><strong>English Proficiency Test Results:</strong> IELTS, TOEFL, or equivalent test scores.</li><li><strong>Copy of Passport:</strong> Valid passport with at least 6 months validity.</li><li><strong>Passport Photos:</strong> Two recent passport-sized photographs.</li><li><strong>Proof of Financial Support:</strong> Bank statements or sponsorship letters showing ability to cover tuition and living expenses.</li><li><strong>Medical Clearance:</strong> Some programs may require medical examination results.</li></ul><h3>Program-Specific Requirements</h3><p>Some programs may have additional requirements:</p><ul><li><strong>PSW Program:</strong> Criminal background check, immunization records.</li><li><strong>Healthcare Programs:</strong> May require specific health screenings.</li></ul>',
        isActive: true,
        order: 3
      },
      faq: {
        sectionId: 'faq',
        title: 'Requirements FAQ',
        items: [
          { question: 'What if my transcripts are not in English?', answer: 'All non-English documents must be translated by a certified translator and authenticated by the issuing institution or a recognized authority.' },
          { question: 'Can I transfer credits from my home country?', answer: 'Credit transfers are evaluated on a case-by-case basis. Submit your transcripts for evaluation during the application process.' },
          { question: 'Is a medical examination required?', answer: 'A medical examination may be required for your study permit application and certain healthcare programs. Check with your local Canadian visa office for specific requirements.' }
        ],
        isActive: true,
        order: 4
      },
      bannerCTA: {
        sectionId: 'bannerCTA',
        title: 'Questions About Requirements?',
        description: 'Our admissions team can help verify your eligibility.',
        buttons: [
          { text: 'Contact Admissions', link: '/international-students/student-advisor', style: 'primary' }
        ],
        isActive: true,
        order: 5
      }
    }
  },
  {
    pageId: 'is-tuition-fees',
    title: 'Tuition, Fees & Refund Policy',
    slug: 'tuition-fees',
    parentCategory: 'international-students',
    order: 4,
    seo: {
      metaTitle: 'Tuition & Fees | International Students | Care-Ed Learning Center',
      metaDescription: 'Information about tuition fees, payment options, and refund policies for international students at Care-Ed Learning Center.',
      ogImage: null,
      canonicalUrl: '/international-students/tuition-fees'
    },
    sections: {
      hero: {
        sectionId: 'hero',
        title: 'Tuition, Fees & Refund Policy',
        subtitle: 'Understanding Your Investment',
        description: 'Learn about tuition costs, additional fees, payment options, and our refund policy for international students.',
        images: [],
        buttons: [],
        isActive: true,
        order: 1
      },
      policyTable: {
        sectionId: 'policyTable',
        title: 'Program Tuition Fees',
        headers: ['Program', 'Duration', 'Tuition (CAD)', 'Additional Fees'],
        rows: [
          ['Personal Support Worker (PSW)', '6-8 months', 'Contact for pricing', 'Books, uniforms, certifications'],
          ['First Aid & CPR', '1-2 days', 'Contact for pricing', 'Certification fee'],
          ['Foot Care Management', '4-6 weeks', 'Contact for pricing', 'Equipment, certification'],
          ['Specialized Workshops', 'Varies', 'Contact for pricing', 'Materials fee']
        ],
        description: 'Tuition fees are subject to change. Contact our admissions office for the most current pricing and available payment plans.',
        isActive: true,
        order: 2
      },
      richText: {
        sectionId: 'richText',
        title: 'Additional Costs',
        content: '<h3>Additional Costs to Consider</h3><p>Beyond tuition, international students should budget for:</p><ul><li><strong>Application Fee:</strong> Non-refundable fee due at application.</li><li><strong>Books & Materials:</strong> Textbooks, workbooks, and learning materials.</li><li><strong>Uniforms & Equipment:</strong> Required for clinical placements.</li><li><strong>Health Insurance:</strong> Mandatory health coverage during your studies.</li><li><strong>Living Expenses:</strong> Accommodation, food, transportation, and personal expenses.</li><li><strong>Visa & Study Permit Fees:</strong> Government fees for immigration documents.</li></ul><h3>Payment Options</h3><p>We offer flexible payment options for international students:</p><ul><li>Full payment before program start</li><li>Payment plans (available for eligible programs)</li><li>Wire transfer, credit card, or certified cheque</li></ul>',
        isActive: true,
        order: 3
      },
      policyTable_2: {
        sectionId: 'policyTable_2',
        title: 'Refund Policy',
        headers: ['Timeline', 'Refund Amount'],
        rows: [
          ['More than 30 days before start', 'Full refund minus application fee'],
          ['15-30 days before start', '75% of tuition'],
          ['7-14 days before start', '50% of tuition'],
          ['Less than 7 days before start', 'No refund'],
          ['After program begins', 'No refund']
        ],
        description: 'Refunds for visa denials are handled on a case-by-case basis with documentation from IRCC.',
        isActive: true,
        order: 4
      },
      contactCard: {
        sectionId: 'contactCard',
        title: 'Payment Questions?',
        contactName: 'Finance Office',
        email: 'finance@carelearning.ca',
        phone: '+1 (506) 634-8906',
        hours: [
          { day: 'Monday - Friday', time: '9:00 AM - 4:00 PM (AST)' }
        ],
        isActive: true,
        order: 5
      }
    }
  },
  {
    pageId: 'is-language-requirements',
    title: 'Language Requirements',
    slug: 'language-requirements',
    parentCategory: 'international-students',
    order: 5,
    seo: {
      metaTitle: 'Language Requirements | International Students | Care-Ed Learning Center',
      metaDescription: 'English language proficiency requirements for international students at Care-Ed Learning Center.',
      ogImage: null,
      canonicalUrl: '/international-students/language-requirements'
    },
    sections: {
      hero: {
        sectionId: 'hero',
        title: 'Language Requirements',
        subtitle: 'English Proficiency Standards',
        description: 'All international students must demonstrate English language proficiency to ensure success in our healthcare training programs.',
        images: [],
        buttons: [],
        isActive: true,
        order: 1
      },
      policyTable: {
        sectionId: 'policyTable',
        title: 'Accepted English Tests',
        headers: ['Test', 'Minimum Score', 'Valid For'],
        rows: [
          ['IELTS Academic', '6.0 overall (no band below 5.5)', '2 years'],
          ['TOEFL iBT', '70 overall', '2 years'],
          ['Duolingo English Test', '100', '2 years'],
          ['PTE Academic', '50', '2 years'],
          ['Cambridge English', 'B2 First (FCE)', 'No expiry']
        ],
        description: 'Test scores must be from within the last 2 years unless otherwise noted.',
        isActive: true,
        order: 2
      },
      richText: {
        sectionId: 'richText',
        title: 'Exemptions & Alternatives',
        content: '<h3>Who May Be Exempt</h3><p>You may be exempt from English proficiency testing if:</p><ul><li>You have completed secondary or post-secondary education in an English-speaking country.</li><li>Your previous education was conducted entirely in English (official documentation required).</li><li>You are from a country where English is an official language.</li></ul><h3>English Language Support</h3><p>Students who do not meet the required proficiency level may:</p><ul><li>Enroll in an approved English language program before starting their healthcare training.</li><li>Retake the proficiency test after additional preparation.</li><li>Request an internal English assessment (available for some programs).</li></ul>',
        isActive: true,
        order: 3
      },
      faq: {
        sectionId: 'faq',
        title: 'Language Requirements FAQ',
        items: [
          { question: 'Can I apply before taking my English test?', answer: 'Yes, you can submit your application with pending test results. However, you must provide passing scores before enrollment.' },
          { question: 'What if my score is below the minimum?', answer: 'You may retake the test or explore our English language support options. Contact admissions for guidance.' },
          { question: 'Is there an internal English test available?', answer: 'Some programs offer internal assessments. Contact our admissions office to discuss your options.' }
        ],
        isActive: true,
        order: 4
      },
      bannerCTA: {
        sectionId: 'bannerCTA',
        title: 'Questions About Language Requirements?',
        description: 'Our team can help you understand your options.',
        buttons: [
          { text: 'Contact Us', link: '/international-students/student-advisor', style: 'primary' }
        ],
        isActive: true,
        order: 5
      }
    }
  },
  {
    pageId: 'is-housing-support',
    title: 'Housing Support',
    slug: 'housing-support',
    parentCategory: 'international-students',
    order: 6,
    seo: {
      metaTitle: 'Housing Support | International Students | Care-Ed Learning Center',
      metaDescription: 'Housing and accommodation support services for international students studying at Care-Ed Learning Center.',
      ogImage: null,
      canonicalUrl: '/international-students/housing-support'
    },
    sections: {
      hero: {
        sectionId: 'hero',
        title: 'Housing Support',
        subtitle: 'Finding Your Home Away From Home',
        description: 'Finding suitable accommodation is an important part of your study abroad experience. We are here to help you find safe, affordable housing options.',
        images: [],
        buttons: [],
        isActive: true,
        order: 1
      },
      cardsGrid: {
        sectionId: 'cardsGrid',
        title: 'Accommodation Options',
        subtitle: 'Various housing options for international students',
        items: [
          { icon: 'Home', title: 'Homestay', description: 'Live with a local Canadian family. Includes meals and a supportive environment for cultural immersion.' },
          { icon: 'Building', title: 'Apartment Rental', description: 'Rent your own apartment or share with roommates. More independence and privacy.' },
          { icon: 'Bed', title: 'Room Rental', description: 'Rent a room in a shared house. Affordable option with shared common areas.' },
          { icon: 'Hotel', title: 'Temporary Accommodation', description: 'Short-term options for when you first arrive, including hostels and extended-stay hotels.' }
        ],
        columns: 2,
        isActive: true,
        order: 2
      },
      richText: {
        sectionId: 'richText',
        title: 'Housing Resources',
        content: '<h3>Finding Accommodation</h3><p>We recommend starting your housing search early. Here are some resources:</p><ul><li><strong>Saint John Housing Resources:</strong> Local rental listings and housing services.</li><li><strong>Online Platforms:</strong> Kijiji, Rentals.ca, and Facebook Marketplace.</li><li><strong>Homestay Programs:</strong> Arranged through approved homestay agencies.</li><li><strong>Student Housing Boards:</strong> Connect with other students looking for roommates.</li></ul><h3>What to Budget</h3><p>Typical monthly housing costs in Saint John, New Brunswick:</p><ul><li><strong>Homestay:</strong> $800-$1,100/month (often includes meals)</li><li><strong>Shared Apartment:</strong> $500-$800/month per person</li><li><strong>Private Apartment:</strong> $900-$1,400/month</li><li><strong>Room in House:</strong> $450-$700/month</li></ul><h3>Important Tips</h3><ul><li>Always view accommodation before signing a lease or sending money.</li><li>Be aware of rental scams. Never send money without verifying the listing.</li><li>Understand your lease terms, including deposit requirements and notice periods.</li></ul>',
        isActive: true,
        order: 3
      },
      linkResources: {
        sectionId: 'linkResources',
        title: 'Useful Housing Links',
        items: [
          { title: 'Kijiji Saint John Rentals', description: 'Local rental listings', url: 'https://www.kijiji.ca/h-saint-john/new-brunswick/c210l9004', category: 'External' },
          { title: 'Rentals.ca', description: 'National rental platform', url: 'https://www.rentals.ca', category: 'External' },
          { title: 'New Brunswick Rental Guide', description: 'Tenant rights and resources', url: 'https://www2.gnb.ca/content/gnb/en/services/services_renderer.201233.Rental_Housing.html', category: 'External' }
        ],
        isActive: true,
        order: 4
      },
      contactCard: {
        sectionId: 'contactCard',
        title: 'Need Housing Assistance?',
        contactName: 'Student Services',
        email: 'housing@carelearning.ca',
        phone: '+1 (506) 634-8906',
        hours: [
          { day: 'Monday - Friday', time: '9:00 AM - 5:00 PM (AST)' }
        ],
        isActive: true,
        order: 5
      }
    }
  },
  {
    pageId: 'is-health-support',
    title: 'Health Support',
    slug: 'health-support',
    parentCategory: 'international-students',
    order: 7,
    seo: {
      metaTitle: 'Health Support | International Students | Care-Ed Learning Center',
      metaDescription: 'Healthcare services, insurance information, and medical support for international students.',
      ogImage: null,
      canonicalUrl: '/international-students/health-support'
    },
    sections: {
      hero: {
        sectionId: 'hero',
        title: 'Health Support',
        subtitle: 'Your Health Matters',
        description: 'Access healthcare services and understand your health insurance options while studying in Canada.',
        images: [],
        buttons: [],
        isActive: true,
        order: 1
      },
      richText: {
        sectionId: 'richText',
        title: 'Health Insurance for International Students',
        content: '<h3>Mandatory Health Coverage</h3><p>All international students must have valid health insurance while studying in Canada. There are two main options:</p><h4>New Brunswick Medicare</h4><p>International students may be eligible for New Brunswick Medicare (provincial health insurance) if they meet certain criteria:</p><ul><li>Must have a valid study permit</li><li>Must be residing in New Brunswick</li><li>Application process takes 4-6 weeks</li></ul><h4>Private Health Insurance</h4><p>If not eligible for provincial coverage, or while waiting for approval, private health insurance is required. We can recommend approved providers that offer comprehensive coverage for international students.</p><h3>What Health Insurance Covers</h3><ul><li>Doctor visits and hospital services</li><li>Emergency care</li><li>Laboratory tests and X-rays</li><li>Some prescription medications</li></ul><p>Note: Dental and vision care may require additional coverage.</p>',
        isActive: true,
        order: 2
      },
      supportCards: {
        sectionId: 'supportCards',
        title: 'Health Services',
        subtitle: 'Medical resources in Saint John',
        items: [
          { icon: 'Hospital', title: 'Emergency Services', description: 'Saint John Regional Hospital - Emergency Department. For life-threatening emergencies, call 911.', contactInfo: '(506) 648-6000' },
          { icon: 'Stethoscope', title: 'Walk-in Clinics', description: 'Non-emergency medical care without appointment. Available evenings and weekends.', contactInfo: 'Various locations' },
          { icon: 'Pill', title: 'Pharmacies', description: 'Prescription and over-the-counter medications. Many offer flu shots and basic health services.', contactInfo: 'Shoppers Drug Mart, Pharmasave' },
          { icon: 'Phone', title: 'Telehealth', description: '811 - Free health advice from registered nurses 24/7 in multiple languages.', contactInfo: 'Call 811' }
        ],
        isActive: true,
        order: 3
      },
      faq: {
        sectionId: 'faq',
        title: 'Health Support FAQ',
        items: [
          { question: 'How do I apply for New Brunswick Medicare?', answer: 'Visit Service New Brunswick with your study permit, passport, and proof of address. We can help you with the application process.' },
          { question: 'What if I have a medical emergency?', answer: 'For life-threatening emergencies, call 911. For urgent but non-life-threatening issues, visit the Emergency Department or a walk-in clinic.' },
          { question: 'Can I see a doctor before my insurance is activated?', answer: 'Yes, but you will need to pay out-of-pocket or use private travel insurance. Keep receipts for potential reimbursement.' }
        ],
        isActive: true,
        order: 4
      },
      contactCard: {
        sectionId: 'contactCard',
        title: 'Health Insurance Questions?',
        contactName: 'Student Services',
        email: 'studentservices@carelearning.ca',
        phone: '+1 (506) 634-8906',
        hours: [
          { day: 'Monday - Friday', time: '9:00 AM - 5:00 PM (AST)' }
        ],
        isActive: true,
        order: 5
      }
    }
  },
  {
    pageId: 'is-mental-health',
    title: 'Mental Health & Crisis Support',
    slug: 'mental-health',
    parentCategory: 'international-students',
    order: 8,
    seo: {
      metaTitle: 'Mental Health Support | International Students | Care-Ed Learning Center',
      metaDescription: 'Mental health and crisis support services for international students at Care-Ed Learning Center.',
      ogImage: null,
      canonicalUrl: '/international-students/mental-health'
    },
    sections: {
      hero: {
        sectionId: 'hero',
        title: 'Mental Health & Crisis Support',
        subtitle: 'You Are Not Alone',
        description: 'Studying abroad can be challenging. We are committed to supporting your mental health and well-being. Help is available whenever you need it.',
        images: [],
        buttons: [
          { text: 'Crisis Helpline', link: 'tel:988', style: 'primary' }
        ],
        isActive: true,
        order: 1
      },
      supportCards: {
        sectionId: 'supportCards',
        title: 'Crisis Resources',
        subtitle: '24/7 Support When You Need It Most',
        items: [
          { icon: 'Phone', title: '988 Suicide & Crisis Lifeline', description: 'Free, confidential support for people in distress, available 24/7 in English and French.', contactInfo: 'Call or text 988' },
          { icon: 'MessageCircle', title: 'Crisis Text Line', description: 'Text-based support for any crisis. Trained crisis counselors available 24/7.', contactInfo: 'Text HOME to 686868' },
          { icon: 'Heart', title: 'Good2Talk', description: 'Free, confidential support for post-secondary students in Nova Scotia and New Brunswick.', contactInfo: '1-833-292-3698' },
          { icon: 'Globe', title: 'Wellness Together Canada', description: 'Free online resources and professional counselling for mental health and substance use.', contactInfo: 'wellnesstogether.ca' }
        ],
        isActive: true,
        order: 2
      },
      richText: {
        sectionId: 'richText',
        title: 'Counselling Services',
        content: '<h3>School Support</h3><p>Care-Ed Learning Center provides access to counselling services for students experiencing stress, anxiety, homesickness, or other challenges. Our services are confidential and free for enrolled students.</p><h3>Common Challenges</h3><p>International students often experience:</p><ul><li><strong>Culture Shock:</strong> Adjusting to a new country and culture takes time.</li><li><strong>Homesickness:</strong> Missing family and familiar surroundings is normal.</li><li><strong>Academic Stress:</strong> Different teaching styles and expectations.</li><li><strong>Social Isolation:</strong> Building new friendships and support networks.</li><li><strong>Language Barriers:</strong> Communicating in a second language daily.</li></ul><h3>Self-Care Tips</h3><ul><li>Maintain regular sleep and meal schedules</li><li>Stay connected with family and friends back home</li><li>Join student groups and activities</li><li>Exercise regularly and spend time outdoors</li><li>Seek help early when feeling overwhelmed</li></ul>',
        isActive: true,
        order: 3
      },
      linkResources: {
        sectionId: 'linkResources',
        title: 'Additional Mental Health Resources',
        items: [
          { title: 'Wellness Together Canada', description: 'Free mental health resources and counselling.', url: 'https://wellnesstogether.ca', category: 'Online' },
          { title: 'Here 24/7 (New Brunswick)', description: 'Addiction, mental health, and crisis services.', url: 'https://here247.ca', category: 'Local' },
          { title: 'Canadian Mental Health Association', description: 'Information and support resources.', url: 'https://cmha.ca', category: 'National' }
        ],
        isActive: true,
        order: 4
      },
      bannerCTA: {
        sectionId: 'bannerCTA',
        title: 'Remember: Its Okay to Ask for Help',
        description: 'If you are struggling, please reach out. Our support team is here for you.',
        buttons: [
          { text: 'Contact Student Services', link: '/international-students/student-advisor', style: 'primary' }
        ],
        isActive: true,
        order: 5
      }
    }
  },
  {
    pageId: 'is-social-support',
    title: 'Social & Community Support',
    slug: 'social-support',
    parentCategory: 'international-students',
    order: 9,
    seo: {
      metaTitle: 'Social & Community Support | International Students | Care-Ed Learning Center',
      metaDescription: 'Social and community support resources for international students in Saint John, New Brunswick.',
      ogImage: null,
      canonicalUrl: '/international-students/social-support'
    },
    sections: {
      hero: {
        sectionId: 'hero',
        title: 'Social & Community Support',
        subtitle: 'Build Your Community',
        description: 'Connect with other students, explore local communities, and make the most of your time in Canada. Building a support network is key to your success and happiness.',
        images: [],
        buttons: [],
        isActive: true,
        order: 1
      },
      cardsGrid: {
        sectionId: 'cardsGrid',
        title: 'Ways to Connect',
        subtitle: 'Find your community and make friends',
        items: [
          { icon: 'Users', title: 'Student Groups', description: 'Join student groups and activities at Care-Ed. Meet peers with similar interests.' },
          { icon: 'Globe', title: 'Cultural Communities', description: 'Connect with cultural associations and communities in Saint John representing various backgrounds.' },
          { icon: 'Calendar', title: 'Events & Activities', description: 'Participate in local events, festivals, and community gatherings throughout the year.' },
          { icon: 'Heart', title: 'Volunteer Opportunities', description: 'Give back to the community while gaining Canadian experience and meeting new people.' }
        ],
        columns: 2,
        isActive: true,
        order: 2
      },
      richText: {
        sectionId: 'richText',
        title: 'Community Resources',
        content: '<h3>Saint John Multicultural Community</h3><p>Saint John is a welcoming, multicultural city with a growing international community. Resources include:</p><ul><li><strong>Saint John Newcomers Centre:</strong> Settlement services, language classes, and community programs.</li><li><strong>PRUDE Inc.:</strong> Programs for racial unity and diversity education.</li><li><strong>Local Places of Worship:</strong> Various religious communities welcome international students.</li><li><strong>Recreation Centers:</strong> Sports, fitness classes, and community activities.</li></ul><h3>Getting Involved</h3><p>Ways to build your social network:</p><ul><li>Attend orientation events and student meetups</li><li>Join sports teams or fitness groups</li><li>Participate in cultural festivals</li><li>Volunteer with local organizations</li><li>Explore outdoor activities like hiking and beaches</li></ul>',
        isActive: true,
        order: 3
      },
      linkResources: {
        sectionId: 'linkResources',
        title: 'Community Links',
        items: [
          { title: 'Saint John Newcomers Centre', description: 'Settlement and community services.', url: 'https://sjnewcomers.ca', category: 'Local' },
          { title: 'Discover Saint John', description: 'Local events, attractions, and activities.', url: 'https://discoversaintjohn.com', category: 'Local' },
          { title: 'Tourism New Brunswick', description: 'Explore the province.', url: 'https://www.tourismnewbrunswick.ca', category: 'Provincial' },
          { title: 'Volunteer Saint John', description: 'Find volunteer opportunities.', url: 'https://volunteersaintjohn.com', category: 'Local' }
        ],
        isActive: true,
        order: 4
      },
      bannerCTA: {
        sectionId: 'bannerCTA',
        title: 'Ready to Get Involved?',
        description: 'Ask our student services team about current activities and groups.',
        buttons: [
          { text: 'Contact Us', link: '/international-students/student-advisor', style: 'primary' }
        ],
        isActive: true,
        order: 5
      }
    }
  },
  {
    pageId: 'is-academic-support',
    title: 'Academic & Peer Support',
    slug: 'academic-support',
    parentCategory: 'international-students',
    order: 10,
    seo: {
      metaTitle: 'Academic Support | International Students | Care-Ed Learning Center',
      metaDescription: 'Academic and peer support services for international students at Care-Ed Learning Center.',
      ogImage: null,
      canonicalUrl: '/international-students/academic-support'
    },
    sections: {
      hero: {
        sectionId: 'hero',
        title: 'Academic & Peer Support',
        subtitle: 'Success Starts with Support',
        description: 'Access tutoring, study resources, and peer support to excel in your healthcare training program. We are committed to your academic success.',
        images: [],
        buttons: [],
        isActive: true,
        order: 1
      },
      cardsGrid: {
        sectionId: 'cardsGrid',
        title: 'Academic Resources',
        subtitle: 'Tools for your success',
        items: [
          { icon: 'BookOpen', title: 'Study Skills Workshops', description: 'Learn effective study techniques, time management, and exam preparation strategies.' },
          { icon: 'Users', title: 'Tutoring Services', description: 'One-on-one tutoring available for challenging subjects. Free for enrolled students.' },
          { icon: 'MessageSquare', title: 'Study Groups', description: 'Join or form study groups with classmates. Collaborative learning improves understanding.' },
          { icon: 'FileText', title: 'Writing Support', description: 'Get help with assignments, reports, and documentation. Improve your academic writing.' },
          { icon: 'Globe', title: 'Language Support', description: 'ESL resources and conversation practice to improve your English skills.' },
          { icon: 'Laptop', title: 'Learning Resources', description: 'Access online materials, practice tests, and supplementary learning tools.' }
        ],
        columns: 3,
        isActive: true,
        order: 2
      },
      richText: {
        sectionId: 'richText',
        title: 'Tips for Academic Success',
        content: '<h3>Study Strategies</h3><ul><li><strong>Attend All Classes:</strong> Regular attendance is crucial for understanding material and participating in discussions.</li><li><strong>Participate Actively:</strong> Ask questions, join discussions, and engage with instructors.</li><li><strong>Take Notes:</strong> Develop a note-taking system that works for you.</li><li><strong>Review Regularly:</strong> Dont wait until exams to review material.</li><li><strong>Use Office Hours:</strong> Instructors are available to help outside of class time.</li></ul><h3>Managing Your Time</h3><ul><li>Create a weekly schedule that includes class time, study time, and personal time.</li><li>Break large assignments into smaller tasks with deadlines.</li><li>Allow buffer time for unexpected challenges.</li><li>Balance academics with rest, exercise, and social activities.</li></ul><h3>Understanding Canadian Academic Culture</h3><ul><li>Plagiarism is taken seriously. Always cite your sources.</li><li>Class participation is often expected and may be graded.</li><li>Asking questions is encouraged, not seen as a weakness.</li><li>Deadlines are important. Communicate early if you have issues.</li></ul>',
        isActive: true,
        order: 3
      },
      contactCard: {
        sectionId: 'contactCard',
        title: 'Need Academic Help?',
        contactName: 'Academic Support Office',
        email: 'academic@carelearning.ca',
        phone: '+1 (506) 634-8906',
        hours: [
          { day: 'Monday - Friday', time: '9:00 AM - 5:00 PM (AST)' }
        ],
        isActive: true,
        order: 4
      }
    }
  },
  {
    pageId: 'is-immigration',
    title: 'Immigration & Study Permit Resources',
    slug: 'immigration',
    parentCategory: 'international-students',
    order: 11,
    seo: {
      metaTitle: 'Immigration & Study Permit | International Students | Care-Ed Learning Center',
      metaDescription: 'Immigration, visa, and study permit resources for international students at Care-Ed Learning Center.',
      ogImage: null,
      canonicalUrl: '/international-students/immigration'
    },
    sections: {
      hero: {
        sectionId: 'hero',
        title: 'Immigration & Study Permit Resources',
        subtitle: 'Navigate Your Visa Journey',
        description: 'Important information about study permits, visas, and immigration requirements for studying in Canada.',
        images: [],
        buttons: [
          { text: 'IRCC Website', link: 'https://www.canada.ca/en/immigration-refugees-citizenship.html', style: 'secondary' }
        ],
        isActive: true,
        order: 1
      },
      timelineSteps: {
        sectionId: 'timelineSteps',
        title: 'Study Permit Process',
        subtitle: 'Steps to obtain your study permit',
        items: [
          { step: 1, title: 'Receive Letter of Acceptance', description: 'After being accepted to Care-Ed, you will receive an official letter of acceptance required for your study permit application.' },
          { step: 2, title: 'Gather Required Documents', description: 'Collect passport, acceptance letter, proof of funds, photos, and any additional documents required for your country.' },
          { step: 3, title: 'Apply Online', description: 'Submit your application through the IRCC website. Processing times vary by country.' },
          { step: 4, title: 'Biometrics', description: 'If required, visit a Visa Application Centre to provide fingerprints and photos.' },
          { step: 5, title: 'Medical Exam', description: 'Some applicants require a medical exam by an approved panel physician.' },
          { step: 6, title: 'Receive Decision', description: 'If approved, you will receive a letter of introduction and possibly a visa for entry.' },
          { step: 7, title: 'Enter Canada', description: 'Present your documents at the border. An officer will issue your study permit.' }
        ],
        isActive: true,
        order: 2
      },
      richText: {
        sectionId: 'richText',
        title: 'Important Information',
        content: '<h3>Study Permit Requirements</h3><p>To apply for a study permit, you typically need:</p><ul><li>Valid passport</li><li>Letter of acceptance from Care-Ed Learning Center</li><li>Proof of financial support (tuition + living expenses)</li><li>Passport photos</li><li>Medical exam (if required)</li><li>Police clearance certificate (if required)</li></ul><h3>Working While Studying</h3><p>International students may be eligible to work:</p><ul><li><strong>On-campus:</strong> Up to 20 hours per week during studies.</li><li><strong>Off-campus:</strong> If your program meets certain criteria.</li><li><strong>Co-op/Internship:</strong> If required by your program.</li><li><strong>Post-graduation:</strong> May be eligible for a post-graduation work permit.</li></ul><h3>Maintaining Your Status</h3><ul><li>Remain enrolled full-time</li><li>Make progress in your program</li><li>Apply for extensions before expiry</li><li>Follow all conditions on your permit</li></ul>',
        isActive: true,
        order: 3
      },
      linkResources: {
        sectionId: 'linkResources',
        title: 'Official Immigration Resources',
        items: [
          { title: 'IRCC Website', description: 'Official immigration information and applications.', url: 'https://www.canada.ca/en/immigration-refugees-citizenship.html', category: 'Official' },
          { title: 'Study Permit Application', description: 'Apply for your study permit online.', url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/apply.html', category: 'Official' },
          { title: 'Processing Times', description: 'Check current processing times.', url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html', category: 'Official' },
          { title: 'Find a VAC', description: 'Locate a Visa Application Centre.', url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/visa-application-centres.html', category: 'Official' }
        ],
        isActive: true,
        order: 4
      },
      faq: {
        sectionId: 'faq',
        title: 'Immigration FAQ',
        items: [
          { question: 'How long does the study permit process take?', answer: 'Processing times vary by country, typically ranging from 2 weeks to 3 months. Check the IRCC website for current processing times.' },
          { question: 'Can I work while studying?', answer: 'Many international students can work up to 20 hours per week during studies. Check your study permit conditions.' },
          { question: 'What if my permit expires before I graduate?', answer: 'Apply to extend your study permit at least 30 days before expiry. You can continue studying while waiting for a decision.' }
        ],
        isActive: true,
        order: 5
      },
      bannerCTA: {
        sectionId: 'bannerCTA',
        title: 'Need Immigration Advice?',
        description: 'While we cannot provide legal immigration advice, we can help you find resources and understand the process.',
        buttons: [
          { text: 'Contact Student Advisor', link: '/international-students/student-advisor', style: 'primary' }
        ],
        isActive: true,
        order: 6
      }
    }
  },
  {
    pageId: 'is-student-rights',
    title: 'Student Rights & Responsibilities',
    slug: 'student-rights',
    parentCategory: 'international-students',
    order: 12,
    seo: {
      metaTitle: 'Student Rights & Responsibilities | International Students | Care-Ed Learning Center',
      metaDescription: 'Know your rights and responsibilities as an international student at Care-Ed Learning Center.',
      ogImage: null,
      canonicalUrl: '/international-students/student-rights'
    },
    sections: {
      hero: {
        sectionId: 'hero',
        title: 'Student Rights & Responsibilities',
        subtitle: 'Know Your Rights, Understand Your Responsibilities',
        description: 'Understanding your rights and responsibilities helps create a positive learning environment and ensures you make the most of your educational experience.',
        images: [],
        buttons: [],
        isActive: true,
        order: 1
      },
      richText: {
        sectionId: 'richText',
        title: 'Your Rights as a Student',
        content: '<h3>Academic Rights</h3><ul><li><strong>Quality Education:</strong> Receive instruction that meets program standards and learning objectives.</li><li><strong>Fair Assessment:</strong> Be evaluated fairly based on established criteria.</li><li><strong>Appeals Process:</strong> Appeal academic decisions through established procedures.</li><li><strong>Access to Resources:</strong> Access learning materials, facilities, and support services.</li><li><strong>Confidentiality:</strong> Have your personal and academic information kept confidential.</li></ul><h3>Non-Discrimination</h3><p>You have the right to learn in an environment free from discrimination based on:</p><ul><li>Race, ethnicity, or national origin</li><li>Religion or belief system</li><li>Gender or sexual orientation</li><li>Age or disability</li><li>Any other protected ground</li></ul><h3>Privacy Rights</h3><p>Your personal information is protected under Canadian privacy laws. We collect only necessary information and use it only for stated purposes.</p>',
        isActive: true,
        order: 2
      },
      richText_2: {
        sectionId: 'richText_2',
        title: 'Your Responsibilities',
        content: '<h3>Academic Responsibilities</h3><ul><li><strong>Attendance:</strong> Attend classes regularly and punctually.</li><li><strong>Academic Integrity:</strong> Complete your own work and properly cite sources.</li><li><strong>Participation:</strong> Engage actively in learning activities.</li><li><strong>Deadlines:</strong> Submit assignments on time or communicate difficulties early.</li><li><strong>Professional Conduct:</strong> Behave professionally in class and clinical settings.</li></ul><h3>International Student Responsibilities</h3><ul><li><strong>Study Permit Compliance:</strong> Maintain valid immigration status and comply with permit conditions.</li><li><strong>Full-time Enrollment:</strong> Maintain required enrollment status.</li><li><strong>Address Updates:</strong> Update your address with us and IRCC when you move.</li><li><strong>Health Insurance:</strong> Maintain valid health insurance coverage.</li></ul><h3>Respect for Others</h3><ul><li>Treat all students, staff, and instructors with respect.</li><li>Respect diversity and different perspectives.</li><li>Follow facility rules and safety guidelines.</li><li>Report concerns through appropriate channels.</li></ul>',
        isActive: true,
        order: 3
      },
      policyTable: {
        sectionId: 'policyTable',
        title: 'Code of Conduct Summary',
        headers: ['Area', 'Expectation'],
        rows: [
          ['Academic Integrity', 'No cheating, plagiarism, or unauthorized collaboration'],
          ['Attendance', 'Regular attendance; notify instructor of absences'],
          ['Respect', 'Professional behavior toward all members of the community'],
          ['Confidentiality', 'Respect privacy of patient information in clinical settings'],
          ['Safety', 'Follow all safety protocols and guidelines'],
          ['Communication', 'Respond to official communications in a timely manner']
        ],
        isActive: true,
        order: 4
      },
      bannerCTA: {
        sectionId: 'bannerCTA',
        title: 'Questions About Your Rights?',
        description: 'Contact us if you have concerns or need clarification.',
        buttons: [
          { text: 'Contact Student Services', link: '/international-students/student-advisor', style: 'primary' }
        ],
        isActive: true,
        order: 5
      }
    }
  },
  {
    pageId: 'is-student-advisor',
    title: 'Student Advisor / International Student Contact',
    slug: 'student-advisor',
    parentCategory: 'international-students',
    order: 13,
    seo: {
      metaTitle: 'Student Advisor | International Students | Care-Ed Learning Center',
      metaDescription: 'Contact your dedicated international student advisor at Care-Ed Learning Center for personalized support.',
      ogImage: null,
      canonicalUrl: '/international-students/student-advisor'
    },
    sections: {
      hero: {
        sectionId: 'hero',
        title: 'Student Advisor',
        subtitle: 'Your Dedicated Support Contact',
        description: 'Your International Student Advisor is here to help you navigate your educational journey. From application to graduation, we are available to answer questions and provide support.',
        images: [],
        buttons: [],
        isActive: true,
        order: 1
      },
      contactCard: {
        sectionId: 'contactCard',
        title: 'International Student Advisor',
        contactName: 'International Student Services',
        email: 'international@carelearning.ca',
        phone: '+1 (506) 634-8906',
        tollFree: '1-800-561-2463',
        address: '100 Prince Edward St Unit #111, Saint John, NB E2L 4M5, Canada',
        hours: [
          { day: 'Monday - Friday', time: '9:00 AM - 5:00 PM (AST)' }
        ],
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2772.123456789!2d-66.05!3d45.27!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCare-Ed+Learning+Center!5e0!3m2!1sen!2sca!4v1234567890',
        isActive: true,
        order: 2
      },
      richText: {
        sectionId: 'richText',
        title: 'How We Can Help',
        content: '<h3>Services Provided</h3><p>Your International Student Advisor can assist with:</p><ul><li><strong>Application Support:</strong> Guidance through the application process and document requirements.</li><li><strong>Orientation:</strong> Information about life in Canada, Saint John, and school policies.</li><li><strong>Immigration Guidance:</strong> General information about study permits and visa processes (not legal advice).</li><li><strong>Academic Support:</strong> Connecting you with tutoring, study resources, and academic assistance.</li><li><strong>Personal Support:</strong> Someone to talk to about challenges, homesickness, or personal concerns.</li><li><strong>Community Connections:</strong> Introductions to student groups and community resources.</li><li><strong>Housing Assistance:</strong> Information about accommodation options and tenant rights.</li><li><strong>Health Insurance:</strong> Help understanding and accessing health coverage.</li></ul><h3>When to Contact Us</h3><ul><li>Before you arrive - we can answer pre-departure questions</li><li>During your studies - for any questions or concerns</li><li>In emergencies - we can help connect you with resources</li><li>Before graduation - for career and next steps guidance</li></ul>',
        isActive: true,
        order: 3
      },
      bannerCTA: {
        sectionId: 'bannerCTA',
        title: 'Reach Out Anytime',
        description: 'We are here to support your success. No question is too small.',
        buttons: [
          { text: 'Email Us', link: 'mailto:international@carelearning.ca', style: 'primary' },
          { text: 'Call Us', link: 'tel:+15066348906', style: 'secondary' }
        ],
        isActive: true,
        order: 4
      }
    }
  },
  {
    pageId: 'is-important-links',
    title: 'Important Links',
    slug: 'important-links',
    parentCategory: 'international-students',
    order: 14,
    seo: {
      metaTitle: 'Important Links | International Students | Care-Ed Learning Center',
      metaDescription: 'Useful links and resources for international students at Care-Ed Learning Center.',
      ogImage: null,
      canonicalUrl: '/international-students/important-links'
    },
    sections: {
      hero: {
        sectionId: 'hero',
        title: 'Important Links',
        subtitle: 'Useful Resources at Your Fingertips',
        description: 'Quick access to essential resources for international students. Find government services, local resources, and helpful information.',
        images: [],
        buttons: [],
        isActive: true,
        order: 1
      },
      linkResources: {
        sectionId: 'linkResources',
        title: 'Government Services',
        items: [
          { title: 'IRCC (Immigration)', description: 'Immigration, Refugees and Citizenship Canada', url: 'https://www.canada.ca/en/immigration-refugees-citizenship.html', category: 'Government' },
          { title: 'Service Canada', description: 'Government services and benefits', url: 'https://www.servicecanada.gc.ca', category: 'Government' },
          { title: 'Service New Brunswick', description: 'Provincial services including Medicare', url: 'https://www2.gnb.ca/content/gnb/en/services.html', category: 'Government' },
          { title: 'Canada Revenue Agency', description: 'Tax information and services', url: 'https://www.canada.ca/en/revenue-agency.html', category: 'Government' }
        ],
        isActive: true,
        order: 2
      },
      linkResources_2: {
        sectionId: 'linkResources_2',
        title: 'Local Resources',
        items: [
          { title: 'Saint John Transit', description: 'City bus schedules and routes', url: 'https://www.saintjohntransit.ca', category: 'Local' },
          { title: 'City of Saint John', description: 'Municipal services and information', url: 'https://www.saintjohn.ca', category: 'Local' },
          { title: 'Saint John Public Library', description: 'Library services and resources', url: 'https://sjp.lib.nb.ca', category: 'Local' },
          { title: 'Saint John Airport', description: 'Flight information for YYJ', url: 'https://www.saintjohnairport.com', category: 'Local' }
        ],
        isActive: true,
        order: 3
      },
      linkResources_3: {
        sectionId: 'linkResources_3',
        title: 'Health & Emergency',
        items: [
          { title: '988 Crisis Line', description: 'Mental health crisis support', url: 'tel:988', category: 'Emergency' },
          { title: '811 Telehealth', description: 'Health advice from nurses', url: 'tel:811', category: 'Health' },
          { title: 'Saint John Regional Hospital', description: 'Emergency and hospital services', url: 'https://www.horizonnb.ca', category: 'Health' },
          { title: 'Emergency Services', description: 'Police, Fire, Ambulance - Call 911', url: 'tel:911', category: 'Emergency' }
        ],
        isActive: true,
        order: 4
      },
      linkResources_4: {
        sectionId: 'linkResources_4',
        title: 'Community & Support',
        items: [
          { title: 'Saint John Newcomers Centre', description: 'Settlement and integration services', url: 'https://sjnewcomers.ca', category: 'Community' },
          { title: 'PRUDE Inc.', description: 'Diversity and inclusion programs', url: 'https://prudeinc.org', category: 'Community' },
          { title: 'YMCA of Greater Saint John', description: 'Fitness, programs, and community', url: 'https://saintjohn.ymca.ca', category: 'Community' },
          { title: 'Volunteer Saint John', description: 'Find volunteer opportunities', url: 'https://volunteersaintjohn.com', category: 'Community' }
        ],
        isActive: true,
        order: 5
      },
      bannerCTA: {
        sectionId: 'bannerCTA',
        title: 'Cant Find What You Need?',
        description: 'Contact us and well help you find the right resource.',
        buttons: [
          { text: 'Contact Student Advisor', link: '/international-students/student-advisor', style: 'primary' }
        ],
        isActive: true,
        order: 6
      }
    }
  },
  {
    pageId: 'is-faq',
    title: 'Frequently Asked Questions',
    slug: 'faq',
    parentCategory: 'international-students',
    order: 15,
    seo: {
      metaTitle: 'FAQ | International Students | Care-Ed Learning Center',
      metaDescription: 'Frequently asked questions from international students about studying at Care-Ed Learning Center.',
      ogImage: null,
      canonicalUrl: '/international-students/faq'
    },
    sections: {
      hero: {
        sectionId: 'hero',
        title: 'Frequently Asked Questions',
        subtitle: 'Answers to Common Questions',
        description: 'Find answers to the most commonly asked questions from international students. Cant find what you are looking for? Contact us!',
        images: [],
        buttons: [],
        isActive: true,
        order: 1
      },
      faq: {
        sectionId: 'faq',
        title: 'General Questions',
        items: [
          { question: 'How do I apply to Care-Ed Learning Center?', answer: 'Complete our online application form and submit required documents including transcripts, English proficiency test results, and a copy of your passport. Visit our How to Apply page for detailed instructions.' },
          { question: 'What programs are available for international students?', answer: 'We offer PSW, First Aid & CPR, Foot Care Management, and various workshops. All programs are open to international students who meet admission requirements.' },
          { question: 'How long does it take to complete the PSW program?', answer: 'The PSW program typically takes 6-8 months to complete, including classroom instruction and clinical placements.' },
          { question: 'Do I need health insurance?', answer: 'Yes, all international students must have valid health insurance. You may be eligible for New Brunswick Medicare or can purchase private insurance.' }
        ],
        isActive: true,
        order: 2
      },
      faq_2: {
        sectionId: 'faq_2',
        title: 'Visa & Immigration',
        items: [
          { question: 'How do I get a study permit?', answer: 'After receiving your letter of acceptance, apply online through the IRCC website. Processing times vary by country. Visit our Immigration page for detailed steps.' },
          { question: 'Can I work while studying?', answer: 'Most international students can work up to 20 hours per week during studies and full-time during scheduled breaks. Check your study permit conditions for specific permissions.' },
          { question: 'What happens if my visa is denied?', answer: 'If your visa is denied, contact us immediately. We can provide a refund letter for tuition paid (subject to our refund policy) and may be able to help address concerns for a re-application.' },
          { question: 'Can I stay in Canada after graduation?', answer: 'You may be eligible for a Post-Graduation Work Permit (PGWP) allowing you to work in Canada after completing your program. Check IRCC for current eligibility requirements.' }
        ],
        isActive: true,
        order: 3
      },
      faq_3: {
        sectionId: 'faq_3',
        title: 'Life in Canada',
        items: [
          { question: 'What is the weather like in Saint John?', answer: 'Saint John has four distinct seasons. Winters (December-March) can be cold (-10C to -20C) with snow. Summers (June-August) are warm (20C-30C). Dress in layers and invest in a good winter coat.' },
          { question: 'How much does it cost to live in Saint John?', answer: 'Saint John is more affordable than larger Canadian cities. Budget approximately $1,500-$2,500 CAD per month for living expenses including rent, food, transportation, and personal costs.' },
          { question: 'Is public transportation available?', answer: 'Yes, Saint John Transit operates bus routes throughout the city. Monthly passes are available at discounted rates for students.' },
          { question: 'Can I open a Canadian bank account?', answer: 'Yes, international students can open bank accounts. Visit a bank with your passport, study permit, and proof of address. Major banks offer student accounts with no monthly fees.' }
        ],
        isActive: true,
        order: 4
      },
      faq_4: {
        sectionId: 'faq_4',
        title: 'Academic Questions',
        items: [
          { question: 'Are classes available online?', answer: 'Some theoretical components may be available online, but healthcare programs require in-person clinical training. Contact admissions for specific program formats.' },
          { question: 'What if I am struggling with my classes?', answer: 'We offer tutoring services, study groups, and academic support. Speak with your instructor or contact our academic support office early if you are having difficulties.' },
          { question: 'Can I transfer credits from my home country?', answer: 'Credit transfers are evaluated case-by-case. Submit your official transcripts and course descriptions for evaluation during the application process.' },
          { question: 'What certification will I receive?', answer: 'Upon successful completion, you will receive a certificate or credential specific to your program. PSW graduates are eligible for provincial certification.' }
        ],
        isActive: true,
        order: 5
      },
      bannerCTA: {
        sectionId: 'bannerCTA',
        title: 'Still Have Questions?',
        description: 'Our student advisor is happy to help with any questions not answered here.',
        buttons: [
          { text: 'Contact Us', link: '/international-students/student-advisor', style: 'primary' }
        ],
        isActive: true,
        order: 6
      }
    }
  }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

// Get International Students landing page data
export const getInternationalStudentsLandingData = () => {
  return internationalStudentsLandingData;
};

// Get child page data by slug
export const getInternationalStudentPageData = (slug) => {
  return internationalStudentsChildPages.find(page => page.slug === slug) || null;
};

// Get all child pages (for navigation)
export const getAllInternationalStudentPages = () => {
  return internationalStudentsChildPages.map(page => ({
    pageId: page.pageId,
    title: page.title,
    slug: page.slug,
    order: page.order
  }));
};

// Get page data by pageId
export const getInternationalStudentPageById = (pageId) => {
  if (pageId === 'international-students') {
    return internationalStudentsLandingData;
  }
  return internationalStudentsChildPages.find(page => page.pageId === pageId) || null;
};

export default {
  internationalStudentsLandingData,
  internationalStudentsChildPages,
  getInternationalStudentsLandingData,
  getInternationalStudentPageData,
  getAllInternationalStudentPages,
  getInternationalStudentPageById
};