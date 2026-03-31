import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  FileText,
  Image,
  Users,
  Settings,
  LogOut,
  X,
  Home,
  Info,
  Briefcase,
  GraduationCap,
  Mail,
  ChevronRight,
  Layout,
  Shield,
  Scroll
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { admin, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const handleNavigate = (path) => {
    navigate(path);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin'
    },
    {
      id: 'divider',
      label: 'PAGES',
      isDivider: true
    },
    {
      id: 'home',
      label: 'Home Page',
      icon: Home,
      path: '/admin/pages/home'
    },
    {
      id: 'about',
      label: 'About Page',
      icon: Info,
      path: '/admin/pages/about'
    },
    // {
    //   id: 'services',
    //   label: 'Services Page',
    //   icon: Briefcase,
    //   path: '/admin/pages/services'
    // },
    {
      id: 'care-ed',
      label: 'Care-Ed Page',
      icon: GraduationCap,
      path: '/admin/pages/care-ed'
    },
    // {
    //   id: 'careers',
    //   label: 'Careers Page',
    //   icon: Users,
    //   path: '/admin/pages/careers'
    // },
    {
      id: 'contact',
      label: 'Contact Page',
      icon: Mail,
      path: '/admin/pages/contact'
    },
    {
      id: 'divider-legal',
      label: 'LEGAL',
      isDivider: true
    },
    {
      id: 'privacy-policy',
      label: 'Privacy Policy',
      icon: Shield,
      path: '/admin/pages/legal/privacy-policy'
    },
    {
      id: 'terms-of-service',
      label: 'Terms of Service',
      icon: Scroll,
      path: '/admin/pages/legal/terms-of-service'
    },
    {
      id: 'divider2',
      label: 'GLOBAL',
      isDivider: true
    },
    {
      id: 'footer',
      label: 'Footer',
      icon: Layout,
      path: '/admin/pages/global'
    },
    {
      id: 'global-settings',
      label: 'Global Settings',
      icon: Settings,
      path: '/admin/settings'
    },
    {
      id: 'divider3',
      label: 'DATA',
      isDivider: true
    },
    {
      id: 'contacts',
      label: 'Contact Forms',
      icon: Users,
      path: '/admin/contacts'
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-primary text-white transition-transform duration-300 ease-in-out flex flex-col
          lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
              <GraduationCap size={22} />
            </div>
            <div>
              <span className="font-bold text-lg leading-tight">Care-Ed</span>
              <span className="block text-xs text-white/70">Admin Panel</span>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation - Scrollable */}
        {/* <nav className="flex-1 overflow-y-auto py-2 px-2"> */}
        <nav className="flex-1 overflow-y-auto py-2 px-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <ul className="space-y-0.5">
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.isDivider ? (
                  /* Section Divider */
                  <div className="px-3 py-2 mt-2 first:mt-0">
                    <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                      {item.label}
                    </span>
                  </div>
                ) : (
                  /* Menu Item */
                  <button
                    onClick={() => handleNavigate(item.path)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${isActive(item.path)
                      ? 'bg-secondary text-white shadow-md'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    <item.icon size={18} className="flex-shrink-0" />
                    <span className="font-medium text-sm">{item.label}</span>
                    {isActive(item.path) && (
                      <ChevronRight size={14} className="ml-auto" />
                    )}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* User info - Fixed at bottom */}
        <div className="flex-shrink-0 p-3 border-t border-white/10 bg-primary">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5 mb-2">
            <div className="w-9 h-9 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
              <span className="font-semibold text-sm">
                {admin?.name?.charAt(0)?.toUpperCase() || 'A'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate text-sm">
                {admin?.name || 'Admin'}
              </div>
              <div className="text-xs text-white/60 truncate">
                {admin?.email}
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;