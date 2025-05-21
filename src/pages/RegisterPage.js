// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/api';
import './RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    email: '',
    phone_number: '',
    dob: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await registerUser(form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <h2>Z-Blogs</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} required />
        <input name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} required />
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="phone_number" placeholder="Phone Number" value={form.phone_number} onChange={handleChange} required />
        <input name="dob" type="date" placeholder="Date of Birth" value={form.dob} onChange={handleChange} required />
        {error && <p className="error">{error}</p>}
        <button type="submit">Register</button>
      </form>
      <p onClick={() => navigate('/login')} className="redirect-link">
        Already have an account? Login here.
      </p>
    </div>
  );
};

export default RegisterPage;
