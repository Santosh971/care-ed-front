


import { useState, useEffect } from 'react';
import { Save, Loader2, Upload, Trash2, Building2, Globe, Image as ImageIcon, RefreshCw, AlertTriangle, Navigation } from 'lucide-react';
import { pagesAPI, mediaAPI } from '../../services/api';

const GlobalSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cleanupLoading, setCleanupLoading] = useState(false);
  const [cleanupResult, setCleanupResult] = useState(null);
  const [settings, setSettings] = useState({
    siteName: 'Care-Ed Learning Center',
    siteDescription: 'Professional healthcare education and training in New Brunswick.',
    logo: null,
    logoLight: null,
    favicon: null,
    contactEmail: 'info@carelearning.ca',
    contactPhone: '(506) 634-8906',
    tollFree: '1(800) 561-2463',
    address: '100 Prince Edward St Unit #111, Saint John, NB E2L 4M5',
    tagline: 'Professional Healthcare Training Since 1987',
    socialLinks: {
      facebook: '',
      linkedin: '',
      twitter: '',
      instagram: ''
    },
    // New contact section fields
    phoneLink: 'tel:+15066348906',
    emailSecondary: 'train@seniorwatch.com',
    contactPersonName: 'Heidi',
    addressStreet: '100 Prince Edward St Unit #111',
    addressCity: 'Saint John',
    addressProvince: 'NB',
    addressPostalCode: 'E2L 4M5',
    serviceAreas: ['Saint John', 'Quispamsis', 'Rothesay', 'Grand Bay-Westfield']
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [activeTab, setActiveTab] = useState('branding');

  // Load settings from global page data
  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);

      try {
        const response = await pagesAPI.getPage('global');
        if (response.success && response.data) {
          const globalSections = response.data.sections || {};
          const brandingSection = globalSections.branding?.content || {};
          const contactSection = globalSections.contact?.content || {};

          setSettings(prev => ({
            ...prev,
            siteName: brandingSection.siteName || globalSections.footer?.content?.companyInfo?.name || prev.siteName,
            siteDescription: globalSections.footer?.content?.companyInfo?.description || prev.siteDescription,
            address: globalSections.footer?.content?.companyInfo?.address || prev.address,
            contactPhone: globalSections.navbar?.content?.contactInfo?.phone || contactSection.phone || prev.contactPhone,
            contactEmail: globalSections.navbar?.content?.contactInfo?.email || contactSection.email || prev.contactEmail,
            tagline: globalSections.navbar?.content?.tagline || prev.tagline,
            logo: brandingSection.logo?.url ? {
              url: brandingSection.logo.url,
              publicId: brandingSection.logo.publicId,
              alt: brandingSection.logo.alt || 'Logo'
            } : null,
            logoLight: brandingSection.logoLight?.url ? {
              url: brandingSection.logoLight.url,
              publicId: brandingSection.logoLight.publicId,
              alt: brandingSection.logoLight.alt || 'Logo Light'
            } : null,
            favicon: brandingSection.favicon?.url ? {
              url: brandingSection.favicon.url,
              publicId: brandingSection.favicon.publicId
            } : null,
            socialLinks: {
              facebook: globalSections.footer?.content?.socialLinks?.[0]?.url || '',
              linkedin: globalSections.footer?.content?.socialLinks?.[1]?.url || '',
              twitter: '',
              instagram: ''
            },
            // Load contact section data
            phoneLink: contactSection.phoneLink || 'tel:+15066348906',
            tollFree: contactSection.tollFree || '1(800) 561-2463',
            emailSecondary: contactSection.emailSecondary || 'train@seniorwatch.com',
            contactPersonName: contactSection.contactPersonName || 'Heidi',
            addressStreet: contactSection.address?.street || '100 Prince Edward St Unit #111',
            addressCity: contactSection.address?.city || 'Saint John',
            addressProvince: contactSection.address?.province || 'NB',
            addressPostalCode: contactSection.address?.postalCode || 'E2L 4M5',
            serviceAreas: contactSection.serviceAreas || ['Saint John', 'Quispamsis', 'Rothesay', 'Grand Bay-Westfield']
          }));
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleImageUpload = async (file, field) => {
    if (!file) return;

    console.log('[GlobalSettings] Starting upload for field:', field);
    console.log('[GlobalSettings] File:', file.name, file.type, file.size);

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      alert(`Invalid file type: ${file.type}. Please upload an image file.`);
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert(`File size too large: ${(file.size / 1024 / 1024).toFixed(2)}MB. Maximum size is 10MB.`);
      return;
    }

    try {
      setHasChanges(true);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'branding');

      console.log('[GlobalSettings] Sending upload request...');
      const response = await mediaAPI.uploadImage(formData);
      console.log('[GlobalSettings] Upload response:', response);

      if (response && response.success && response.data?.url) {
        console.log('[GlobalSettings] Upload successful:', response.data.url);
        setSettings(prev => ({
          ...prev,
          [field]: {
            url: response.data.url,
            publicId: response.data.publicId,
            alt: file.name
          }
        }));
        setHasChanges(true);
      } else {
        const errorMsg = response?.error || response?.message || 'Upload failed - no URL returned';
        console.error('[GlobalSettings] Upload failed:', errorMsg);
        alert(`Upload failed: ${errorMsg}`);
      }
    } catch (err) {
      console.error('[GlobalSettings] Upload error:', err);
      console.error('[GlobalSettings] Error response:', err.response);
      let errorMessage = 'Failed to upload image. ';

      if (err.response) {
        // Server responded with error
        const errorData = err.response.data;
        console.error('[GlobalSettings] Error data:', errorData);

        if (errorData?.error) {
          errorMessage = errorData.error;
        } else if (errorData?.message) {
          errorMessage = errorData.message;
        } else if (errorData?.errors) {
          // Validation errors
          errorMessage = Object.values(errorData.errors).map(e => e.msg || e).join(', ');
        } else {
          errorMessage += err.message || 'Server error';
        }
      } else if (err.request) {
        // Network error - no response received
        errorMessage += 'Network error. Please check your connection and ensure the server is running.';
      } else {
        // Other error
        errorMessage += err.message || 'Unknown error';
      }

      alert(errorMessage);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Update branding section
      await pagesAPI.updateSection('global', 'branding', {
        content: {
          siteName: settings.siteName,
          logo: settings.logo ? {
            url: settings.logo.url,
            publicId: settings.logo.publicId,
            alt: settings.logo.alt || 'Logo'
          } : { url: '', publicId: '', alt: 'Logo' },
          logoLight: settings.logoLight ? {
            url: settings.logoLight.url,
            publicId: settings.logoLight.publicId,
            alt: settings.logoLight.alt || 'Logo Light'
          } : { url: '', publicId: '', alt: 'Logo Light' },
          favicon: settings.favicon ? {
            url: settings.favicon.url,
            publicId: settings.favicon.publicId
          } : { url: '', publicId: '' }
        },
        isActive: true
      });

      // Update navbar section
      await pagesAPI.updateSection('global', 'navbar', {
        content: {
          links: [
            { label: 'Home', path: '/' },
            { label: 'About', path: '/about' },
            { label: 'Programs', path: '/care-ed' },
            // { label: 'Services', path: '/services' },
            { label: 'Careers', path: '/careers' },
            { label: 'Contact', path: '/contact' }
          ],
          ctaButton: { text: 'Enroll Now', link: '/care-ed' },
          contactInfo: {
            phone: settings.contactPhone,
            email: settings.contactEmail
          },
          tagline: settings.tagline
        },
        isActive: true
      });

      // Update footer section
      await pagesAPI.updateSection('global', 'footer', {
        content: {
          companyInfo: {
            name: settings.siteName,
            description: settings.siteDescription,
            address: settings.address
          },
          quickLinks: [
            { label: 'Home', path: '/' },
            { label: 'About Us', path: '/about' },
            { label: 'Programs', path: '/care-ed' },
            { label: 'Careers', path: '/careers' },
            { label: 'Contact', path: '/contact' }
          ],
          programs: [
            { label: 'PWS Program Foundation', path: '/care-ed' },
            { label: 'Personal Support Worker Bootcamp', path: '/care-ed' },
            { label: 'First Aid/CPR', path: '/care-ed' },
            { label: 'Foot Care', path: '/care-ed' }
          ],

          socialLinks: [
            { platform: 'Facebook', url: settings.socialLinks.facebook },
            { platform: 'LinkedIn', url: settings.socialLinks.linkedin }
          ],
          copyright: `© ${new Date().getFullYear()} ${settings.siteName}. All rights reserved.`
        },
        isActive: true
      });

      // Update contact section (single source of truth for all contact info)
      await pagesAPI.updateSection('global', 'contact', {
        content: {
          phone: settings.contactPhone,
          phoneLink: settings.phoneLink,
          tollFree: settings.tollFree,
          email: settings.contactEmail,
          emailSecondary: settings.emailSecondary,
          contactPersonName: settings.contactPersonName,
          address: {
            street: settings.addressStreet,
            city: settings.addressCity,
            province: settings.addressProvince,
            postalCode: settings.addressPostalCode,
            full: `${settings.addressStreet}, ${settings.addressCity}, ${settings.addressProvince} ${settings.addressPostalCode}`
          },
          serviceAreas: settings.serviceAreas
        },
        isActive: true
      });

      setHasChanges(false);
      alert('Settings saved successfully!');
    } catch (err) {
      console.error('Save error:', err);
      alert('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Handle cleanup of blob URLs from database
  const handleCleanupBlobUrls = async () => {
    if (!window.confirm('This will scan all pages and remove invalid blob URLs from the database. This action cannot be undone. Continue?')) {
      return;
    }

    setCleanupLoading(true);
    setCleanupResult(null);

    try {
      const response = await pagesAPI.cleanupBlobUrls();

      if (response.success) {
        setCleanupResult({
          success: true,
          message: `Cleanup complete! ${response.data.blobUrlsRemoved} blob URL(s) removed from ${response.data.sectionsModified} section(s) across ${response.data.totalPages} page(s).`,
          data: response.data
        });
      } else {
        setCleanupResult({
          success: false,
          message: response.error || 'Cleanup failed'
        });
      }
    } catch (err) {
      console.error('Cleanup error:', err);
      setCleanupResult({
        success: false,
        message: err.message || 'Failed to cleanup blob URLs'
      });
    } finally {
      setCleanupLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 px-3 sm:px-0">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary">Global Settings</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Manage site-wide settings, branding, and content
          </p>
        </div>
        {/* Full-width tap target on mobile, auto-width on desktop */}
        <button
          onClick={handleSave}
          disabled={saving || !hasChanges}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-secondary hover:bg-secondary-dark text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
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
      </div>

      {/* ── Tabs — horizontally scrollable on mobile ────────────────────── */}
      {/* -mx-3 sm:mx-0 lets the scroll track bleed to the screen edges on mobile */}
      <div className="border-b border-gray-200 -mx-3 sm:mx-0 overflow-x-auto">
        <div className="flex gap-0 sm:gap-1 min-w-max px-3 sm:px-0">
          {[
            { id: 'branding', label: 'Branding', icon: Building2 },
            { id: 'navbar', label: 'Navbar', icon: Navigation },
            { id: 'contact', label: 'Contact', icon: Globe },
            { id: 'maintenance', label: 'Maintenance', icon: RefreshCw },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2.5 sm:py-2 border-b-2 transition-colors whitespace-nowrap text-xs sm:text-sm font-medium ${activeTab === tab.id
                ? 'border-secondary text-secondary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              <tab.icon size={15} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Branding Tab ────────────────────────────────────────────────── */}
      {activeTab === 'branding' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 space-y-5 sm:space-y-6">

          {/* Site name + description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Site Name
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => {
                  setSettings(prev => ({ ...prev, siteName: e.target.value }));
                  setHasChanges(true);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Site Description
              </label>
              <input
                type="text"
                value={settings.siteDescription}
                onChange={(e) => {
                  setSettings(prev => ({ ...prev, siteDescription: e.target.value }));
                  setHasChanges(true);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Logo upload — stacks on mobile, side-by-side from sm breakpoint */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">

            {/* Logo Dark */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo (Dark/Primary)
              </label>
              <div className="flex items-start gap-3">
                {settings.logo?.url ? (
                  <div className="relative flex-shrink-0">
                    <img
                      src={settings.logo.url}
                      alt="Logo"
                      className="h-16 sm:h-20 w-auto max-w-[160px] object-contain border border-gray-200 rounded-lg p-2 bg-white"
                    />
                    <button
                      onClick={() => {
                        setSettings(prev => ({ ...prev, logo: null }));
                        setHasChanges(true);
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ) : (
                  /* Stretches full-width on mobile, fixed 160px on sm+ */
                  <label className="flex flex-col items-center justify-center h-16 sm:h-20 w-full sm:w-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-secondary hover:bg-gray-50">
                    <Upload size={18} className="text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Upload Logo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files[0], 'logo')}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1.5">
                Recommended: 200x50px, PNG with transparent background
              </p>
            </div>

            {/* Logo Light */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo (Light/White)
              </label>
              <div className="flex items-start gap-3">
                {settings.logoLight?.url ? (
                  <div className="relative flex-shrink-0">
                    <img
                      src={settings.logoLight.url}
                      alt="Logo Light"
                      className="h-16 sm:h-20 w-auto max-w-[160px] object-contain border border-gray-200 rounded-lg p-2 bg-gray-800"
                    />
                    <button
                      onClick={() => {
                        setSettings(prev => ({ ...prev, logoLight: null }));
                        setHasChanges(true);
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-16 sm:h-20 w-full sm:w-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-secondary hover:bg-gray-50 bg-gray-800">
                    <Upload size={18} className="text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Upload Light Logo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files[0], 'logoLight')}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1.5">For dark backgrounds</p>
            </div>
          </div>

          {/* Favicon */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Favicon
            </label>
            <div className="flex items-start gap-4">
              {settings.favicon?.url ? (
                <div className="relative flex-shrink-0">
                  <img
                    src={settings.favicon.url}
                    alt="Favicon"
                    className="h-14 w-14 sm:h-16 sm:w-16 object-contain border border-gray-200 rounded-lg p-1 bg-white"
                  />
                  <button
                    onClick={() => {
                      setSettings(prev => ({ ...prev, favicon: null }));
                      setHasChanges(true);
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-14 w-14 sm:h-16 sm:w-16 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-secondary hover:bg-gray-50 flex-shrink-0">
                  <ImageIcon size={18} className="text-gray-400" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files[0], 'favicon')}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1.5">
              Recommended: 32x32px or 64x64px, ICO or PNG
            </p>
          </div>
        </div>
      )}

      {/* ── Navbar Tab ──────────────────────────────────────────────────── */}
      {activeTab === 'navbar' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 space-y-4">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Top Bar Settings</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              These settings appear in the top bar of the navigation header.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hidden - Phone Number field - data still saved */}
            <div hidden>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={settings.contactPhone}
                onChange={(e) => {
                  setSettings(prev => ({ ...prev, contactPhone: e.target.value }));
                  setHasChanges(true);
                }}
                placeholder="(506) 634-8906"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none text-sm sm:text-base"
              />
              <p className="text-xs text-gray-500 mt-1">Displayed in the top bar</p>
            </div>

            {/* Hidden - Email Address field - data still saved */}
            <div hidden>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => {
                  setSettings(prev => ({ ...prev, contactEmail: e.target.value }));
                  setHasChanges(true);
                }}
                placeholder="info@carelearning.ca"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none text-sm sm:text-base"
              />
              <p className="text-xs text-gray-500 mt-1">Displayed in the top bar</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tagline
            </label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => {
                setSettings(prev => ({ ...prev, tagline: e.target.value }));
                setHasChanges(true);
              }}
              placeholder="Professional Healthcare Training Since 1987"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none text-sm sm:text-base"
            />
            <p className="text-xs text-gray-500 mt-1">
              Short text displayed on the right side of the top bar
            </p>
          </div>
        </div>
      )}

      {/* ── Contact Info Tab ────────────────────────────────────────────── */}
      {activeTab === 'contact' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 space-y-6">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Contact Information</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              These settings are used across the entire site (navbar, footer, contact page, careers page, etc.)
            </p>
          </div>

          {/* Primary Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700 border-b pb-2">Primary Contact</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number (Display)
                </label>
                <input
                  type="text"
                  value={settings.contactPhone}
                  onChange={(e) => {
                    setSettings(prev => ({ ...prev, contactPhone: e.target.value }));
                    setHasChanges(true);
                  }}
                  placeholder="(506) 634-8906"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none text-sm sm:text-base"
                />
                <p className="text-xs text-gray-500 mt-1">Displayed in navbar, footer, etc.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Toll-Free Number
                </label>
                <input
                  type="text"
                  value={settings.tollFree || ''}
                  onChange={(e) => {
                    setSettings(prev => ({ ...prev, tollFree: e.target.value }));
                    setHasChanges(true);
                  }}
                  placeholder="1(800) 561-2463"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none text-sm sm:text-base"
                />
                <p className="text-xs text-gray-500 mt-1">Toll-free contact number</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Link (tel:)
                </label>
                <input
                  type="text"
                  value={settings.phoneLink}
                  onChange={(e) => {
                    setSettings(prev => ({ ...prev, phoneLink: e.target.value }));
                    setHasChanges(true);
                  }}
                  placeholder="tel:+15066348906"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none text-sm sm:text-base"
                />
                <p className="text-xs text-gray-500 mt-1">The tel: link for clickable phone numbers</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Email
                </label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => {
                    setSettings(prev => ({ ...prev, contactEmail: e.target.value }));
                    setHasChanges(true);
                  }}
                  placeholder="info@carelearning.ca"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none text-sm sm:text-base"
                />
                <p className="text-xs text-gray-500 mt-1">Main contact email (navbar, footer)</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Email
                </label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => {
                    setSettings(prev => ({ ...prev, contactEmail: e.target.value }));
                    setHasChanges(true);
                  }}
                  placeholder="info@carelearning.ca"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none text-sm sm:text-base"
                />
                <p className="text-xs text-gray-500 mt-1">Main contact email (navbar, footer)</p>
              </div> */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Secondary/Training Email
                </label>
                <input
                  type="email"
                  value={settings.emailSecondary}
                  onChange={(e) => {
                    setSettings(prev => ({ ...prev, emailSecondary: e.target.value }));
                    setHasChanges(true);
                  }}
                  placeholder="train@seniorwatch.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none text-sm sm:text-base"
                />
                <p className="text-xs text-gray-500 mt-1">Used for training inquiries (careers page)</p>
              </div> */}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Person Name
              </label>
              <input
                type="text"
                value={settings.contactPersonName}
                onChange={(e) => {
                  setSettings(prev => ({ ...prev, contactPersonName: e.target.value }));
                  setHasChanges(true);
                }}
                placeholder="Heidi"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none text-sm sm:text-base"
              />
              <p className="text-xs text-gray-500 mt-1">Name of primary contact person</p>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700 border-b pb-2">Address</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={settings.addressStreet}
                  onChange={(e) => {
                    setSettings(prev => ({ ...prev, addressStreet: e.target.value }));
                    setHasChanges(true);
                  }}
                  placeholder="100 Prince Edward St Unit #111"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={settings.addressCity}
                  onChange={(e) => {
                    setSettings(prev => ({ ...prev, addressCity: e.target.value }));
                    setHasChanges(true);
                  }}
                  placeholder="Saint John"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Province
                </label>
                <input
                  type="text"
                  value={settings.addressProvince}
                  onChange={(e) => {
                    setSettings(prev => ({ ...prev, addressProvince: e.target.value }));
                    setHasChanges(true);
                  }}
                  placeholder="NB"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={settings.addressPostalCode}
                  onChange={(e) => {
                    setSettings(prev => ({ ...prev, addressPostalCode: e.target.value }));
                    setHasChanges(true);
                  }}
                  placeholder="E2L 4M5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none text-sm sm:text-base"
                />
              </div>
            </div>
          </div>

          {/* Service Areas - HIDDEN */}
          <div className="space-y-4 hidden">
            <h4 className="text-sm font-medium text-gray-700 border-b pb-2">Service Areas</h4>
            <p className="text-xs sm:text-sm text-gray-500">
              Areas served (displayed on contact page and other locations)
            </p>
            <div className="space-y-2">
              {settings.serviceAreas.map((area, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => {
                      const newAreas = [...settings.serviceAreas];
                      newAreas[index] = e.target.value;
                      setSettings(prev => ({ ...prev, serviceAreas: newAreas }));
                      setHasChanges(true);
                    }}
                    placeholder="Enter area name"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none text-sm sm:text-base"
                  />
                  <button
                    onClick={() => {
                      const newAreas = settings.serviceAreas.filter((_, i) => i !== index);
                      setSettings(prev => ({ ...prev, serviceAreas: newAreas }));
                      setHasChanges(true);
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    title="Remove area"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  setSettings(prev => ({ ...prev, serviceAreas: [...prev.serviceAreas, ''] }));
                  setHasChanges(true);
                }}
                className="flex items-center gap-2 px-4 py-2 text-secondary hover:bg-secondary/10 rounded-lg text-sm font-medium"
              >
                + Add Service Area
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Social Links Tab ────────────────────────────────────────────── */}
      {/* {activeTab === 'social' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { key: 'facebook', label: 'Facebook URL', placeholder: 'https://facebook.com/careed' },
              { key: 'linkedin', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/company/careed' },
              { key: 'twitter', label: 'Twitter URL', placeholder: 'https://twitter.com/careed' },
              { key: 'instagram', label: 'Instagram URL', placeholder: 'https://instagram.com/careed' },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                </label>
                <input
                  type="url"
                  value={settings.socialLinks[key]}
                  onChange={(e) => {
                    setSettings(prev => ({
                      ...prev,
                      socialLinks: { ...prev.socialLinks, [key]: e.target.value }
                    }));
                    setHasChanges(true);
                  }}
                  placeholder={placeholder}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none text-sm sm:text-base"
                />
              </div>
            ))}
          </div>
        </div>
      )} */}

      {/* ── Maintenance Tab ─────────────────────────────────────────────── */}
      {activeTab === 'maintenance' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 space-y-5 sm:space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Database Maintenance</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Clean up invalid image URLs from the database. This removes blob URLs that may have been saved incorrectly.
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
            <div className="flex items-start gap-3">
              {/* flex-shrink-0 stops the icon from squishing under the text on narrow screens */}
              <AlertTriangle className="text-yellow-600 mt-0.5 flex-shrink-0" size={18} />
              <div>
                <h4 className="font-medium text-yellow-800 text-sm sm:text-base">What this does</h4>
                <p className="text-xs sm:text-sm text-yellow-700 mt-1">
                  Scans all pages and sections for invalid image URLs (blob:, data:, file:) and removes them.
                  These URLs are temporary browser URLs that cannot be loaded by other users.
                </p>
              </div>
            </div>
          </div>

          {/* Full-width tap target on mobile */}
          <button
            onClick={handleCleanupBlobUrls}
            disabled={cleanupLoading}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {cleanupLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Cleaning...
              </>
            ) : (
              <>
                <Trash2 size={16} />
                Clean Up Invalid URLs
              </>
            )}
          </button>

          {cleanupResult && (
            <div className={`p-3 sm:p-4 rounded-lg text-sm ${cleanupResult.success
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
              }`}>
              <p className={cleanupResult.success ? 'text-green-700' : 'text-red-700'}>
                {cleanupResult.message}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSettings;