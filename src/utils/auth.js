// Authentication utility functions

/**
 * Check if user is authenticated by verifying access token
 * @returns {boolean} - true if authenticated, false otherwise
 */
export const isAuthenticated = () => {
    const token = localStorage.getItem('accessToken');
    return token !== null && token !== undefined && token.trim() !== '';
};

/**
 * Get the current user's role from session storage
 * @returns {string|null} - 'candidate' or 'professor' or null
 */
export const getUserRole = () => {
    return sessionStorage.getItem('selectedRole');
};

/**
 * Set user role in session storage
 * @param {string} role - 'candidate' or 'professor'
 */
export const setUserRole = (role) => {
    sessionStorage.setItem('selectedRole', role);
};

/**
 * Get access token from localStorage
 * @returns {string|null} - access token or null
 */
export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

/**
 * Clear all authentication data
 */
export const clearAuthData = () => {
    localStorage.removeItem('accessToken');
    sessionStorage.removeItem('selectedRole');
    sessionStorage.clear();
};

/**
 * Get dashboard route based on role
 * @param {string} role - 'candidate' or 'professor'
 * @returns {string} - dashboard route path
 */
export const getDashboardRoute = (role) => {
    switch (role) {
        case 'candidate':
            return '/student';
        case 'professor':
            return '/professor';
        default:
            return '/login';
    }
};

/**
 * Check if user is authenticated and get appropriate redirect path
 * @param {string} role - 'candidate' or 'professor'
 * @returns {object} - { isAuth: boolean, redirectPath: string }
 */
export const getAuthRedirectInfo = (role) => {
    const isAuth = isAuthenticated();
    
    if (isAuth) {
        // User is authenticated, redirect to dashboard
        return {
            isAuth: true,
            redirectPath: getDashboardRoute(role)
        };
    } else {
        // User is not authenticated, redirect to login
        return {
            isAuth: false,
            redirectPath: '/login'
        };
    }
};
