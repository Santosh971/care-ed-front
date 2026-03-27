import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if admin is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      const savedAdmin = localStorage.getItem('adminUser');

      if (token && savedAdmin) {
        try {
          // Verify token with API
          const response = await authAPI.verifyToken();

          if (response.success && response.data?.admin) {
            setAdmin(response.data.admin);
          } else {
            // Token invalid, clear storage
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
          }
        } catch (err) {
          // Token invalid or expired
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.login({ email, password });

      if (response.success && response.data?.token) {
        // Store token and admin info
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminUser', JSON.stringify(response.data.admin));

        setAdmin(response.data.admin);
        setLoading(false);

        return { success: true };
      } else {
        throw new Error(response.error || 'Login failed');
      }
    } catch (err) {
      setLoading(false);
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    setLoading(true);

    try {
      await authAPI.logout();
    } catch (err) {
      // Ignore logout errors
    } finally {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      setAdmin(null);
      setLoading(false);
    }
  }, []);

  // Update profile function
  const updateProfile = useCallback(async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.updateProfile(data);

      if (response.success && response.data) {
        setAdmin(response.data);
        localStorage.setItem('adminUser', JSON.stringify(response.data));
        setLoading(false);
        return { success: true };
      } else {
        throw new Error(response.error || 'Update failed');
      }
    } catch (err) {
      setLoading(false);
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  // Change password function
  const changePassword = useCallback(async (currentPassword, newPassword) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.changePassword({
        currentPassword,
        newPassword
      });

      setLoading(false);

      if (response.success) {
        return { success: true };
      } else {
        throw new Error(response.error || 'Password change failed');
      }
    } catch (err) {
      setLoading(false);
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    admin,
    loading,
    error,
    isAuthenticated: !!admin,
    login,
    logout,
    updateProfile,
    changePassword,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;