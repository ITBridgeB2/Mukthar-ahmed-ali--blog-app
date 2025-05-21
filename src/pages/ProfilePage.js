import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile, fetchPostsByUser, deletePost } from '../api/api';
import './ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfileAndPosts = async () => {
      try {
        const resUser = await fetchUserProfile();
        setUser(resUser.data);
        const resPosts = await fetchPostsByUser(resUser.data.id);
        setPosts(resPosts.data);
      } catch (err) {
        console.error('Error loading profile or posts:', err);
      }
    };
    loadProfileAndPosts();
  }, []);

  const handleEdit = (post) => {
    navigate('/post', { state: { post } });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this post?')) {
      await deletePost(id);
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  if (!user) return <p className="profile-loading">Loading profile…</p>;

  return (
    <div className="profile-page">
      <h1 className="profile-heading">{user.username}’s Profile</h1>
      <p className="profile-email">{user.email}</p>

      {posts.length === 0 ? (
        <p className="no-posts">You have not written any posts yet.</p>
      ) : (
        <div className="profile-posts">
          {posts.map(post => (
            <ProfileBlogCard
              key={post.id}
              post={post}
              onView={() => navigate(`/blogs/${post.id}`)}
              onEdit={() => handleEdit(post)}
              onDelete={() => handleDelete(post.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ✅ Inline BlogCard component for profile page only
const ProfileBlogCard = ({ post, onView, onEdit, onDelete }) => (
  <div className="blog-card">
    <h3 className="blog-title">{post.title}</h3>
    <p className="blog-content">
      {post.content.length > 150 ? post.content.slice(0, 150) + '...' : post.content}
    </p>
    <p className="blog-date">{new Date(post.created_at).toLocaleDateString()}</p>
    <div className="blog-actions">
      <button onClick={onView} className="btn view">View</button>
      <button onClick={onEdit} className="btn edit">Edit</button>
      <button onClick={onDelete} className="btn delete">Delete</button>
    </div>
  </div>
);

export default ProfilePage;
