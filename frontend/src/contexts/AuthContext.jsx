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
  const [currentToken, setCurrentToken] = useState(localStorage.getItem('token'));
  const [interceptorId, setInterceptorId] = useState(null);  // 🔥 Store interceptor ID
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const response = await axios.get('/api/auth/validate', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          // Validation successful
          const userData = JSON.parse(localStorage.getItem('user') || '{}');
          setUser(userData);
          setUserRole(response.data.role);
          setIsAuthenticated(true);
          setCurrentToken(token); // Ensure token state is in sync
          
        } catch (error) {
          // Token invalid
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          setUserRole(null);
          setIsAuthenticated(false);
          setCurrentToken(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsAuthenticated(false);
        setCurrentToken(null);
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [navigate]);

  // Remove the separate setupInterceptor function and consolidate logic
// into a single useEffect

useEffect(() => {
  // Remove previous interceptor if it exists
  if (interceptorId !== null) {
    // console.log("Removing previous interceptor:", interceptorId);
    axios.interceptors.request.eject(interceptorId);
    setInterceptorId(null);
  }
  
  // Only set up a new interceptor if we have a token
  if (currentToken) {
    // console.log("Setting up interceptor with token:", currentToken);
    const newInterceptor = axios.interceptors.request.use(
      config => {
        if (!config.url?.includes("imgbb.com")) {
          config.headers['Authorization'] = `Bearer ${currentToken}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    
    setInterceptorId(newInterceptor);
  }
}, [currentToken]); // Only re-run when the token changes


  const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setUserRole("ROLE_" + userData.rol);
    setIsAuthenticated(true);
    setCurrentToken(token); // Update token state to trigger interceptor update
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
    setCurrentToken(null); // Clear token state to trigger interceptor removal
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
      isLoading,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};