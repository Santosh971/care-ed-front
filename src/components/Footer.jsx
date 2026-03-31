import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Linkedin, Instagram, Twitter, Youtube } from 'lucide-react'
import logoLightStatic from '../assets/images/logo_light.png'
import useGlobalData from '../hooks/useGlobalData'
import { getGmailLink } from '../utils/email'

// Icon mapping for social platforms
const socialIconMap = {
  Facebook: Facebook,
  LinkedIn: Linkedin,
  Twitter: Twitter,
  Instagram: Instagram,
  YouTube: Youtube
}

// Static fallback data
const staticFooterData = {
  companyInfo: {
    name: 'Care-Ed Learning Center',
    description: 'Professional healthcare education and training since 2007. Building careers through quality education.',
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
    { platform: 'Facebook', url: '#' },
    { platform: 'LinkedIn', url: '#' }
  ],
  contactInfo: {
    phone: '(506) 634-8906',
    email: 'info@carelearning.ca',
    address: '100 Prince Edward St, Saint John, NB'
  },
  copyright: '© {year} Care-Ed Inc. All rights reserved.',
  privacyLink: '/privacy',
  termsLink: '/terms'
}

function Footer() {
  const { footerSection, brandingSection, loading, fromApi } = useGlobalData()

  // Get footer content with fallback
  const footer = footerSection?.content || staticFooterData

  // Get logo from branding section with fallback to static import
  const logoUrl = brandingSection?.content?.logoLight?.url || logoLightStatic

  // Process copyright text to replace {year} with current year
  const copyrightText = (footer.copyright || staticFooterData.copyright).replace('{year}', new Date().getFullYear())

  // Get social icon component
  const getSocialIcon = (platform) => socialIconMap[platform] || Facebook

  // Get data arrays with fallbacks
  const quickLinks = footer.quickLinks || staticFooterData.quickLinks
  const programs = footer.programs || staticFooterData.programs
  const socialLinks = footer.socialLinks || staticFooterData.socialLinks
  const contactInfo = footer.contactInfo || staticFooterData.contactInfo
  const companyInfo = footer.companyInfo || staticFooterData.companyInfo

  return (
    <footer className="bg-primary text-white py-10 md:mb-0">
      {/* Main Footer */}
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logoUrl} alt="Care-ed Logo" className="w-32" />
            </div>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              {companyInfo?.description || staticFooterData.companyInfo.description}
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social, index) => {
                const SocialIcon = getSocialIcon(social.platform)
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-secondary transition-all"
                    aria-label={social.platform}
                  >
                    <SocialIcon size={18} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-secondary-light transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Programs</h4>
            <ul className="space-y-2">
              {programs.map((program, index) => (
                <li key={index}>
                  <Link
                    to={program.path}
                    className="text-gray-300 hover:text-secondary-light transition-colors text-sm"
                  >
                    {program.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-secondary-light mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  {contactInfo?.address || staticFooterData.contactInfo.address}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${contactInfo?.phone?.replace(/[^0-9+]/g, '') || '+15066348906'}`}
                  className="flex items-center gap-3 text-gray-300 hover:text-secondary-light transition-colors"
                >
                  <Phone size={16} className="text-secondary-light flex-shrink-0" />
                  <span className="text-sm">{contactInfo?.phone || staticFooterData.contactInfo.phone}</span>
                </a>
              </li>

              <li>
                <a
                  href={
                    (contactInfo?.email || staticFooterData.contactInfo.email)
                      ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                        contactInfo?.email || staticFooterData.contactInfo.email
                      )}`
                      : "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-secondary-light transition-colors"
                >
                  <Mail size={16} className="text-secondary-light flex-shrink-0" />
                  <span className="text-sm">
                    {contactInfo?.email || staticFooterData.contactInfo.email}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 mt-5 pt-3">
        <div className="container-custom px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              {copyrightText}
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                to="/privacy-policy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer