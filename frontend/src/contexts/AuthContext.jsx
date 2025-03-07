/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Create the context
export const AuthContext = createContext();

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
  const [interceptorId, setInterceptorId] = useState(null);  // 🔥 Store interceptor ID
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const verifyToken = async () => {
      if (token) {
        try {
          const response = await axios.get('/api/auth/validate', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

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

  // Remove the separate setupInterceptor function and consolidate logic
// into a single useEffect

useEffect(() => {
  const token = localStorage.getItem('token');
  
  // Remove previous interceptor if it exists
  if (interceptorId !== null) {
    console.log("Removing previous interceptor:", interceptorId);
    axios.interceptors.request.eject(interceptorId);
  }
  
  // Only set up a new interceptor if we have a token
  if (token) {
    console.log("Setting up interceptor with token:", token);
    const newInterceptor = axios.interceptors.request.use(
      config => {
        console.log("Intercepting request to:", config.url);
        if (!config.url?.includes("imgbb.com")) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        console.log("Interceptor error:", error);
        return Promise.reject(error);
      }
    );
    
    setInterceptorId(newInterceptor);
  }
  
  // No return cleanup needed as we're handling it at the beginning of the effect
}, [isAuthenticated]); // Only re-run when authentication status changes


  const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    if (interceptorId !== null) {
      console.log("Interceptor was unmounted!")
      axios.interceptors.request.eject(interceptorId);  // 🔥 Remove interceptor on logout
      setInterceptorId(null);
    }

    setUser(null);
    setIsAuthenticated(false);
  };

  // Only render children when loading is complete
  if (isLoading) {
    return <div>Cargando...</div>; 
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      userRole,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};