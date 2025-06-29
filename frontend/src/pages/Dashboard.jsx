import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import ContactCard from '../components/ContactCard'; // Assuming your ContactCard is in this path
import './Dashboard.css';

// SVG Icons for cleaner buttons
const AddIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const LogoutIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
);


const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const navigate = useNavigate();

  // Memoize handleLogout to prevent it from being recreated on every render
  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setIsLoading(true); // Start loading
        setError(null); // Reset previous errors
        const res = await api.get('/contacts');
        setContacts(res.data);
      } catch (err) {
        console.error('Failed to fetch contacts:', err.response?.data || err.message);
        if (err.response?.status === 401) {
          handleLogout(); // Log out if unauthorized
        } else {
          setError('Could not load contacts. Please try again later.');
        }
      } finally {
        setIsLoading(false); // Stop loading
      }
    };
    fetchContacts();
  }, [handleLogout]); // Add handleLogout as a dependency

  // Function to remove a contact from the state after deletion
  const handleDeleteContact = (contactId) => {
    setContacts(currentContacts => currentContacts.filter(contact => contact._id !== contactId));
  };

  const tagList = ['All', 'Friends', 'Family', 'Work', 'Other'];

  const filteredContacts = contacts.filter((contact) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      contact.name.toLowerCase().includes(searchLower) ||
      contact.email.toLowerCase().includes(searchLower) ||
      contact.phone.includes(searchQuery);

    const matchesTag = activeTag === 'All' || contact.tag === activeTag;
    return matchesSearch && matchesTag;
  });

  const renderContent = () => {
    if (isLoading) {
      return <div className="status-message">Loading contacts...</div>;
    }

    if (error) {
      return <div className="status-message error">{error}</div>;
    }

    if (contacts.length > 0 && filteredContacts.length === 0) {
        return <div className="status-message">No contacts match your search criteria.</div>
    }

    if (filteredContacts.length > 0) {
      return filteredContacts.map((contact) => (
        <ContactCard
          key={contact._id}
          contact={contact}
          onDelete={() => handleDeleteContact(contact._id)} // Pass the delete handler
        />
      ));
    }

    // This is the default case for when there are no contacts at all
    return (
        <div className="no-contacts-card">
          <h3>No Contacts Found</h3>
          <p>Your contact list is empty. Get started by adding a new one!</p>
          <Link to="/add" className="add-btn-large">
            <AddIcon /> Add Your First Contact
          </Link>
        </div>
    );
  };


  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
            <h1 className="brand-logo">Connect<span className="brand-highlight">Nest</span></h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search contacts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-bar"
                />
            </div>
            <div className="header-actions">
                <Link to="/add" className="add-btn">
                    <AddIcon />
                    <span>Add Contact</span>
                </Link>
                <button className="logout-btn" onClick={handleLogout}>
                   <LogoutIcon />
                   <span>Logout</span>
                </button>
            </div>
        </div>
      </header>

      <main className="dashboard-main">
        {/* Controls Toolbar */}
        <div className="dashboard-toolbar">
          <h2 className="page-title">Your Contacts</h2>
          <div className="tag-filters">
            {tagList.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`tag-btn ${activeTag === tag ? 'active' : ''}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Contact Grid */}
        <div className="contact-grid">
          {renderContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        © 2025 ConnectNest. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;