import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, loading } = useAuth();
  const location = useLocation();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!admin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/admin' || path === '/admin/') return 'Dashboard';
    if (path === '/admin/settings') return 'Global Settings';
    if (path.includes('/admin/pages/')) {
      const page = path.split('/').pop();
      const pageNames = {
        'home': 'Home Page',
        'about': 'About Page',
        // 'services': 'Services Page',
        'care-ed': 'Care-Ed Page',
        'careers': 'Careers Page',
        'contact': 'Contact Page'
      };
      return pageNames[page] || `${page.charAt(0).toUpperCase() + page.slice(1)} Page`;
    }
    if (path === '/admin/media') return 'Media Library';
    if (path === '/admin/contacts') return 'Contact Forms';
    return 'Admin';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-row">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen ">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30 flex-shrink-0">
          <div className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 -ml-1 sm:-ml-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                aria-label="Open menu"
              >
                <Menu size={22} className="text-gray-700" />
              </button>

              {/* Page title */}
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-primary truncate">
                  {getPageTitle()}
                </h1>
              </div>
            </div>

            {/* Right side - User info */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="text-right hidden md:block">
                <div className="text-sm font-medium text-gray-900">
                  {admin?.name}
                </div>
                <div className="text-xs text-gray-500">
                  {admin?.role === 'super_admin' ? 'Super Admin' : 'Editor'}
                </div>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                <span className="font-semibold text-sm">
                  {admin?.name?.charAt(0)?.toUpperCase() || 'A'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-3 px-4 text-center text-xs sm:text-sm text-gray-500 flex-shrink-0">
          <span>Care-Ed Admin Panel</span>
          <span className="mx-2">•</span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;