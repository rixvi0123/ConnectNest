import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EditContact from './pages/EditContact';
import ProtectedRoute from './components/ProtectedRoute';
import ContactForm from './components/ContactForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './pages/ForgotPassword';
import Home2 from './pages/Home2'; // ✅ Adjust the path if necessary



// Add inside <Routes>



const App = () => {
  return (
    <Router>
      
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover theme="colored" />

      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />

  {/* Protected Routes */}
  <Route element={<ProtectedRoute />}>
    <Route path="/Home2" element={<Home2 />} /> {/* ← 🟣 Login redirect here */}
    <Route path="/dashboard" element={<Dashboard />} /> {/* ← 🟡 Real contact page */}
    <Route path="/add" element={<ContactForm />} />
    <Route path="/edit/:id" element={<EditContact />} />
  </Route>
</Routes>

    </Router>
  );
};

export default App;
