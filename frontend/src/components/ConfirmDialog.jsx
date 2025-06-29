import React from 'react';

const ConfirmDialog = ({ open, title, message, onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div style={styles.actions}>
          <button onClick={onConfirm} style={{ backgroundColor: '#e74c3c', color: 'white' }}>
            Yes, Delete
          </button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 1000
  },
  dialog: {
    background: 'white',
    padding: '2rem',
    borderRadius: '10px',
    width: '300px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    textAlign: 'center'
  },
  actions: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'space-around'
  }
};

export default ConfirmDialog;
