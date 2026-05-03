import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Linkedin, Instagram, Twitter, Youtube } from 'lucide-react'
import logoLightStatic from '../assets/images/logo_light.png'
import useGlobalData from '../hooks/useGlobalData'

// Icon mapping for social platforms
const socialIconMap = {
  Facebook: Facebook,
  LinkedIn: Linkedin,
  Twitter: Twitter,
  Instagram: Instagram,
  YouTube: Youtube
}

function Footer() {
  const { footerSection, brandingSection, contactSection, loading, fromApi } = useGlobalData()

  // Get logo from branding section with fallback to static import
  const logoUrl = brandingSection?.content?.logoLight?.url || logoLightStatic

  // Get footer content
  const footer = footerSection?.content || {}

  // Get contact info from dedicated contact section (single source of truth)
  // Fall back to footer contactInfo for backward compatibility
  const contact = contactSection?.content || footer.contactInfo || {}

  // Process copyright text to replace {year} with current year
  const copyrightText = (footer.copyright || '© {year} Care-Ed Inc. All rights reserved.').replace('{year}', new Date().getFullYear())

  // Get social icon component
  const getSocialIcon = (platform) => socialIconMap[platform] || Facebook

  // Get data arrays with fallbacks
  const quickLinks = footer.quickLinks || []
  const programs = footer.programs || []
  const socialLinks = footer.socialLinks || []
  const companyInfo = footer.companyInfo || {}

  // Contact info from dedicated section (single source of truth)
  const phone = contact.phone || '(506) 634-8906'
  const phoneLink = contact.phoneLink || 'tel:+15066348906'
  const email = contact.email || 'info@carelearning.ca'
  const address = contact.address?.full || contact.address?.street || '100 Prince Edward St, Saint John, NB'

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
              {companyInfo?.description || 'Professional healthcare education and training since 1987.'}
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

          {/* Contact Info - uses global contact section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-secondary-light mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  {address}
                </span>
              </li>
              <li>
                <a
                  href={phoneLink}
                  className="flex items-center gap-3 text-gray-300 hover:text-secondary-light transition-colors"
                >
                  <Phone size={16} className="text-secondary-light flex-shrink-0" />
                  <span className="text-sm">{phone}</span>
                </a>
              </li>

              <li>
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-secondary-light transition-colors"
                >
                  <Mail size={16} className="text-secondary-light flex-shrink-0" />
                  <span className="text-sm">{email}</span>
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