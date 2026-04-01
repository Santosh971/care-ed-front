// import { useState, useEffect } from 'react';
// import {
//   Mail,
//   Search,
//   Filter,
//   Eye,
//   Trash2,
//   RefreshCw,
//   ChevronDown,
//   Clock,
//   CheckCircle,
//   XCircle
// } from 'lucide-react';
// import { contactAPI } from '../../services/api';

// const ContactsPage = () => {
//   const [contacts, setContacts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [search, setSearch] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     fetchContacts();
//   }, [statusFilter, page]);

//   const fetchContacts = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const params = { page, limit: 10 };
//       if (statusFilter) params.status = statusFilter;
//       if (search) params.search = search;

//       const response = await contactAPI.getAll(params);

//       if (response.success) {
//         setContacts(response.data);
//         setTotalPages(response.pagination?.totalPages || 1);
//       }
//     } catch (err) {
//       setError(err.message || 'Failed to load contacts');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setPage(1);
//     fetchContacts();
//   };

//   const handleStatusUpdate = async (id, status) => {
//     try {
//       await contactAPI.updateStatus(id, status);
//       fetchContacts();
//     } catch (err) {
//       console.error('Status update error:', err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this contact?')) {
//       return;
//     }

//     try {
//       await contactAPI.deleteContact(id);
//       fetchContacts();
//     } catch (err) {
//       console.error('Delete error:', err);
//     }
//   };

//   const getStatusBadge = (status) => {
//     const styles = {
//       new: 'bg-blue-100 text-blue-800',
//       read: 'bg-yellow-100 text-yellow-800',
//       responded: 'bg-green-100 text-green-800',
//       closed: 'bg-gray-100 text-gray-800'
//     };

//     return (
//       <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || styles.new}`}>
//         {status?.charAt(0).toUpperCase() + status?.slice(1)}
//       </span>
//     );
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <h1 className="text-2xl font-bold text-primary">Contact Form Submissions</h1>
//         <button
//           onClick={fetchContacts}
//           className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
//         >
//           <RefreshCw size={16} />
//           Refresh
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
//         <div className="flex flex-col sm:flex-row gap-4">
//           <form onSubmit={handleSearch} className="flex-1">
//             <div className="relative">
//               <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search by name, email, or subject..."
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none"
//               />
//             </div>
//           </form>
//           <select
//             value={statusFilter}
//             onChange={(e) => {
//               setStatusFilter(e.target.value);
//               setPage(1);
//             }}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none"
//           >
//             <option value="">All Status</option>
//             <option value="new">New</option>
//             <option value="read">Read</option>
//             <option value="responded">Responded</option>
//             <option value="closed">Closed</option>
//           </select>
//         </div>
//       </div>

//       {/* Error message */}
//       {error && (
//         <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
//           {error}
//         </div>
//       )}

//       {/* Contacts list */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         {loading ? (
//           <div className="flex items-center justify-center py-12">
//             <RefreshCw size={24} className="animate-spin text-primary" />
//           </div>
//         ) : contacts.length === 0 ? (
//           <div className="text-center py-12">
//             <Mail size={48} className="mx-auto text-gray-300 mb-4" />
//             <p className="text-gray-500">No contact submissions found</p>
//           </div>
//         ) : (
//           <div className="divide-y divide-gray-200">
//             {contacts.map((contact) => (
//               <div key={contact._id} className="p-4 hover:bg-gray-50">
//                 <div className="flex items-start justify-between gap-4">
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-2 mb-1">
//                       <h3 className="font-semibold text-gray-900 truncate">
//                         {contact.name}
//                       </h3>
//                       {getStatusBadge(contact.status)}
//                     </div>
//                     <p className="text-sm text-gray-600 truncate">
//                       {contact.email}
//                       {contact.phone && ` • ${contact.phone}`}
//                     </p>
//                     <p className="text-sm font-medium text-primary truncate mt-1">
//                       {contact.subject}
//                     </p>
//                     <p className="text-sm text-gray-500 line-clamp-2 mt-1">
//                       {contact.message}
//                     </p>
//                     <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
//                       <Clock size={12} />
//                       {formatDate(contact.createdAt)}
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => setSelectedContact(contact)}
//                       className="p-2 hover:bg-gray-100 rounded-lg"
//                       title="View details"
//                     >
//                       <Eye size={18} className="text-gray-500" />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(contact._id)}
//                       className="p-2 hover:bg-red-50 rounded-lg"
//                       title="Delete"
//                     >
//                       <Trash2 size={18} className="text-red-500" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
//             <button
//               onClick={() => setPage((p) => Math.max(1, p - 1))}
//               disabled={page === 1}
//               className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Previous
//             </button>
//             <span className="text-sm text-gray-600">
//               Page {page} of {totalPages}
//             </span>
//             <button
//               onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//               disabled={page === totalPages}
//               className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Contact detail modal */}
//       {selectedContact && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-auto">
//             <div className="p-6 border-b border-gray-200">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-xl font-semibold text-primary">Contact Details</h2>
//                 <button
//                   onClick={() => setSelectedContact(null)}
//                   className="p-2 hover:bg-gray-100 rounded-lg"
//                 >
//                   <XCircle size={20} />
//                 </button>
//               </div>
//             </div>
//             <div className="p-6 space-y-4">
//               <div>
//                 <label className="text-sm text-gray-500">Name</label>
//                 <p className="font-medium">{selectedContact.name}</p>
//               </div>
//               <div>
//                 <label className="text-sm text-gray-500">Email</label>
//                 <p className="font-medium">{selectedContact.email}</p>
//               </div>
//               {selectedContact.phone && (
//                 <div>
//                   <label className="text-sm text-gray-500">Phone</label>
//                   <p className="font-medium">{selectedContact.phone}</p>
//                 </div>
//               )}
//               <div>
//                 <label className="text-sm text-gray-500">Subject</label>
//                 <p className="font-medium">{selectedContact.subject}</p>
//               </div>
//               <div>
//                 <label className="text-sm text-gray-500">Message</label>
//                 <p className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap">
//                   {selectedContact.message}
//                 </p>
//               </div>
//               <div>
//                 <label className="text-sm text-gray-500">Status</label>
//                 <div className="mt-1">{getStatusBadge(selectedContact.status)}</div>
//               </div>
//               <div>
//                 <label className="text-sm text-gray-500">Submitted</label>
//                 <p className="font-medium">{formatDate(selectedContact.createdAt)}</p>
//               </div>

//               <div className="flex flex-wrap gap-2 pt-4 border-t">
//                 <span className="text-sm text-gray-500 mr-2">Update Status:</span>
//                 {['new', 'read', 'responded', 'closed'].map((status) => (
//                   <button
//                     key={status}
//                     onClick={() => {
//                       handleStatusUpdate(selectedContact._id, status);
//                       setSelectedContact({ ...selectedContact, status });
//                     }}
//                     className={`px-3 py-1 text-sm rounded-lg ${
//                       selectedContact.status === status
//                         ? 'bg-secondary text-white'
//                         : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
//                     }`}
//                   >
//                     {status.charAt(0).toUpperCase() + status.slice(1)}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContactsPage;





import { useState, useEffect } from 'react';
import {
  Mail,
  Search,
  Filter,
  Eye,
  Trash2,
  RefreshCw,
  ChevronDown,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { contactAPI } from '../../services/api';

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchContacts();
  }, [statusFilter, page]);

  const fetchContacts = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = { page, limit: 10 };
      if (statusFilter) params.status = statusFilter;
      if (search) params.search = search;

      const response = await contactAPI.getAll(params);

      if (response.success) {
        setContacts(response.data);
        setTotalPages(response.pagination?.totalPages || 1);
      }
    } catch (err) {
      setError(err.message || 'Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchContacts();
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await contactAPI.updateStatus(id, status);
      fetchContacts();
    } catch (err) {
      console.error('Status update error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    try {
      await contactAPI.deleteContact(id);
      fetchContacts();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      new: 'bg-blue-100 text-blue-800',
      read: 'bg-yellow-100 text-yellow-800',
      responded: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || styles.new}`}>
        {status?.charAt(0).toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-3 sm:px-0">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-primary">Contact Form Submissions</h1>
        <button
          onClick={fetchContacts}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm sm:text-base"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* ── Filters ─────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          {/* Search — takes remaining width on desktop */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, or subject..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none text-sm sm:text-base"
              />
            </div>
          </form>
          {/* Status select — full-width on mobile */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none text-sm sm:text-base"
          >
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="responded">Responded</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* ── Error message ───────────────────────────────────────────────── */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* ── Contacts list ───────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw size={24} className="animate-spin text-primary" />
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-12">
            <Mail size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-sm sm:text-base">No contact submissions found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {contacts.map((contact) => (
              <div key={contact._id} className="p-3 sm:p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between gap-3">

                  {/* Left — contact info */}
                  <div className="flex-1 min-w-0">
                    {/* Name + badge row */}
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                        {contact.name}
                      </h3>
                      {getStatusBadge(contact.status)}
                    </div>

                    {/* Email / phone */}
                    <p className="text-xs sm:text-sm text-gray-600 truncate">
                      {contact.email}
                      {contact.phone && ` • ${contact.phone}`}
                    </p>

                    {/* Subject */}
                    <p className="text-xs sm:text-sm font-medium text-primary truncate mt-1">
                      {contact.subject}
                    </p>

                    {/* Message preview — 1 line on mobile, 2 on desktop */}
                    <p className="text-xs sm:text-sm text-gray-500 line-clamp-1 sm:line-clamp-2 mt-1">
                      {contact.message}
                    </p>

                    {/* Timestamp */}
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-400">
                      <Clock size={11} />
                      {formatDate(contact.createdAt)}
                    </div>
                  </div>

                  {/* Right — action buttons, always stacked vertically so they never overflow */}
                  <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 flex-shrink-0">
                    <button
                      onClick={() => setSelectedContact(contact)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                      title="View details"
                    >
                      <Eye size={17} className="text-gray-500" />
                    </button>
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="p-2 hover:bg-red-50 rounded-lg"
                      title="Delete"
                    >
                      <Trash2 size={17} className="text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Pagination ─────────────────────────────────────────────── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-t border-gray-200">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-xs sm:text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* ── Contact detail modal ────────────────────────────────────────── */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">          {/*
            On mobile  → sheet slides up from the bottom (items-end, rounded top corners only,
                         max-h capped so it never covers the full screen)
            On desktop → centered modal with all-rounded corners (items-center, rounded-xl)
          */}
          <div className="bg-white w-full max-w-md sm:max-w-lg rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="sticky top-0 bg-white px-4 sm:px-6 py-4 border-b border-gray-200 flex items-center justify-between z-10">
              {/* Drag handle — visible on mobile only */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-gray-300 rounded-full sm:hidden" />
              <h2 className="text-lg sm:text-xl font-semibold text-primary">Contact Details</h2>
              <button
                onClick={() => setSelectedContact(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XCircle size={20} />
              </button>
            </div>

            {/* Modal body */}
            <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-4">
              <div>
                <label className="text-xs sm:text-sm text-gray-500">Name</label>
                <p className="font-medium text-sm sm:text-base mt-0.5">{selectedContact.name}</p>
              </div>
              <div>
                <label className="text-xs sm:text-sm text-gray-500">Email</label>
                {/* break-all prevents long email addresses from overflowing on narrow screens */}
                <p className="font-medium text-sm sm:text-base mt-0.5 break-all">{selectedContact.email}</p>
              </div>
              {selectedContact.phone && (
                <div>
                  <label className="text-xs sm:text-sm text-gray-500">Phone</label>
                  <p className="font-medium text-sm sm:text-base mt-0.5">{selectedContact.phone}</p>
                </div>
              )}
              <div>
                <label className="text-xs sm:text-sm text-gray-500">Subject</label>
                <p className="font-medium text-sm sm:text-base mt-0.5">{selectedContact.subject}</p>
              </div>
              <div>
                <label className="text-xs sm:text-sm text-gray-500">Message</label>
                <p className="bg-gray-50 rounded-lg p-3 sm:p-4 mt-0.5 whitespace-pre-wrap text-sm sm:text-base">
                  {selectedContact.message}
                </p>
              </div>
              <div>
                <label className="text-xs sm:text-sm text-gray-500">Status</label>
                <div className="mt-1">{getStatusBadge(selectedContact.status)}</div>
              </div>
              <div>
                <label className="text-xs sm:text-sm text-gray-500">Submitted</label>
                <p className="font-medium text-sm sm:text-base mt-0.5">{formatDate(selectedContact.createdAt)}</p>
              </div>

              {/* Status update buttons */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs sm:text-sm text-gray-500 mb-2">Update Status</p>
                {/* 2-col grid on mobile so buttons don't get too squished */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                  {['new', 'read', 'responded', 'closed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        handleStatusUpdate(selectedContact._id, status);
                        setSelectedContact({ ...selectedContact, status });
                      }}
                      className={`px-3 py-2 sm:py-1 text-xs sm:text-sm rounded-lg text-center ${selectedContact.status === status
                        ? 'bg-secondary text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsPage;