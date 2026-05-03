import { useState, useEffect } from 'react';
import { Save, RefreshCw, Loader2, Upload, X, Image as ImageIcon } from 'lucide-react';
import { mediaAPI } from '../../services/api';

// Simple text input component
export const TextInput = ({ label, value, onChange, placeholder, type = 'text', required = false, hint }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      type={type}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none"
    />
    {hint && <p className="text-xs text-gray-500">{hint}</p>}
  </div>
);

// Textarea component
export const TextArea = ({ label, value, onChange, placeholder, rows = 4, hint }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none resize-none"
    />
    {hint && <p className="text-xs text-gray-500">{hint}</p>}
  </div>
);

// Toggle/Checkbox component
export const Toggle = ({ label, checked, onChange, hint }) => (
  <div className="flex items-center justify-between">
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-6 rounded-full transition-colors ${
        checked ? 'bg-secondary' : 'bg-gray-300'
      }`}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </button>
  </div>
);

// Select component
export const Select = ({ label, value, onChange, options, placeholder }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none"
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt, index) => (
        <option key={index} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

// Image uploader component with Cloudinary upload
export const ImageUpload = ({ label, value, onChange, hint, folder = 'images' }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);

  const handleFileChange = async (e) => {
    console.log('[ImageUpload] File input changed');
    console.log('[ImageUpload] Files:', e.target.files);

    const file = e.target.files[0];
    if (!file) {
      console.log('[ImageUpload] No file selected');
      return;
    }

    console.log('[ImageUpload] Selected file:', {
      name: file.name,
      type: file.type,
      size: `${(file.size / 1024).toFixed(2)} KB`
    });

    // Reset state
    setError(null);
    setDebugInfo(null);

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/avif'];
    if (!allowedTypes.includes(file.type)) {
      const errorMsg = `Invalid file type: ${file.type}. Please upload an image file (JPG, PNG, GIF, WebP, SVG)`;
      console.error('[ImageUpload]', errorMsg);
      setError(errorMsg);
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      const errorMsg = `File size too large: ${(file.size / 1024 / 1024).toFixed(2)}MB. Maximum size is 10MB`;
      console.error('[ImageUpload]', errorMsg);
      setError(errorMsg);
      return;
    }

    setUploading(true);
    setDebugInfo('Uploading...');

    try {
      console.log('[ImageUpload] Creating form data for:', file.name);

      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('alt', file.name.split('.')[0]);
      if (folder) {
        formData.append('folder', folder);
      }

      console.log('[ImageUpload] Sending request to server...');
      setDebugInfo('Sending to server...');

      // Upload to backend which uploads to Cloudinary
      const response = await mediaAPI.uploadImage(formData);

      console.log('[ImageUpload] Server response:', response);

      // Check for success
      if (response && response.success && response.data?.url) {
        console.log('[ImageUpload] Upload successful:', response.data.url);
        setDebugInfo('Upload complete!');
        onChange({
          url: response.data.url,
          publicId: response.data.publicId,
          alt: file.name.split('.')[0]
        });
      } else if (response && !response.success) {
        // API returned an error
        const errorMsg = response.error || response.message || 'Upload failed';
        console.error('[ImageUpload] Server returned error:', errorMsg);
        throw new Error(errorMsg);
      } else {
        console.error('[ImageUpload] Unexpected response format:', response);
        throw new Error('Upload failed - unexpected response format');
      }
    } catch (err) {
      console.error('[ImageUpload] Upload error:', err);

      // Extract error message
      let errorMessage = 'Failed to upload image. ';

      if (err.response) {
        // Axios error response
        console.error('[ImageUpload] Error response:', err.response);
        errorMessage += err.response.data?.error || err.response.data?.message || err.message;
      } else if (err.request) {
        // Network error
        console.error('[ImageUpload] Network error - no response received');
        errorMessage += 'Network error. Please check your connection and ensure the server is running.';
      } else {
        // Other error
        errorMessage += err.message || 'Unknown error';
      }

      setError(errorMessage);
      setDebugInfo('Error: ' + errorMessage);
    } finally {
      setUploading(false);
      // Clear file input
      e.target.value = '';
    }
  };

  const handleRemove = () => {
    onChange(null);
    setError(null);
    setDebugInfo(null);
  };

  // Get image URL - validate it's not a blob URL
  const getImageUrl = () => {
    const url = value?.url || value;

    // Don't use blob URLs - they're temporary and cause errors
    if (url && url.startsWith('blob:')) {
      console.warn('[ImageUpload] Invalid blob URL detected, clearing value');
      // Clear the invalid blob URL
      setTimeout(() => onChange(null), 0);
      return null;
    }

    return url;
  };

  const imageUrl = getImageUrl();

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {imageUrl ? (
        <div className="relative inline-block">
          <div className="w-48 h-32 border border-gray-300 rounded-lg overflow-hidden">
            <img
              src={imageUrl}
              alt={value?.alt || 'Image'}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow-md"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-48 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-secondary hover:bg-gray-50 transition-colors">
          {uploading ? (
            <>
              <Loader2 size={24} className="animate-spin text-gray-400" />
              <span className="mt-2 text-sm text-gray-500">{debugInfo || 'Uploading...'}</span>
            </>
          ) : (
            <>
              <Upload size={24} className="text-gray-400" />
              <span className="mt-2 text-sm text-gray-500">Click to upload</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={uploading}
            onClick={(e) => {
              console.log('[ImageUpload] Input clicked');
              // Reset the input so same file can be selected again
              e.target.value = null;
            }}
          />
        </label>
      )}

      {error && (
        <div className="p-2 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 font-medium">Upload Error</p>
          <p className="text-xs text-red-500">{error}</p>
        </div>
      )}
      {debugInfo && !error && !uploading && (
        <p className="text-xs text-blue-500">{debugInfo}</p>
      )}
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  );
};

// URL Input component for external images
export const URLInput = ({ label, value, onChange, hint }) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex gap-2">
        <input
          type="url"
          value={value?.url || value || ''}
          onChange={(e) => onChange({ url: e.target.value, alt: value?.alt })}
          placeholder="https://example.com/image.jpg"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none"
        />
        {value?.url && (
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            <ImageIcon size={18} />
          </button>
        )}
      </div>
      {showPreview && value?.url && (
        <div className="w-48 h-32 border border-gray-300 rounded-lg overflow-hidden">
          <img
            src={value.url}
            alt={value?.alt || 'Preview'}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  );
};

// Array/List editor for items
export const ArrayEditor = ({ label, items, onChange, renderItem, addItemLabel = 'Add Item', defaultItem = {} }) => {
  const handleAdd = () => {
    // Handle both string and object default items
    const newItem = typeof defaultItem === 'string' ? defaultItem : { ...defaultItem };
    onChange([...(items || []), newItem]);
  };

  const handleRemove = (index) => {
    const newItems = [...(items || [])];
    newItems.splice(index, 1);
    onChange(newItems);
  };

  const handleUpdate = (index, updatedItem) => {
    const newItems = [...(items || [])];
    newItems[index] = updatedItem;
    onChange(newItems);
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newItems = [...(items || [])];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    onChange(newItems);
  };

  const handleMoveDown = (index) => {
    if (index === (items || []).length - 1) return;
    const newItems = [...(items || [])];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    onChange(newItems);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="space-y-3">
        {(items || []).map((item, index) => (
          <div key={index} className="relative bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="absolute top-2 right-2 flex gap-1">
              <button
                type="button"
                onClick={() => handleMoveUp(index)}
                disabled={index === 0}
                className="w-6 h-6 bg-gray-200 text-gray-600 rounded flex items-center justify-center hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => handleMoveDown(index)}
                disabled={index === (items || []).length - 1}
                className="w-6 h-6 bg-gray-200 text-gray-600 rounded flex items-center justify-center hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="w-6 h-6 bg-red-500 text-white rounded flex items-center justify-center hover:bg-red-600"
              >
                <X size={12} />
              </button>
            </div>
            <div className="mt-4">
              {renderItem(item, (updated) => handleUpdate(index, updated), index)}
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={handleAdd}
        className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary-dark text-white rounded-lg text-sm transition-colors"
      >
        + {addItemLabel}
      </button>
    </div>
  );
};

// Button Editor component
export const ButtonEditor = ({ label, value, onChange }) => (
  <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="grid grid-cols-2 gap-3">
      <TextInput
        label="Button Text"
        value={value?.text}
        onChange={(val) => onChange({ ...value, text: val })}
        placeholder="Click here"
      />
      <TextInput
        label="Link URL"
        value={value?.link}
        onChange={(val) => onChange({ ...value, link: val })}
        placeholder="/page-url"
      />
    </div>
    <Select
      label="Style"
      value={value?.style || 'primary'}
      onChange={(val) => onChange({ ...value, style: val })}
      options={[
        { value: 'primary', label: 'Primary (Filled)' },
        { value: 'secondary', label: 'Secondary (Outline)' },
        { value: 'link', label: 'Link (Text only)' }
      ]}
    />
  </div>
);

// Main Section Editor component
const SectionEditor = ({
  sectionId,
  sectionName,
  data,
  onSave,
  renderFields,
  isLoading = false
}) => {
  const [formData, setFormData] = useState(data || {});
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Update form data when data prop changes
  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(sectionId, formData);
      setHasChanges(false);
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setFormData(data || {});
    setHasChanges(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-primary">{sectionName}</h3>
            <p className="text-sm text-gray-500">Section ID: {sectionId}</p>
          </div>
          <div className="flex items-center gap-2">
            {hasChanges && (
              <span className="text-sm text-orange-500">Unsaved changes</span>
            )}
            <button
              type="button"
              onClick={handleReset}
              disabled={!hasChanges || isSaving}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw size={16} />
              Reset
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary-dark text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 size={24} className="animate-spin text-primary" />
          </div>
        ) : (
          renderFields(formData, handleChange)
        )}
      </div>
    </div>
  );
};

export default SectionEditor;