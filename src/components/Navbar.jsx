import React from 'react';
import "./navbar.css";

export const Navbar = () => {
    return (
        <div class="header">
            <div class="header-content">
                <div class="logo">Goa Testing Agency</div>
                <div class="nav-buttons">
                    <button class="btn btn-primary" onclick="showLogin()">Register</button>
                </div>
            </div>
        </div>
    )
}
