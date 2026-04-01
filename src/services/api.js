import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://care-ed-back.onrender.com/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // Server responded with error
      const message = error.response.data?.error || error.response.data?.message || 'Server error';

      // Handle authentication errors
      if (error.response.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        // Only redirect if not already on login page
        if (window.location.pathname !== '/admin/login') {
          window.location.href = '/admin/login';
        }
      }

      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Request made but no response
      return Promise.reject(new Error('Network error. Please check your connection.'));
    } else {
      // Something else happened
      return Promise.reject(new Error(error.message || 'An unexpected error occurred'));
    }
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/password', data),
  logout: () => api.post('/auth/logout'),
  verifyToken: () => api.get('/auth/verify')
};

// Pages API
export const pagesAPI = {
  getPage: (pageId) => api.get(`/pages/${pageId}`),
  getAllPages: () => api.get('/pages'),
  getSection: (pageId, sectionId) => api.get(`/pages/${pageId}/sections/${sectionId}`),
  updateSection: (pageId, sectionId, data) => api.put(`/pages/${pageId}/sections/${sectionId}`, data),
  createPage: (data) => api.post('/pages', data),
  savePage: (pageId, data) => api.put(`/pages/${pageId}`, data),
  deletePage: (pageId) => api.delete(`/pages/${pageId}`),
  toggleSection: (pageId, sectionId) => api.patch(`/pages/${pageId}/sections/${sectionId}/toggle`),
  reorderSections: (pageId, sectionOrder) => api.put(`/pages/${pageId}/reorder`, { sectionOrder }),
  cleanupBlobUrls: () => api.post('/pages/cleanup-blobs')
};

// Media API
export const mediaAPI = {
  uploadImage: (formData) => {
    // Don't set Content-Type - let browser set it with correct boundary for FormData
    const token = localStorage.getItem('adminToken');
    return axios.post(
      `${import.meta.env.VITE_API_URL || 'https://care-ed-back.onrender.com/api'}/media/upload/image`,
      formData,
      {
        timeout: 60000, // 60 seconds for uploads
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
          // Don't set Content-Type for FormData - browser will set it automatically
        }
      }
    ).then(res => res.data);
  },
  uploadIcon: (formData) => {
    const token = localStorage.getItem('adminToken');
    return axios.post(
      `${import.meta.env.VITE_API_URL || 'https://care-ed-back.onrender.com/api'}/media/upload/icon`,
      formData,
      {
        timeout: 60000,
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      }
    ).then(res => res.data);
  },
  getMedia: (params) => api.get('/media', { params }),
  getMediaById: (id) => api.get(`/media/${id}`),
  updateMedia: (id, data) => api.put(`/media/${id}`, data),
  deleteMedia: (id) => api.delete(`/media/${id}`),
  getStats: () => api.get('/media/stats')
};

// Contact API
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getAll: (params) => api.get('/contact', { params }),
  getById: (id) => api.get(`/contact/${id}`),
  updateStatus: (id, status) => api.put(`/contact/${id}/status`, { status }),
  addNote: (id, note) => api.post(`/contact/${id}/notes`, { note }),
  deleteContact: (id) => api.delete(`/contact/${id}`),
  getStats: () => api.get('/contact/stats')
};

export default api;