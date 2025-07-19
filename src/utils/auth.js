export const isAuthenticated = () => {
    const token = localStorage.getItem('accessToken');
    return token !== null && token !== undefined && token.trim() !== '';
};

export const getUserRole = () => {
    return sessionStorage.getItem('selectedRole');
};

export const setUserRole = (role) => {
    sessionStorage.setItem('selectedRole', role);
};

export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

export const clearAuthData = () => {
    localStorage.removeItem('accessToken');
    sessionStorage.removeItem('selectedRole');
    sessionStorage.clear();
};

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

export const getAuthRedirectInfo = (role) => {
    const isAuth = isAuthenticated();
    
    if (isAuth) {
        return {
            isAuth: true,
            redirectPath: getDashboardRoute(role)
        };
    } else {
        return {
            isAuth: false,
            redirectPath: '/login'
        };
    }
};
