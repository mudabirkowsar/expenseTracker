import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';

function Login() {
    const [loginData, setLoginData] = useState({
        loginEmail: '',
        loginPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const nav = useNavigate();

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        axios.post(SummaryApi.LoginUser.url, loginData)
            .then((res) => {
                if (res.data.success) {
                    sessionStorage.setItem('user', res.data.tok);
                    sessionStorage.setItem('userId', res.data.data._id);
                    toast(res.data.message);
                    nav("/dashboard");
                }
            })
            .catch(err => {
                toast(err.response.data.message);
            });
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLoginSubmit}>
                <h2>Welcome Back 👋</h2>
                <p className="login-subtitle">Login to continue</p>

                <div className="form-group">
                    <label htmlFor="loginEmail">Email</label>
                    <input
                        type="email"
                        id="loginEmail"
                        name="loginEmail"
                        placeholder="Enter your email"
                        value={loginData.loginEmail}
                        onChange={handleLoginChange}
                        required
                    />
                </div>

                <div className="form-group password-group">
                    <label htmlFor="loginPassword">Password</label>
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="loginPassword"
                            name="loginPassword"
                            placeholder="Enter your password"
                            value={loginData.loginPassword}
                            onChange={handleLoginChange}
                            required
                        />
                        <span 
                            className="password-toggle" 
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>

                <button type="submit" className="login-btn">Login</button>
                <p className="register-link">
                    Don&apos;t have an account? <Link to="/signup">Register here</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
