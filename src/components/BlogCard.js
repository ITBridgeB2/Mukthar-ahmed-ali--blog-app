import React from 'react';
import './BlogCard.css';

const BlogCard = ({ post, onView, onComment }) => {
  const { title, content, author, created_at } = post;
  const snippet = content.length > 120 ? content.slice(0, 120) + '…' : content;

  return (
    <div className="blog-card">
      <h3 className="blog-card__title">{title}</h3>
      <p className="blog-card__snippet">{snippet}</p>
      <div className="blog-card__meta">
        <span className="blog-card__author">@{author}</span>
        <span className="blog-card__date">{new Date(created_at).toLocaleDateString()}</span>
      </div>
      <div className="blog-card__actions">
        <button className="btn view" onClick={() => onView(post)}>View</button>
        <button className="btn comment" onClick={() => onComment(post.id)}>Comment</button>
      </div>
    </div>
  );
};

export default BlogCard;
