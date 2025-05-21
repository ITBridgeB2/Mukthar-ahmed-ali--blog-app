import React, { useState } from 'react';
import { createPost } from '../api/api';
import { useNavigate, useLocation } from 'react-router-dom';

const CreatePostPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editing = location.state?.post;

  const [form, setForm] = useState({
    title: editing?.title || '',
    content: editing?.content || '',
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await createPost(editing.id, form);
    } else {
      await createPost(form);
    }
    navigate('/profile');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          {editing ? 'Edit Post ✏️' : 'Create New Post 📝'}
        </h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="title"
            placeholder="Enter a catchy title"
            value={form.title}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <textarea
            name="content"
            placeholder="Write your thoughts here..."
            value={form.content}
            onChange={handleChange}
            required
            rows="8"
            style={styles.textarea}
          />
          <button type="submit" style={styles.button}>
            {editing ? 'Save Changes' : 'Publish'}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '2rem',
    backgroundColor: '#f4f7fa',
    minHeight: '100vh',
  },
  card: {
    background: '#ffffff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    width: '100%',
  },
  title: {
    marginBottom: '1.5rem',
    fontSize: '1.8rem',
    color: '#2c3e50',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    resize: 'vertical',
  },
  button: {
    backgroundColor: '#0984e3',
    color: '#fff',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.3s',
  },
};

export default CreatePostPage;
