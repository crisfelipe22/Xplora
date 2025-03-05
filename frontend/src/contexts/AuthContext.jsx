import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Create the context
export const AuthContext = createContext(null);

// Create a custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    const verifyToken = async () => {
      if (token) {
        try {
          // Try to make a request that requires authentication
          // Choose an endpoint that requires authentication and is safe to call
          const response = await axios.get('/api/auth/validate', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          // If the request succeeds, the token is valid
          setIsAuthenticated(true);
          setUser(storedUser ? JSON.parse(storedUser) : null);
          // navigate('/login');
        } catch (error) {
          // Token is invalid or expired
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsAuthenticated(false);
          setUser(null);
          navigate('/login');
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [navigate]);

  // Configure axios to always include the token
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      axios.interceptors.request.use(
        config => {
          config.headers['Authorization'] = `Bearer ${token}`;
          return config;
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  // Only render children when loading is complete
  if (isLoading) {
    return <div>Cargando...</div>; 
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};