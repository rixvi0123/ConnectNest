import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home2.css';

const Home2 = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('show');
      }, 300 + index * 200);
    });
  }, []);

  return (
    <div className="home2-page">
      <div className="hero">
        <h1 className="logo">
          📇 Connect<span style={{ color: '#20c997' }}>Nest</span>
        </h1>
        <h2 className="heading">Your Personal Contact Manager</h2>
        <p className="subheading">
          Organize and manage your contacts with ease. A modern solution for your contact management needs.
        </p>

        <div className="button-group">
          <Link to="/dashboard" className="link">
            <button className="button view-button">👁 View Contacts</button>
          </Link>
          <Link to="/add" className="link">
            <button className="button add-button">➕ Add Contact</button>
          </Link>
          <button className="button logout-button" onClick={handleLogout}>
            ↩ Logout
          </button>
        </div>
      </div>

      <div className="features">
        <FeatureCard icon="🛡️" title="Secure Authentication" desc="Protected with industry-standard security and encrypted storage." />
        <FeatureCard icon="📇" title="Contact Management" desc="Easily organize and manage your contacts with our intuitive interface." />
        <FeatureCard icon="☁️" title="Cloud Storage" desc="Access your contacts from anywhere, anytime. Your data is always synchronized." />
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

export default Home2;
