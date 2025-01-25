import React from 'react';
import { useNavigate } from "react-router-dom";
import '../styling/Home.css'; 

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
      <header className="header">
        <h1>Welcome to Pet Haven</h1>
        <p>Your one-stop platform for all things pets. Connect, care, and celebrate your furry friends.</p>
      </header>

      <section className="about">
        <h2>Why Choose Us?</h2>
        <p>
          At Pet Haven, we understand the unique bond between pets and their humans. From adoption resources to pet care
          tips, we've got you covered.
        </p>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>Adopt a Pet</h3>
          <p>Find your perfect companion and give them a loving home.</p>
        </div>
        <div className="feature-card">
          <h3>Pet Services</h3>
          <p>Discover grooming, veterinary, and training services near you.</p>
        </div>
        <div className="feature-card">
          <h3>Community</h3>
          <p>Join a community of pet lovers and share your pet stories.</p>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 Pet Haven. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
