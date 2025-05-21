// src/pages/BlogPage.jsx
import React, { useEffect, useState } from 'react';
import { fetchPosts, deletePost } from '../api/api';
import BlogCard from '../components/BlogCard';
import './BlogPage.css';
import { useNavigate } from 'react-router-dom';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [popupPost, setPopupPost] = useState(null);
  const navigate = useNavigate();
  const isAuth = Boolean(localStorage.getItem('token'));

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const res = await fetchPosts();
    setPosts(res.data);
  };

  const handleView = (post) => {
    setPopupPost(post);
  };

  const handleComment = (postId) => {
    if (!isAuth) {
      navigate('/login');
    } else {
      // scroll to comment form or open comment UI
      setPopupPost({ ...popupPost, showCommentForm: true });
    }
  };

  const handleDelete = async (id) => {
    await deletePost(id);
    loadPosts();
    setPopupPost(null);
  };

  return (
    <div className="blog-page">
      <div className="posts-list">
        {posts.map(p => (
          <BlogCard
            key={p.id}
            post={p}
            onView={handleView}
            onComment={handleComment}
          />
        ))}
      </div>

      {popupPost && (
        <div className="modal-overlay" onClick={() => setPopupPost(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h2>{popupPost.title}</h2>
            <p>{popupPost.content}</p>
            <div className="modal-meta">
              <span>@{popupPost.author}</span>
              <span>{new Date(popupPost.created_at).toLocaleDateString()}</span>
            </div>

            {isAuth ? (
              <div className="modal-actions">
                {/* Here you could render a comment form */}
                <textarea
                  placeholder="Write a comment…"
                  className="comment-box"
                />
                <button onClick={() => handleComment(popupPost.id)}>Submit Comment</button>
                <button onClick={() => handleDelete(popupPost.id)}>Delete Post</button>
                <button onClick={() => setPopupPost(null)}>Close</button>
              </div>
            ) : (
              <div className="modal-actions">
                <button onClick={() => navigate('/login')}>Login to comment</button>
                <button onClick={() => setPopupPost(null)}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
