import React, { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';
import EditContactModal from './EditContactModal';
import api from '../services/api';
import './ContactCard.css';

const ContactCard = ({ contact }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await api.delete(`/contacts/${contact._id}`);
      window.location.reload();
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete');
    }
  };

  const sets = ['set1', 'set2', 'set3', 'set4'];
  const styleSet = sets[contact.email.length % sets.length];
  const avatarUrl = `https://robohash.org/${encodeURIComponent(contact.email)}?set=${styleSet}`;

  const getTagColor = (tag) => {
    switch (tag) {
      case 'Friends': return '#2196f3';
      case 'Family': return '#4caf50';
      case 'Work': return '#ff9800';
      default: return '#9e9e9e';
    }
  };

  return (
    <>
      <div className="contact-card">
        <img src={avatarUrl} alt="avatar" className="contact-avatar" />
        <div className="contact-info">
          <h3>{contact.name}</h3>
          <p>Email: {contact.email}</p>
          <p>Phone: {contact.phone}</p>
          <p>
            Tag:{' '}
            <span
              className="tag"
              style={{ backgroundColor: getTagColor(contact.tag) }}
            >
              {contact.tag}
            </span>
          </p>
          <div className="card-buttons">
            <button onClick={() => setIsEditOpen(true)}>Edit</button>
            <button onClick={() => setConfirmOpen(true)}>Delete</button>
          </div>
        </div>
      </div>

      {isEditOpen && (
        <EditContactModal
          contact={contact}
          onClose={() => setIsEditOpen(false)}
          onUpdated={() => window.location.reload()}
        />
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Delete Contact?"
        message={`Are you sure you want to delete ${contact.name}?`}
        onConfirm={() => {
          setConfirmOpen(false);
          handleDelete();
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
};

export default ContactCard;
