import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Loader2 } from "lucide-react";
import contact from "../assets/images/contact.jpeg";
import AnimatedSection from "../components/AnimatedSection";
import useContactData, { iconMap } from "../hooks/useContactData";
import { contactAPI } from "../services/api";

// Helper to get icon component
const getIcon = (iconName) => iconMap[iconName] || MapPin;

// Static fallback data
const staticContactInfo = [
  {
    icon: MapPin,
    title: "Address",
    content: "100 Prince Edward St Unit #111\nSaint John, NB E2L 4M5",
    link: "https://maps.google.com/?q=100+Prince+Edward+St+Saint+John+NB",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "(506) 634-8906",
    link: "tel:+15066348906",
  },
  {
    icon: Phone,
    title: "Toll-Free",
    content: "1(800) 561-2463",
    link: "tel:+18005612463",
  },
  {
    icon: Mail,
    title: "Email",
    content: "train@seniorwatch.com",
    link: "mailto:train@seniorwatch.com",
  },
];

const staticServiceAreas = [
  "Saint John",
  "Quispamsis",
  "Rothesay",
  "Grand Bay-Westfield",
];

function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const {
    heroSection,
    infoSection,
    hoursSection,
    areasSection,
    quickContactSection,
    ctaSection,
    loading,
    fromApi
  } = useContactData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      console.log("Submitting contact form:", formData);

      const response = await contactAPI.submit({
        name: formData.firstName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });

      console.log("Contact form response:", response);

      if (response.success) {
        setSubmitted(true);
        setFormData({
          firstName: "",
          phone: "",
          email: "",
          message: "",
        });
      } else {
        setError(response.message || "Failed to submit form. Please try again.");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setError(err.message || "Failed to submit form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Map info section items to contact info format
  const contactInfo = infoSection?.items?.map((item, index) => ({
    icon: getIcon(item.icon),
    title: item.label || staticContactInfo[index]?.title || '',
    content: item.value || staticContactInfo[index]?.content || '',
    link: item.link || staticContactInfo[index]?.link || '#',
  })) || staticContactInfo;

  // Map areas section items to service areas format
  const serviceAreas = areasSection?.items?.map(item =>
    typeof item === 'string' ? item : item.name
  ) || staticServiceAreas;

  // Map quick contact items
  const quickContactItems = quickContactSection?.items?.map((item, index) => ({
    icon: getIcon(item.icon),
    title: item.title || '',
    subtitle: item.subtitle || '',
    value: item.value || '',
    link: item.link || '#',
  })) || [];

  // Static fallback for quick contact
  const staticQuickContactItems = [
    { icon: Phone, title: 'Call Us', subtitle: 'For immediate assistance', value: '(506) 634-8906', link: 'tel:+15066348906' },
    { icon: Mail, title: 'Email Us', subtitle: 'For general inquiries', value: 'train@seniorwatch.com', link: 'mailto:train@seniorwatch.com' },
    { icon: MapPin, title: 'Visit Us', subtitle: 'At our office location', value: 'Get Directions', link: 'https://maps.google.com/?q=100+Prince+Edward+St+Saint+John+NB' }
  ];
  const displayQuickContactItems = quickContactItems.length > 0 ? quickContactItems : staticQuickContactItems;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary-dark text-white overflow-hidden lg:min-h-[50vh] py-10 lg:py-24">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: heroSection?.images?.[0]?.url ? `url(${heroSection.images[0].url})` : `url(${contact})` }}
        ></div>
        <div className="container-custom relative py-20 lg:py-32">
          <div className="max-w-3xl">
            <AnimatedSection animation="fade-up">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                {heroSection?.title || "Contact Us"}
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={150}>
              <p className="text-xl text-gray-200 leading-relaxed">
                {heroSection?.description || "We're here to help. Reach out to us for any questions about our training programs, enrollment, or career opportunities."}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <AnimatedSection animation="fade-up" stagger>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  target={info.link.startsWith("http") ? "_blank" : undefined}
                  rel={
                    info.link.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow text-center group border border-gray-100"
                >
                  <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary transition-colors">
                    <info.icon
                      size={24}
                      className="text-secondary group-hover:text-white transition-colors"
                    />
                  </div>
                  <h3 className="font-semibold text-primary mb-1">
                    {info.title}
                  </h3>
                  <p className="text-gray-600 text-sm whitespace-pre-line">
                    {info.content}
                  </p>
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-10 md:py-20 bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <AnimatedSection animation="fade-right">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>

              {submitted ? (
                <div className="bg-secondary/10 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-primary mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-600">
                    Your message has been received. We'll get back to you
                    shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      How can we help?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors resize-none"
                      placeholder="Tell us about your inquiry..."
                    />
                  </div>
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600">
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-secondary hover:bg-secondary-dark text-white px-8 py-4 rounded-full font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatedSection>

            {/* Map and Additional Info */}
            <AnimatedSection animation="fade-left">
              <div className="bg-gray-200 rounded-2xl overflow-hidden mb-8 h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2825.1234567890!2d-66.06!3d45.27!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDE2JzEyLjAiTiA2NsKwMDMnMzYuMCJX!5e0!3m2!1sen!2sca!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Care-ed Location"
                ></iframe>
              </div>

              {/* Hours */}
              <div className="bg-primary rounded-2xl p-8 text-white mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <Clock size={24} className="text-secondary-light" />
                  <h3 className="text-xl font-semibold">{hoursSection?.title || "Hours of Operation"}</h3>
                </div>
                <div className="space-y-3">
                  {(hoursSection?.items || [
                    { days: 'Monday - Friday', hours: '8:00 AM - 5:00 PM' },
                    { days: 'Saturday', hours: '9:00 AM - 12:00 PM' },
                    { days: 'Sunday', hours: 'Closed' }
                  ]).map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-300">{item.days}</span>
                      <span className="font-medium">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Areas */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-primary mb-4">
                  {areasSection?.title || "Serving Students From"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {areasSection?.description || "We welcome students from the Greater Saint John area and surrounding communities:"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {serviceAreas.map((area, index) => (
                    <span
                      key={index}
                      className="bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Quick Contact Section */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container-custom">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                {quickContactSection?.title || "Quick Contact"}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {quickContactSection?.description || "Have questions about our programs? Our team is ready to help you get started on your healthcare career."}
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" stagger>
            <div className="grid md:grid-cols-3 gap-8">
              {displayQuickContactItems.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : undefined}
                  rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow group border border-gray-100"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors">
                    <item.icon
                      size={28}
                      className="text-primary group-hover:text-white transition-colors"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{item.subtitle}</p>
                  <p className="text-secondary font-medium">{item.value}</p>
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-20 bg-secondary">
        <div className="container-custom text-center">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              {ctaSection?.title || "Start Your Healthcare Career"}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {ctaSection?.description || "Whether you're interested in our PSW program, certification courses, or have questions about enrollment, we'd love to hear from you."}
            </p>
            {ctaSection?.buttons?.[0] && (
              <a
                href={ctaSection.buttons[0].link}
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-secondary px-8 py-4 rounded-full font-semibold transition-colors"
              >
                <Phone size={20} />
                {ctaSection.buttons[0].text}
              </a>
            )}
            {(!ctaSection?.buttons?.[0] || ctaSection?.buttons?.[0]?.text === '') && (
              <a
                href="tel:+15066348906"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-secondary px-8 py-4 rounded-full font-semibold transition-colors"
              >
                <Phone size={20} />
                (506) 634-8906
              </a>
            )}
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

export default Contact;
