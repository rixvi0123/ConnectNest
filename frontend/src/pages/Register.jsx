import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    resetHint: '',
    resetKey: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/register', formData);
      toast.success('✅ Registration successful!');
      navigate('/login');
    } catch (err) {
      console.error('❌ Registration Error:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || '❌ Registration failed');
    }
  };
  const getPasswordStrength = (password) => {
    if (!password) return { level: '', color: '', emoji: '' };

    if (password.length > 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[@#$%^&*!]/.test(password)) {
      return { level: 'Strong', color: 'green', emoji: '✅' };
    } else if (password.length >= 6) {
      return { level: 'Medium', color: 'orange', emoji: '⚠️' };
    } else {
      return { level: 'Weak', color: 'red', emoji: '❌' };
    }
  };


  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Your Account</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            style={{
              ...styles.input,
              borderColor: getPasswordStrength(formData.password).color || '#ccc',
            }}
          />

          {formData.password && (
            <div style={{ color: getPasswordStrength(formData.password).color, fontWeight: 'bold', marginTop: '0.2rem' }}>
              {getPasswordStrength(formData.password).emoji} Password Strength: {getPasswordStrength(formData.password).level}
            </div>
          )}

          <input
            name="resetHint"
            placeholder="Reset Hint (e.g. Favorite animal)"
            value={formData.resetHint}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            name="resetKey"
            type="text"
            placeholder="Reset Key (used to reset password)"
            value={formData.resetKey}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Register</button>
        </form>
        <p style={styles.footer}>
          Already have an account?{' '}
          <span
            style={styles.link}
            onClick={() => navigate('/login')}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #20c997, #6f42c1)',
    padding: '1rem'
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: '20px',
    padding: '2.5rem',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    textAlign: 'center',
  },
  title: {
    marginBottom: '1.5rem',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#343a40',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.8rem',
    borderRadius: '10px',
    border: '1px solid #ced4da',
    fontSize: '1rem',
  },
  button: {
    padding: '0.8rem',
    background: '#20c997',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: '0.3s',
  },
  footer: {
    marginTop: '1rem',
    color: '#6c757d',
  },
  link: {
    color: '#20c997',
    cursor: 'pointer',
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
};

export default Register;
