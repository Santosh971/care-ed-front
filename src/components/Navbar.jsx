import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Phone, Mail, ChevronRight, ChevronDown, Globe } from 'lucide-react'
import logo from '../assets/images/logo.png'
import useGlobalData from '../hooks/useGlobalData'
import { useInternationalStudentsNav } from '../hooks/useInternationalStudents'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const { navbarSection, brandingSection, contactSection, loading } = useGlobalData()
  const { pages: intlPages, loading: intlLoading } = useInternationalStudentsNav()

  // Get contact info from dedicated contact section (single source of truth)
  // Fall back to navbar contactInfo for backward compatibility
  const contact = contactSection?.content || navbarSection?.content?.contactInfo || {}
  const tagline = navbarSection?.content?.tagline || 'Professional Healthcare Training Since 1987'

  // Contact info from dedicated section (single source of truth)
  const phone = contact.phone || '(506) 634-8906'
  const phoneLink = contact.phoneLink || 'tel:+15066348906'
  const email = contact.email || 'info@carelearning.ca'

  // Get logo from branding section with fallback to static import
  const logoUrl = brandingSection?.content?.logo?.url || logo

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/care-ed' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ]

  // International Students dropdown links - show all pages from API/static fallback
  const intlDropdownLinks = intlLoading ? [] : intlPages.map(page => ({
    name: page.title,
    path: `/international-students/${page.slug}`
  }))

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-2 hidden md:block">
        <div className="container-custom flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href={phoneLink} className="flex items-center gap-2 hover:text-secondary-light transition-colors">
              <Phone size={14} />
              <span>{phone}</span>
            </a>
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`}
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

              {/* International Students Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 font-medium transition-all py-2 ${
                    dropdownOpen ? 'text-secondary' : 'text-gray-700 hover:text-secondary'
                  }`}
                >
                  <Globe size={18} />
                  International Students
                  <ChevronDown size={16} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full left-0 mt-0 w-72 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 max-h-[80vh] overflow-y-auto">
                    {/* <Link
                      to="/international-students"
                      className="block px-4 py-2 text-sm font-semibold text-primary hover:bg-secondary/10 transition-colors"
                    >
                      Overview
                    </Link> */}
                    <div className="border-t border-gray-100 my-1"></div>
                    {intlDropdownLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary/10 hover:text-secondary transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

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

                {/* International Students - Mobile */}
                <div className="border-t border-gray-200 pt-4 mt-2">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center justify-between w-full font-medium py-3 px-4 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Globe size={18} />
                      International Students
                    </span>
                    <ChevronDown size={16} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {dropdownOpen && (
                    <div className="ml-4 mt-2 flex flex-col gap-1">
                      <Link
                        to="/international-students"
                        onClick={() => {
                          setIsOpen(false)
                          setDropdownOpen(false)
                        }}
                        className="text-sm py-2 px-4 font-medium text-primary hover:text-secondary hover:bg-secondary/5 rounded-lg transition-colors"
                      >
                        Overview
                      </Link>
                      {intlDropdownLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => {
                            setIsOpen(false)
                            setDropdownOpen(false)
                          }}
                          className="text-sm py-2 px-4 text-gray-600 hover:text-secondary hover:bg-secondary/5 rounded-lg transition-colors"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

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