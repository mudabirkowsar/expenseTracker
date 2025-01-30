import React from 'react'
import "./LoginNow.css"

function LoginNow() {
    return (
        <div className="mainBody">
            <div className="login-page-container">
                <div className="login-message-box">
                    <h1 className="login-heading">Access Denied</h1>
                    <p className="login-description">You are not logged in. Please log in to continue.</p>
                    {/* <a href="/" className="login-button">Login</a> */}
                </div>
            </div>
        </div>
    )
}

export default LoginNow