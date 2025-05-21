import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const topics = ['Technology', 'Travel', 'Food', 'Health', 'Finance', 'Art', 'Gaming'];

const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedTopics, setSelectedTopics] = useState([]);

  const handleToggleTopic = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const browseBlogs = () => {
    const query = selectedTopics.join(',');
    navigate(`/blogs?topics=${encodeURIComponent(query)}`);
  };

  return (
    <div className="landing-container">
      <h1>Welcome to  Blogs 📝</h1>

      <div className="auth-buttons">
        <button onClick={() => navigate('/login')} className="auth-btn">Login</button>
        <button onClick={() => navigate('/register')} className="auth-btn">Register</button>
      </div>

      <h2>Select your interests 👇</h2>
      <div className="topics-container">
        {topics.map(topic => (
          <button
            key={topic}
            className={`topic-btn ${selectedTopics.includes(topic) ? 'selected' : ''}`}
            onClick={() => handleToggleTopic(topic)}
          >
            {topic}
          </button>
        ))}
      </div>

      <button onClick={browseBlogs} className="browse-btn">Browse Blogs</button>
    </div>
  );
};

export default LandingPage;
