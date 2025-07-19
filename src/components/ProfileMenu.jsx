import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProfileMenu = ({role}) => {
    const [showMenu, setShowMenu] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleProfile = () => {
        navigate("/profile");
        setShowMenu(false);
    };

    const handleLogout = async () => {
        setIsLoading(true);
        
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
            
            console.log('Logout successful:', data.message);
            
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('accessToken');
            sessionStorage.clear();
            localStorage.removeItem('selectedRole');
            sessionStorage.removeItem('selectedRole');
            setIsLoading(false);
            navigate("/");
        }
    };

    return (
        <div style={{ position: "relative" }}>
            <img
                src="/DefaultPFP.jpg"
                alt="Profile"
                style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    cursor: "pointer"
                }}
                onClick={() => setShowMenu(!showMenu)}
            />

            {showMenu && (
                <div
                    style={{
                        position: "absolute",
                        top: "50px",
                        right: "0",
                        background: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                        zIndex: 999
                    }}
                >
                    <button
                        style={dropdownItemStyle}
                        onClick={handleProfile}
                    >
                        Profile
                    </button>
                    <button
                        style={{
                            ...dropdownItemStyle,
                            opacity: isLoading ? 0.6 : 1,
                            cursor: isLoading ? 'not-allowed' : 'pointer'
                        }}
                        onClick={handleLogout}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging out...' : 'Logout'}
                    </button>
                </div>
            )}
        </div>
    );
};

const dropdownItemStyle = {
    display: "block",
    width: "100%",
    padding: "10px 15px",
    textAlign: "left",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#333",
    fontSize: "14px",
    transition: "background-color 0.2s ease"
};

export default ProfileMenu;
