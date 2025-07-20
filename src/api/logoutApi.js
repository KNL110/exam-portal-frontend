export async function logoutApi(role, navigate) {
    try {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            localStorage.removeItem('accessToken');
            sessionStorage.clear();
            navigate("/");
            return;
        }

        const logoutEndpoint = role === 'candidate'
            ? '/api/v1/candidate/logout'
            : '/api/v1/professor/logout';


        const response = await fetch(logoutEndpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Logout failed:', data.message);
        }
        localStorage.clear();
        console.log('Logout successful:', data.message);

    } catch (error) {
        console.error('Logout error:', error.message);
    } finally {
        localStorage.removeItem('accessToken');
        sessionStorage.clear();
        localStorage.removeItem('selectedRole');
        sessionStorage.removeItem('selectedRole');
        navigate("/");
    }
}