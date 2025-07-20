import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutApi } from "../api/logoutApi";

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
        logoutApi(role,navigate);
        setIsLoading(false);
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
