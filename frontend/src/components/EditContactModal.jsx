// components/EditContactModal.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './EditContactModal.css';
import { toast } from 'react-toastify';


const EditContactModal = ({ contact, onClose, onUpdated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        tag: 'Other',
    });

    useEffect(() => {
        if (contact) {
            setFormData({
                name: contact.name,
                email: contact.email,
                phone: contact.phone,
                tag: contact.tag,
            });
        }
    }, [contact]);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // close modal
            await api.put(`/contacts/${contact._id}`, formData);
            toast.success('Contact updated successfully!');
            onUpdated(); // refresh
            onClose(); // close modal

        } catch (err) {
            console.error('Update failed:', err.response?.data || err.message);
                toast.error('❌ Failed to update contact. Please try again.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h2>Edit Contact</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        type="email"
                        required
                    />
                    <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        required
                    />
                    <select name="tag" value={formData.tag} onChange={handleChange}>
                        <option value="Friends">Friends</option>
                        <option value="Family">Family</option>
                        <option value="Work">Work</option>
                        <option value="Other">Other</option>
                    </select>
                    <div className="modal-actions">
                        <button type="submit" className="save-btn">Update</button>
                        <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditContactModal;
