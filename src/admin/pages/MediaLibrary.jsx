import { useState, useEffect, useRef } from 'react';
import {
  Image as ImageIcon,
  Upload,
  Search,
  Trash2,
  Grid,
  List,
  RefreshCw,
  X,
  Check
} from 'lucide-react';
import { mediaAPI } from '../../services/api';

const MediaLibrary = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('grid'); // grid or list
  const [search, setSearch] = useState('');
  const [folder, setFolder] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchMedia();
  }, [folder]);

  const fetchMedia = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = { page: 1, limit: 50 };
      if (folder) params.folder = folder;
      if (search) params.search = search;

      const response = await mediaAPI.getMedia(params);

      if (response.success) {
        setMedia(response.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load media');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMedia();
  };

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('alt', file.name.split('.')[0]);

        await mediaAPI.uploadImage(formData);
      }

      fetchMedia();
    } catch (err) {
      setError(err.message || 'Failed to upload files');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this file?')) {
      return;
    }

    try {
      await mediaAPI.deleteMedia(id);
      setMedia(media.filter((m) => m._id !== id));
      if (selectedMedia?._id === id) {
        setSelectedMedia(null);
      }
    } catch (err) {
      setError(err.message || 'Failed to delete file');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'N/A';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-primary">Media Library</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary-dark text-white rounded-lg disabled:opacity-70"
          >
            {uploading ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload size={18} />
                Upload Files
              </>
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search files..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none"
              />
            </div>
          </form>
          <select
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none"
          >
            <option value="">All Folders</option>
            <option value="images">Images</option>
            <option value="icons">Icons</option>
            <option value="misc">Misc</option>
          </select>
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setView('grid')}
              className={`p-2 ${view === 'grid' ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'}`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 ${view === 'list' ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'}`}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Media grid/list */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <RefreshCw size={32} className="animate-spin text-primary" />
        </div>
      ) : media.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No media files found</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-4 text-secondary hover:underline"
          >
            Upload your first file
          </button>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {media.map((item) => (
            <div
              key={item._id}
              className={`group relative bg-white rounded-lg border-2 overflow-hidden cursor-pointer transition-all ${
                selectedMedia?._id === item._id
                  ? 'border-secondary'
                  : 'border-gray-200 hover:border-secondary/50'
              }`}
              onClick={() => setSelectedMedia(item)}
            >
              <div className="aspect-square relative">
                {item.url ? (
                  <img
                    src={item.url}
                    alt={item.alt || item.filename}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <ImageIcon size={32} className="text-gray-400" />
                  </div>
                )}
                {selectedMedia?._id === item._id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                    <Check size={14} className="text-white" />
                  </div>
                )}
              </div>
              <div className="p-2">
                <p className="text-xs truncate text-gray-600">{item.filename}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item._id);
                }}
                className="absolute top-2 left-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Preview</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Filename</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Folder</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Size</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Date</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {media.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden">
                      {item.url ? (
                        <img
                          src={item.url}
                          alt={item.alt || ''}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon size={16} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 truncate max-w-xs">
                    {item.filename}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 capitalize">{item.folder}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{formatFileSize(item.size)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{formatDate(item.createdAt)}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 hover:bg-red-50 rounded text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Selected media details */}
      {selectedMedia && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-primary mb-4">Selected File</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              {selectedMedia.url ? (
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.alt || ''}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon size={48} className="text-gray-400" />
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">URL</label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    readOnly
                    value={selectedMedia.url}
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded text-sm"
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(selectedMedia.url)}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500">Alt Text</label>
                <input
                  type="text"
                  value={selectedMedia.alt || ''}
                  onChange={(e) =>
                    setSelectedMedia({ ...selectedMedia, alt: e.target.value })
                  }
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-secondary focus:border-secondary outline-none"
                  placeholder="Enter alt text..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Folder</label>
                  <p className="text-gray-900 capitalize">{selectedMedia.folder}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Size</label>
                  <p className="text-gray-900">{formatFileSize(selectedMedia.size)}</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500">Dimensions</label>
                <p className="text-gray-900">
                  {selectedMedia.width && selectedMedia.height
                    ? `${selectedMedia.width} × ${selectedMedia.height}`
                    : 'N/A'}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Uploaded</label>
                <p className="text-gray-900">{formatDate(selectedMedia.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;