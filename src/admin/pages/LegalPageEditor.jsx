// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Loader2, Save, RefreshCw } from 'lucide-react';
// import { pagesAPI } from '../../services/api';
// import { legalStaticData } from '../../data/legalStaticData';
// import RichTextEditor from '../components/RichTextEditor';

// const LegalPageEditor = () => {
//   const { pageType } = useParams();
//   const pageId = pageType === 'terms-of-service' ? 'terms-of-service' : 'privacy-policy';
//   const staticData = legalStaticData[pageId];

//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [fromApi, setFromApi] = useState(false);
//   const [saveStatus, setSaveStatus] = useState({ type: '', message: '' });

//   // Form state - initialize with static data to avoid empty states
//   const [title, setTitle] = useState(staticData?.title || '');
//   const [subtitle, setSubtitle] = useState(staticData?.subtitle || '');
//   const [content, setContent] = useState(staticData?.content || '');
//   const [lastUpdated, setLastUpdated] = useState(staticData?.lastUpdated || '');
//   const [isActive, setIsActive] = useState(true);

//   // Fetch page data
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await pagesAPI.getPage(pageId);
//         if (response.success && response.data) {
//           const pageData = response.data;
//           setData(pageData);
//           setFromApi(true);
//           setTitle(pageData.title || staticData?.title || '');
//           setSubtitle(pageData.subtitle || staticData?.subtitle || '');
//           setContent(pageData.content || staticData?.content || '');
//           setLastUpdated(pageData.lastUpdated || staticData?.lastUpdated || '');
//           setIsActive(pageData.isActive !== false);
//         }
//       } catch (error) {
//         // Page doesn't exist in database - use static fallback
//         console.log('Using static fallback for', pageId);
//         setFromApi(false);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [pageId]);

//   // Handle save
//   const handleSave = async () => {
//     setSaving(true);
//     setSaveStatus({ type: '', message: '' });

//     try {
//       const pageData = {
//         pageId,
//         title,
//         subtitle,
//         content,
//         lastUpdated: new Date().toISOString().split('T')[0],
//         isActive,
//         sections: []
//       };

//       const response = await pagesAPI.savePage(pageId, pageData);

//       if (response.success) {
//         setSaveStatus({ type: 'success', message: 'Page saved successfully!' });
//         setData(pageData);
//         setFromApi(true);
//         setLastUpdated(pageData.lastUpdated);
//         setTimeout(() => setSaveStatus({ type: '', message: '' }), 3000);
//       } else {
//         throw new Error(response.message || 'Failed to save page');
//       }
//     } catch (error) {
//       console.error('Error saving legal page:', error);
//       setSaveStatus({ type: 'error', message: 'Failed to save page. Please try again.' });
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Handle reset
//   const handleReset = () => {
//     if (data) {
//       setTitle(data.title || staticData?.title || '');
//       setSubtitle(data.subtitle || staticData?.subtitle || '');
//       setContent(data.content || staticData?.content || '');
//       setLastUpdated(data.lastUpdated || staticData?.lastUpdated || '');
//       setIsActive(data.isActive !== false);
//     } else {
//       setTitle(staticData?.title || '');
//       setSubtitle(staticData?.subtitle || '');
//       setContent(staticData?.content || '');
//       setLastUpdated(staticData?.lastUpdated || '');
//       setIsActive(staticData?.isActive !== false);
//     }
//     setSaveStatus({ type: '', message: '' });
//   };

//   // Page display name
//   const pageDisplayName = pageId === 'privacy-policy' ? 'Privacy Policy' : 'Terms of Service';

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center py-12">
//         <Loader2 size={40} className="animate-spin text-secondary" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-primary">{pageDisplayName}</h1>
//           <p className="text-gray-500 text-sm mt-1">
//             Edit the {pageDisplayName.toLowerCase()} content displayed on the public website
//           </p>
//         </div>
//         {fromApi && (
//           <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm">
//             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//             Connected to API
//           </div>
//         )}
//       </div>

//       {/* Status Message */}
//       {saveStatus.message && (
//         <div className={`p-4 rounded-lg ${saveStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
//           {saveStatus.message}
//         </div>
//       )}

//       {/* Editor Form */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
//         {/* Title */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Page Title
//           </label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none"
//             placeholder={staticData?.title || 'Page Title'}
//           />
//         </div>

//         {/* Subtitle */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Subtitle (Optional)
//           </label>
//           <input
//             type="text"
//             value={subtitle}
//             onChange={(e) => setSubtitle(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none"
//             placeholder="Your privacy is important to us"
//           />
//         </div>

//         {/* Content - Rich Text Editor */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Page Content
//           </label>
//           <RichTextEditor
//             value={content}
//             onChange={setContent}
//             placeholder="Enter your content here..."
//           />
//         </div>

//         {/* Last Updated */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Last Updated Date
//           </label>
//           <input
//             type="date"
//             value={lastUpdated}
//             onChange={(e) => setLastUpdated(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none"
//           />
//           <p className="text-xs text-gray-500 mt-1">
//             Auto-updated on save, but can be manually set
//           </p>
//         </div>

//         {/* Active Toggle - Hidden for legal pages */}
//         <div className="hidden flex items-center gap-3">
//           <button
//             type="button"
//             onClick={() => setIsActive(!isActive)}
//             className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isActive ? 'bg-secondary' : 'bg-gray-300'}`}
//           >
//             <span
//               className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isActive ? 'translate-x-6' : 'translate-x-1'}`}
//             />
//           </button>
//           <span className="text-sm text-gray-700">
//             {isActive ? 'Page is visible on website' : 'Page is hidden from website'}
//           </span>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
//           <button
//             onClick={handleSave}
//             disabled={saving}
//             className="flex items-center justify-center gap-2 px-6 py-2.5 bg-secondary hover:bg-secondary-dark text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {saving ? (
//               <>
//                 <Loader2 size={18} className="animate-spin" />
//                 Saving...
//               </>
//             ) : (
//               <>
//                 <Save size={18} />
//                 Save Changes
//               </>
//             )}
//           </button>
//           {/* Reset button - Hidden for legal pages */}
//           <button
//             onClick={handleReset}
//             disabled={saving}
//             className="hidden flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <RefreshCw size={18} />
//             Reset
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LegalPageEditor;


import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, Save, RefreshCw } from 'lucide-react';
import { pagesAPI } from '../../services/api';
import { legalStaticData } from '../../data/legalStaticData';
import RichTextEditor from '../components/RichTextEditor';

const LegalPageEditor = () => {
  const { pageType } = useParams();
  const pageId = pageType === 'terms-of-service' ? 'terms-of-service' : 'privacy-policy';
  const staticData = legalStaticData[pageId];

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fromApi, setFromApi] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ type: '', message: '' });

  // Form state - initialize with static data to avoid empty states
  const [title, setTitle] = useState(staticData?.title || '');
  const [subtitle, setSubtitle] = useState(staticData?.subtitle || '');
  const [content, setContent] = useState(staticData?.content || '');
  const [lastUpdated, setLastUpdated] = useState(staticData?.lastUpdated || '');
  const [isActive, setIsActive] = useState(true);

  // Fetch page data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await pagesAPI.getPage(pageId);
        if (response.success && response.data) {
          const pageData = response.data;
          setData(pageData);
          setFromApi(true);
          setTitle(pageData.title || staticData?.title || '');
          setSubtitle(pageData.subtitle || staticData?.subtitle || '');
          setContent(pageData.content || staticData?.content || '');
          setLastUpdated(pageData.lastUpdated || staticData?.lastUpdated || '');
          setIsActive(pageData.isActive !== false);
        }
      } catch (error) {
        // Page doesn't exist in database - use static fallback
        console.log('Using static fallback for', pageId);
        setFromApi(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [pageId]);

  // Handle save
  const handleSave = async () => {
    setSaving(true);
    setSaveStatus({ type: '', message: '' });

    try {
      const pageData = {
        pageId,
        title,
        subtitle,
        content,
        lastUpdated: new Date().toISOString().split('T')[0],
        isActive,
        sections: []
      };

      const response = await pagesAPI.savePage(pageId, pageData);

      if (response.success) {
        setSaveStatus({ type: 'success', message: 'Page saved successfully!' });
        setData(pageData);
        setFromApi(true);
        setLastUpdated(pageData.lastUpdated);
        setTimeout(() => setSaveStatus({ type: '', message: '' }), 3000);
      } else {
        throw new Error(response.message || 'Failed to save page');
      }
    } catch (error) {
      console.error('Error saving legal page:', error);
      setSaveStatus({ type: 'error', message: 'Failed to save page. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  // Handle reset
  const handleReset = () => {
    if (data) {
      setTitle(data.title || staticData?.title || '');
      setSubtitle(data.subtitle || staticData?.subtitle || '');
      setContent(data.content || staticData?.content || '');
      setLastUpdated(data.lastUpdated || staticData?.lastUpdated || '');
      setIsActive(data.isActive !== false);
    } else {
      setTitle(staticData?.title || '');
      setSubtitle(staticData?.subtitle || '');
      setContent(staticData?.content || '');
      setLastUpdated(staticData?.lastUpdated || '');
      setIsActive(staticData?.isActive !== false);
    }
    setSaveStatus({ type: '', message: '' });
  };

  // Page display name
  const pageDisplayName = pageId === 'privacy-policy' ? 'Privacy Policy' : 'Terms of Service';

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={40} className="animate-spin text-secondary" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 px-3 sm:px-0">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-primary">{pageDisplayName}</h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Edit the {pageDisplayName.toLowerCase()} content displayed on the public website
          </p>
        </div>
        {fromApi && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm w-fit">
            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
            Connected to API
          </div>
        )}
      </div>

      {/* Status Message */}
      {saveStatus.message && (
        <div
          className={`p-3 sm:p-4 rounded-lg text-sm ${
            saveStatus.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {saveStatus.message}
        </div>
      )}

      {/* Editor Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
            Page Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none text-sm sm:text-base"
            placeholder={staticData?.title || 'Page Title'}
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
            Subtitle <span className="font-normal text-gray-400">(Optional)</span>
          </label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none text-sm sm:text-base"
            placeholder="Your privacy is important to us"
          />
        </div>

        {/* Content - Rich Text Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
            Page Content
          </label>
          {/* RichTextEditor should handle its own internal responsiveness;
              wrapping in min-w-0 prevents it from overflowing on small screens */}
          <div className="min-w-0">
            <RichTextEditor
              value={content}
              onChange={setContent}
              placeholder="Enter your content here..."
            />
          </div>
        </div>

        {/* Last Updated */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
            Last Updated Date
          </label>
          <input
            type="date"
            value={lastUpdated}
            onChange={(e) => setLastUpdated(e.target.value)}
            className="w-full sm:w-auto px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none text-sm sm:text-base"
          />
          <p className="text-xs text-gray-500 mt-1">
            Auto-updated on save, but can be manually set
          </p>
        </div>

        {/* Active Toggle - Hidden for legal pages */}
        <div className="hidden flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsActive(!isActive)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isActive ? 'bg-secondary' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isActive ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className="text-sm text-gray-700">
            {isActive ? 'Page is visible on website' : 'Page is hidden from website'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-secondary hover:bg-secondary-dark text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </button>
          {/* Reset button - Hidden for legal pages */}
          <button
            onClick={handleReset}
            disabled={saving}
            className="hidden w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            <RefreshCw size={16} />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalPageEditor;