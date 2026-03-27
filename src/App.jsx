import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import { AuthProvider } from './context/AuthContext'
import { useEffect } from 'react'
import useGlobalData from './hooks/useGlobalData'

// Public pages
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import CareEd from './pages/CareEd'
import Careers from './pages/Careers'
import Contact from './pages/Contact'

// Admin pages
import AdminLogin from './admin/AdminLogin'
import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/AdminDashboard'
import PageEditor from './admin/pages/PageEditor'
import ContactsPage from './admin/pages/ContactsPage'
import MediaLibrary from './admin/pages/MediaLibrary'
import GlobalSettings from './admin/pages/GlobalSettings'

// Component to update favicon dynamically
const FaviconUpdater = () => {
  const { brandingSection } = useGlobalData()

  useEffect(() => {
    if (brandingSection?.content?.favicon?.url) {
      // Find existing favicon link or create new one
      let link = document.querySelector("link[rel~='icon']")
      if (!link) {
        link = document.createElement('link')
        link.rel = 'icon'
        document.head.appendChild(link)
      }
      link.href = brandingSection.content.favicon.url
    }
  }, [brandingSection?.content?.favicon?.url])

  return null
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <FaviconUpdater />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:slug" element={<ServiceDetail />} />
            <Route path="care-ed" element={<CareEd />} />
            <Route path="careers" element={<Careers />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Admin login route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin panel routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="pages/:pageId" element={<PageEditor />} />
            <Route path="settings" element={<GlobalSettings />} />
            <Route path="media" element={<MediaLibrary />} />
            <Route path="contacts" element={<ContactsPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App