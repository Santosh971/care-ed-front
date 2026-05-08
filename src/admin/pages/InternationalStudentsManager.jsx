


import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { pagesAPI } from '../../services/api';
import {
  Globe,
  Edit,
  Eye,
  EyeOff,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';

const InternationalStudentsManager = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const staticChildPages = [
    { pageId: 'is-programs', title: 'Programs for International Students', slug: 'programs', order: 1 },
    { pageId: 'is-apply', title: 'How to Apply', slug: 'how-to-apply', order: 2 },
    { pageId: 'is-admission-requirements', title: 'Admission Requirements', slug: 'admission-requirements', order: 3 },
    { pageId: 'is-tuition-fees', title: 'Tuition, Fees & Refund Policy', slug: 'tuition-fees', order: 4 },
    { pageId: 'is-language-requirements', title: 'Language Requirements', slug: 'language-requirements', order: 5 },
    { pageId: 'is-housing-support', title: 'Housing Support', slug: 'housing-support', order: 6 },
    { pageId: 'is-health-support', title: 'Health Support', slug: 'health-support', order: 7 },
    { pageId: 'is-mental-health', title: 'Mental Health & Crisis Support', slug: 'mental-health', order: 8 },
    { pageId: 'is-social-support', title: 'Social & Community Support', slug: 'social-support', order: 9 },
    { pageId: 'is-academic-support', title: 'Academic & Peer Support', slug: 'academic-support', order: 10 },
    { pageId: 'is-immigration', title: 'Immigration & Study Permit', slug: 'immigration', order: 11 },
    { pageId: 'is-student-rights', title: 'Student Rights & Responsibilities', slug: 'student-rights', order: 12 },
    { pageId: 'is-student-advisor', title: 'Student Advisor / Contact', slug: 'student-advisor', order: 13 },
    { pageId: 'is-important-links', title: 'Important Links', slug: 'important-links', order: 14 },
    { pageId: 'is-faq', title: 'FAQ', slug: 'faq', order: 15 },
  ];

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const response = await pagesAPI.getChildPages('international-students');
      if (response.success && response.data) {
        setPages(response.data);
      } else {
        setPages(staticChildPages);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching pages:', err);
      setPages(staticChildPages);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading pages...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">

      {/* ── Header ── */}
      <div className="mb-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-1 flex-wrap text-xs sm:text-sm text-gray-500 mb-3">
          <Link to="/admin" className="hover:text-secondary whitespace-nowrap">
            Dashboard
          </Link>
          <ChevronRight size={13} className="flex-shrink-0 text-gray-400" />
          <Link to="/admin/pages/international-students" className="hover:text-secondary whitespace-nowrap">
            International Students
          </Link>
          <ChevronRight size={13} className="flex-shrink-0 text-gray-400" />
          <span className="text-gray-700 whitespace-nowrap">Manage Pages</span>
        </div>

        {/* Title + Refresh */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Globe size={20} className="text-secondary" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold text-primary leading-tight">
                International Students Pages
              </h1>
              <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
                Manage all International Students pages
              </p>
            </div>
          </div>

          <button
            onClick={fetchPages}
            className="self-start sm:self-auto flex items-center gap-2 px-3 py-2 sm:px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm flex-shrink-0"
          >
            <RefreshCw size={15} />
            Refresh
          </button>
        </div>
      </div>

      {/* ── Child Pages ── */}
      <div>
        <h2 className="text-base sm:text-lg font-semibold text-primary mb-3">
          Child Pages ({pages.length})
        </h2>

        {/* Desktop / Tablet table */}
        <div className="hidden sm:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 w-16">Order</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Title</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 hidden md:table-cell">Slug</th>
                  {/* <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Status</th> */}
                  <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pages.map((page, index) => (
                  <tr key={page.pageId} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-medium text-gray-600">
                        {page.order || index + 1}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-primary text-sm">{page.title}</div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 break-all">
                        /international-students/{page.slug}
                      </code>
                    </td>
                    {/* <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${page.isActive !== false ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                        {page.isActive !== false
                          ? <><Eye size={11} />Published</>
                          : <><EyeOff size={11} />Unpublished</>
                        }
                      </span>
                    </td> */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/admin/pages/${page.pageId}`}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-secondary"
                          title="Edit"
                        >
                          <Edit size={15} />
                        </Link>
                        {/* ✅ Fixed: <a tag was missing */}
                        <a
                          href={`/international-students/${page.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-secondary"
                          title="View"
                        >
                          <Eye size={15} />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile card list */}
        <div className="sm:hidden space-y-2">
          {pages.map((page, index) => (
            <div
              key={page.pageId}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
            >
              {/* Top: order + status + actions */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-medium text-gray-600 flex-shrink-0">
                    {page.order || index + 1}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${page.isActive !== false ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                    {page.isActive !== false
                      ? <><Eye size={10} />Published</>
                      : <><EyeOff size={10} />Unpublished</>
                    }
                  </span>
                </div>

                <div className="flex items-center gap-0.5 flex-shrink-0">
                  <Link
                    to={`/admin/pages/${page.pageId}`}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-secondary"
                    title="Edit"
                  >
                    <Edit size={15} />
                  </Link>
                  {/* ✅ Fixed: <a tag was missing */}
                  <a
                    href={`/international-students/${page.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-secondary"
                    title="View"
                  >
                    <Eye size={15} />
                  </a>
                </div>
              </div>

              {/* Title */}
              <p className="font-medium text-primary text-sm leading-snug mb-2">
                {page.title}
              </p>

              {/* Slug */}
              <code className="block text-xs bg-gray-100 px-2 py-1 rounded text-gray-500 break-all">
                /international-students/{page.slug}
              </code>
            </div>
          ))}
        </div>
      </div>

      {/* ── Help Text ── */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
        <h3 className="font-medium text-blue-800 mb-2 text-sm sm:text-base">
          Managing International Students Pages
        </h3>
        <ul className="text-xs sm:text-sm text-blue-700 space-y-1">
          <li>• Click <strong>Edit</strong> to modify page content, sections, and SEO settings</li>
          <li>• Click <strong>View</strong> to preview the page on the public website</li>
          <li>• Pages are displayed in order based on the <strong>Order</strong> column</li>
          <li>• The landing page provides an overview with links to all child pages</li>
        </ul>
      </div>

    </div>
  );
};

export default InternationalStudentsManager;