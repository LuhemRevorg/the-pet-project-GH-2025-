import React from 'react';
import { useNavigate } from "react-router-dom";
import KUTTTABC from "../images/dogge.gif";
import '../styling/Home.css'; 
import IMG from "../images/family.jpeg";

function Home() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <div className="home">
            {/* Navbar */}
            <nav className="navbar">
                <div className="logo">🐾</div>
                <button className="login-button" onClick={handleLogin}>Login</button>
            </nav>
            
            {/* Main Content */}
            <div className="main-content">
                {/* Left Section */}
                <div className="left-section">
                    <header className="header">
                        <h1>Welcome to PawPal</h1>
                        <p>Your one-stop platform for all things pets. Connect, care, and celebrate your furry friends.</p>
                    </header>
                    {/* Roaming Dog GIF Animation */}
                    <div className="gif-container">
                        <img src={KUTTTABC} alt="Roaming Dog" className="gif" />
                    </div>
                    <section className="about">
                        <h2>Why Choose Us?</h2>
                        <p>
                            At Pet Haven, we understand the unique bond between pets and their humans. From adoption resources to pet care
                            tips, we've got you covered.
                        </p>
                    </section>
                </div>
 
                {/* Right Section */}
                <div className="right-section">
                    <div className="image-container">
                        <img src={IMG} alt="Landing-img" className="landing-img" />
                        <button className="get-started-button" onClick={handleLogin}>Get Started for Your Pet</button>
                    </div>
                </div>
            </div>

            <section className="features">
                <div className="feature-card">
                    <h3>Does your pet have an illness?</h3>
                    <p>Find your pets problems and save their lives!</p>
                </div>
                <div className="feature-card">
                    <h3>Pet tracking</h3>
                    <p>Get information on your pets, track their records</p>
                </div>
                <div className="feature-card">
                    <h3>Community</h3>
                    <p>Join a community of pet lovers and share your pet stories.</p>
                </div>
            </section>

            <footer className="footer">
                <p>© 2025 PawPal. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Home;
