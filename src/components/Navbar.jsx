import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Phone, Mail, ChevronRight } from 'lucide-react'
import logo from '../assets/images/logo.png'
import useGlobalData from '../hooks/useGlobalData'
import { getGmailLink } from '../utils/email'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const { navbarSection, brandingSection, loading } = useGlobalData()

  // Get dynamic data with fallbacks
  const contactInfo = navbarSection?.content?.contactInfo || {}
  const tagline = navbarSection?.content?.tagline || 'Professional Healthcare Training Since 2007'
  const phone = contactInfo.phone || '(506) 634-8906'
  const email = contactInfo.email || 'info@carelearning.ca'

  // Get logo from branding section with fallback to static import
  const logoUrl = brandingSection?.content?.logo?.url || logo

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    // { name: 'Services', path: '/services' }, // Commented out - care services removed
    { name: 'Programs', path: '/care-ed' },
    // { name: 'Careers', path: '/careers' }, // Commented out - renamed to Programs
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-2 hidden md:block">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-2 hover:text-secondary-light transition-colors">
              <Phone size={14} />
              <span>{phone}</span>
            </a>
            {/* <a href={getGmailLink(email)} className="flex items-center gap-2 hover:text-secondary-light transition-colors">
              <Mail size={14} />
              <span>{email}</span>
            </a> */}
            <a
              href={
                email
                  ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`
                  : "#"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-secondary-light transition-colors"
            >
              <Mail size={14} />
              <span>{email}</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-secondary-light">●</span>
            <span>{tagline}</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-white shadow-lg">
        <div className="container-custom">
          <div className="flex justify-between items-center py-1">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img src={logoUrl} alt="Care-ed Logo" className="w-25 md:w-35" />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `font-medium transition-all relative py-2 ${isActive
                      ? 'text-secondary'
                      : 'text-gray-700 hover:text-secondary'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary rounded-full"></span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary to-secondary-dark hover:from-secondary-dark hover:to-secondary text-white px-6 py-3 rounded-full font-semibold transition-all shadow-lg shadow-secondary/30 hover:shadow-xl"
              >
                Enroll Now
                <ChevronRight size={18} />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-primary hover:bg-gray-100 rounded-xl transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Nav */}
          {isOpen && (
            <div className="lg:hidden py-6 border-t">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `font-medium py-3 px-4 rounded-xl transition-colors ${isActive
                        ? 'bg-secondary/10 text-secondary'
                        : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-secondary to-secondary-dark text-white px-6 py-4 rounded-full font-semibold transition-all mt-2"
                >
                  Enroll Now
                  <ChevronRight size={18} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar