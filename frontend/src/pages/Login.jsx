import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/users/login', formData);
      const token = res.data.accessToken;
      localStorage.setItem('token', token);
      toast.dismiss();
      toast.success('✅ Login successful!');
      navigate('/Home2');
    } catch (err) {
      toast.dismiss();
      const errMsg = err?.response?.data?.message?.toLowerCase() || '';
      const isCredentialError = errMsg.includes('email') || errMsg.includes('password');

      const message = isCredentialError
        ? '❌ Invalid email or password'
        : '❌ Login failed. Try again later';

      toast.error(message, {
        toastId: `login-error-${Date.now()}` // ensures the toast is unique each time
      });

      console.error('Login Error:', err.response?.data || err.message);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Sign in to manage your contacts</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <p style={styles.forgotPassword}>
            <Link to="/forgot-password" style={styles.link}>
              Forgot Password?
            </Link>
          </p>
          <button type="submit" style={styles.signinBtn}>
            🔐 Sign In
          </button>
        </form>

        <hr style={styles.hr} />
        <p style={styles.altText}>Or continue with</p>

        <div style={styles.oauthButtons}>
          <button style={styles.oauthBtn}>🔵 Google</button>
          <button style={styles.oauthBtn}>⚫ GitHub</button>
        </div>

        <p style={styles.footer}>
          Don’t have an account?{' '}
          <Link to="/register" style={styles.link}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    background: 'linear-gradient(to right, #20c997, #6f42c1)',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Segoe UI, sans-serif',
    padding: '1rem',
  },
  card: {
    backgroundColor: '#fff',
    padding: '2.5rem',
    borderRadius: '16px',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '100%',
    maxWidth: '420px',
    animation: 'fadeIn 0.5s ease-in',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#1e1e2f',
  },
  subtitle: {
    color: '#6b7280',
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.9rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    outline: 'none',
    transition: '0.3s ease',
  },
  forgotPassword: {
    textAlign: 'right',
    fontSize: '0.85rem',
    marginTop: '-0.5rem',
    marginBottom: '-0.5rem',
  },
  signinBtn: {
    backgroundColor: '#20c997',
    color: '#fff',
    padding: '0.9rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
  hr: {
    margin: '2rem 0 1rem 0',
    border: 0,
    height: '1px',
    background: '#eee',
  },
  altText: {
    color: '#888',
    marginBottom: '0.8rem',
  },
  oauthButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  oauthBtn: {
    padding: '0.7rem 1.4rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    background: '#f8f9fa',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, background 0.3s',
  },
  footer: {
    marginTop: '1.5rem',
    fontSize: '0.9rem',
    color: '#444',
  },
  link: {
    color: '#6f42c1',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Login;