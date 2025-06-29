import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  useEffect(() => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('show');
      }, 300 + index * 200);
    });
  }, []);

  return (
    <div className="home-page">
      <div className="hero">
        <h1 className="logo">
          📇 Connect<span style={{ color: '#20c997' }}>Nest</span>
        </h1>
        <h2 className="heading">Your Personal Contact Manager</h2>
        <p className="subheading">
          Organize and manage your contacts with ease. A modern solution for your contact management needs.
        </p>

        <div className="button-group">
          <Link to="/login" className="link">
            <button className="primary-button">Sign In</button>
          </Link>
          <Link to="/register" className="link">
            <button className="secondary-button">Sign Up</button>
          </Link>
        </div>
      </div>

      <div className="features">
        <FeatureCard
          icon="🛡️"
          title="Secure Authentication"
          desc="Protected with industry-standard security and encrypted storage."
        />
        <FeatureCard
          icon="📇"
          title="Contact Management"
          desc="Easily organize and manage your contacts with our intuitive interface."
        />
        <FeatureCard
          icon="☁️"
          title="Cloud Storage"
          desc="Access your contacts from anywhere, anytime. Your data is always synchronized."
        />
      </div>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} ConnectNest. All rights reserved.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="card">
    <div className="card-icon">{icon}</div>
    <h3 className="card-title">{title}</h3>
    <p className="card-desc">{desc}</p>
  </div>
);

export default Home;
