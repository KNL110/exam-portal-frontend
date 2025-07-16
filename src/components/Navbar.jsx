import React from 'react';
// import "./navbar.css";

export const Navbar = () => {
    return (
        <div className="header">
            <div className="header-content">
                <div className="logo">Goa Testing Agency</div>
                <div className="nav-buttons">
                    <button className="btn btn-primary" onclick="showLogin()">Register</button>
                </div>
            </div>
        </div>
    )
}
