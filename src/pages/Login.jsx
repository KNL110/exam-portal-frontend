import { useState } from 'react';
import '../login.css';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {

    const role = sessionStorage.getItem("selectedRole");

    const endpoint = (role === "candidate")
        ? "http://localhost:3000/api/v1/candidate/login"
        : "http://localhost:3000/api/v1/professor/login";

    const [formData, setFormData] = useState({
        identifier: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('accessToken', data.data.accessToken);

            alert('Login successful!');

            if (role === "candidate") {
                navigate("/student");
            } else if (role === "professor") {
                navigate("/professor");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="login-container">
            <div className="login-wrapper">
                <div className="login-card">
                    <div className="login-header">
                        <h1 className="login-title">Welcome Back</h1>
                        <p className="login-subtitle">Sign in to your account</p>
                    </div>

                    <div className="login-form">
                        <div className="form-group">
                            <label htmlFor="identifier" className="form-label">
                                Email or Institute ID
                            </label>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    id="identifier"
                                    name="identifier"
                                    value={formData.identifier}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    placeholder="Enter your email or Institute ID"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <div className="input-wrapper">
                                <input
                                    type='password'
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="submit-btn"
                        >
                            {isLoading ? (
                                <div className="loading-content">
                                    <div className="spinner"></div>
                                    Signing in...
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}