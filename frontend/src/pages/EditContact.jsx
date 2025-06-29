import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tag: 'Other', // default fallback
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await api.get(`/contacts/${id}`);
        setFormData(res.data);
      } catch (err) {
        console.error('Failed to fetch contact:', err.response?.data || err.message);
      }
    };

    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/contacts/${id}`, formData);
      alert('Contact updated');
      navigate('/dashboard');
    } catch (err) {
      console.error('Update failed:', err.response?.data || err.message);
      alert('Update failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Contact</h2>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
      />

      <label>
        Tag:
        <select name="tag" value={formData.tag} onChange={handleChange}>
          <option value="Friends">Friends</option>
          <option value="Family">Family</option>
          <option value="Work">Work</option>
          <option value="Other">Other</option>
        </select>
      </label>

      <button type="submit">Update</button>
    </form>
  );
};

export default EditContact;
