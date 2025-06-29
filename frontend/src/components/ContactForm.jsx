import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './AddContact.css'; // Styling file

const ContactForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        tag: 'Other',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/contacts', formData);
            toast.success('🎉 Contact added successfully!', {
                position: 'top-right',
                autoClose: 2500,
                theme: 'colored',
            });
            navigate('/dashboard');
        } catch (err) {
            toast.error('❌ Failed to add contact. Try again!', {
                position: 'top-right',
                autoClose: 3000,
                theme: 'colored',
            });
        }
    };

    return (
        <div className="add-page">
            <div className="form-box">
                <h1 className="form-title">📇 Add New Contact</h1>
                <p className="form-subtitle">Store the important people in your life ✨</p>

                <form className="styled-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <select name="tag" value={formData.tag} onChange={handleChange}>
                        <option value="Friends">Friends</option>
                        <option value="Family">Family</option>
                        <option value="Work">Work</option>
                        <option value="Other">Other</option>
                    </select>

                    <button type="submit" className="submit-btn">➕ Save Contact</button>
                </form>
            </div>

       



        </div>
    );
};

export default ContactForm;
