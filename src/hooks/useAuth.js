import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getUserRole, clearAuthData } from '../utils/auth';

/**
 * Custom hook for authentication state management
 * @returns {object} - Auth state and methods
 */
export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = () => {
        setLoading(true);
        
        const authStatus = isAuthenticated();
        const role = getUserRole();
        
        setIsLoggedIn(authStatus);
        setUserRole(role);
        setLoading(false);
    };

    const logout = () => {
        clearAuthData();
        setIsLoggedIn(false);
        setUserRole(null);
        navigate('/');
    };

    const login = (role) => {
        setIsLoggedIn(true);
        setUserRole(role);
    };

    return {
        isLoggedIn,
        userRole,
        loading,
        checkAuthStatus,
        logout,
        login
    };
};

/**
 * Custom hook for protecting routes that require authentication
 * @param {string} requiredRole - Required role for the route ('candidate' or 'professor')
 * @returns {object} - Auth state and protection status
 */
export const useAuthProtection = (requiredRole) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const checkAuthorization = () => {
        setLoading(true);
        
        const authStatus = isAuthenticated();
        const userRole = getUserRole();
        
        if (!authStatus) {
            // User is not authenticated, redirect to login
            console.log('User not authenticated, redirecting to login');
            navigate('/login');
            setIsAuthorized(false);
        } else if (requiredRole && userRole !== requiredRole) {
            // User is authenticated but doesn't have required role
            console.log(`User role ${userRole} doesn't match required role ${requiredRole}`);
            navigate('/');
            setIsAuthorized(false);
        } else {
            // User is authenticated and has correct role
            setIsAuthorized(true);
        }
        
        setLoading(false);
    };

    useEffect(() => {
        checkAuthorization();
    }, [requiredRole]); // eslint-disable-line react-hooks/exhaustive-deps

    return {
        isAuthorized,
        loading,
        checkAuthorization
    };
};
