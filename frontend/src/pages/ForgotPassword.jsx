import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [resetHint, setResetHint] = useState('');
  const [resetKey, setResetKey] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const handleRequestHint = async () => {
    try {
      const res = await api.post('/users/reset/request', { email });
      setResetHint(res.data.resetHint);
      toast.info('🔐 Reset hint loaded');
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || '❌ Email not found');
    }
  };

  const handleResetPassword = async () => {
    try {
      await api.post('/users/reset/verify', {
        email,
        resetKey,
        newPassword,
      });
      toast.success('✅ Password successfully updated');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || '❌ Reset failed');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔐 Forgot Password</h2>

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
            <button onClick={handleRequestHint} style={styles.button}>
              Get Reset Hint
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p style={styles.hint}><strong>Hint:</strong> {resetHint}</p>
            <input
              type="text"
              placeholder="Enter reset key"
              value={resetKey}
              onChange={(e) => setResetKey(e.target.value)}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleResetPassword} style={styles.button}>
              Update Password
            </button>
          </>
        )}
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
  },
  title: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: '#1e1e2f',
  },
  input: {
    width: '100%',
    padding: '0.9rem',
    marginBottom: '1rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    outline: 'none',
  },
  button: {
    backgroundColor: '#20c997',
    color: '#fff',
    padding: '0.9rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100%',
    marginTop: '0.5rem',
  },
  hint: {
    backgroundColor: '#f0f0f0',
    padding: '0.75rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    fontSize: '0.95rem',
    color: '#333',
  },
};

export default ForgotPassword;
