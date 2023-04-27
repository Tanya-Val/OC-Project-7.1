import React from 'react'
import logo from '../assets/logo_white.png';

export default function PersonalSpacePage() {
    return (
        <div>
            {/* Navbar */}
            <nav className="LoginSignup--Nav">
                <img className="Login--Nav--Logo" src={logo} alt="company logo"/>
                <a href="">
                    <span class="material-symbols-outlined">
                    home</span>
                </a>
                <a href="">
                     <span class="material-symbols-outlined">
                    account_circle</span>
                </a>
                <a href="">
                    <span class="material-symbols-outlined">
                    logout</span>
                </a>
            </nav>

            {/* Main container */}
            <div className="LoginSignup--Main">
                <div className="login-registration-block">
                <h1 className="login-registration-block-title">Personal Space</h1>
                    <form>
                        <div className="form-group">
                            <input
                                type="firstName"
                                id="firstName"
                                name="firstName"
                                placeholder="First name"
                                required/>
                        </div>

                        <div className="form-group">
                            <input
                                type="lastName"
                                id="lastName"
                                name="lastName"
                                placeholder="Last name"
                                required/>
                        </div>

                        <div className="form-group">
                            <input
                                type="departament"
                                id="departament"
                                name="departament"
                                placeholder="Departament"
                                required/>
                        </div>

                        <div className="form-group">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                required/>
                        </div>
                    
                             <a href='/signup'>
                                <button className="btn-login" type="submit" >Save Changes</button>
                            </a>
                            <a href='/signup'>
                                <button className="btn-account" type="button">Delete Account
                                </button>
                            </a> 
                        
                    </form>
                </div>
            </div>
        </div>
    )
}