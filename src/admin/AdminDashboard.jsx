import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Image,
  Users,
  Mail,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { pagesAPI, contactAPI, mediaAPI } from '../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    pages: 0,
    contacts: 0,
    media: 0,
    newContacts: 0
  });
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch data in parallel
      const [pagesRes, contactsRes, mediaRes] = await Promise.allSettled([
        pagesAPI.getAllPages(),
        contactAPI.getStats(),
        mediaAPI.getStats()
      ]);

      const newStats = { ...stats };

      if (pagesRes.status === 'fulfilled') {
        newStats.pages = pagesRes.value?.data?.length || 0;
      }

      if (contactsRes.status === 'fulfilled') {
        newStats.contacts = contactsRes.value?.data?.total || 0;
        newStats.newContacts = contactsRes.value?.data?.byStatus?.new || 0;
        setRecentContacts(contactsRes.value?.data?.recent || []);
      }

      if (mediaRes.status === 'fulfilled') {
        newStats.media = mediaRes.value?.data?.total || 0;
      }

      setStats(newStats);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Pages',
      value: stats.pages,
      icon: FileText,
      color: 'bg-primary',
      link: '/admin/pages/home'
    },
    {
      title: 'Contact Submissions',
      value: stats.contacts,
      icon: Mail,
      color: 'bg-secondary',
      link: '/admin/contacts'
    },
    // {
    //   title: 'Media Files',
    //   value: stats.media,
    //   icon: Image,
    //   color: 'bg-blue-500',
    //   link: '/admin/media'
    // },
    {
      title: 'New Messages',
      value: stats.newContacts,
      icon: AlertCircle,
      color: 'bg-orange-500',
      link: '/admin/contacts'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon size={24} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-primary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/pages/home"
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FileText size={20} className="text-primary" />
            <span className="font-medium">Edit Home Page</span>
          </Link>
          {/* <Link
            to="/admin/media"
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Image size={20} className="text-secondary" />
            <span className="font-medium">Upload Media</span>
          </Link> */}
          <Link
            to="/admin/contacts"
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Mail size={20} className="text-blue-500" />
            <span className="font-medium">View Messages</span>
          </Link>
          {/* <Link
            to="/"
            target="_blank"
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <TrendingUp size={20} className="text-green-500" />
            <span className="font-medium">View Live Site</span>
          </Link> */}
        </div>
      </div>

      {/* Page editors overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-primary mb-4">Page Editors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Home', path: '/admin/pages/home', icon: FileText },
            { name: 'About', path: '/admin/pages/about', icon: FileText },

            { name: 'Care-Ed', path: '/admin/pages/care-ed', icon: FileText },
            { name: 'Contact', path: '/admin/pages/contact', icon: FileText }
          ].map((page, index) => (
            <Link
              key={index}
              to={page.path}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <page.icon size={20} className="text-primary" />
              <div className="flex-1">
                <span className="font-medium">{page.name}</span>
                <p className="text-sm text-gray-500">Edit {page.name.toLowerCase()} page content</p>
              </div>
              <CheckCircle size={18} className="text-green-500" />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-primary mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Clock size={18} className="text-gray-400" />
            <div className="flex-1">
              <p className="font-medium">Welcome to the Admin Panel</p>
              <p className="text-sm text-gray-500">You can manage all your content from here</p>
            </div>
          </div>
          {stats.newContacts > 0 && (
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <AlertCircle size={18} className="text-orange-500" />
              <div className="flex-1">
                <p className="font-medium">You have {stats.newContacts} new message(s)</p>
                <Link to="/admin/contacts" className="text-sm text-secondary hover:underline">
                  View messages
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;