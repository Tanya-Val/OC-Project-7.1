import React from 'react'
import logo from '../images/logo_white.png';
import './Signup'

export default function LoginSignupPage() {
    return (
        <div>
            {/* Navbar */}
            <nav className="LoginSignup--Nav">
                <img className="Login--Nav--Logo" src={logo} alt="company logo"/>
            </nav>

            {/* Main container */}
            <div className="LoginSignup--Main">
                <div className="titles">
                    <h1>CONNECT-E</h1>
                </div>

                <div className="login-registration-block">
                    <form>
                        <div className="form-group">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                required/>
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                required/>
                        </div>
                        <div className="form-group_btn">
                            <button // onclick="location.href='forum.html'"
                                type="submit" className="btn-login">Login</button>

                            <a href='/signup'>
                                <button type="button" className="btn-account">Create Account
                                </button>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}