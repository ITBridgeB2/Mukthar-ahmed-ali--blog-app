// src/api/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // optional: use this only if backend uses httpOnly cookies
});

// Attach token to all outgoing requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth APIs
export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const fetchUserProfile = () => API.get('/auth/profile');
export const getCurrentUser = () => API.get('/auth/me');

// Post APIs
export const fetchPosts = () => API.get('/posts');
export const fetchPostsByUser = (userId) => API.get(`/posts/user/${userId}`);
export const createPost = (postData) => API.post('/posts', postData);
export const updatePost = (postId, postData) => API.put(`/posts/${postId}`, postData);
export const deletePost = (postId) => API.delete(`/posts/${postId}`);

// Comment APIs
export const addComment = (postId, commentData) => API.post(`/posts/${postId}/comments`, commentData);
export const updateComment = (commentId, commentData) => API.put(`/comments/${commentId}`, commentData);
export const deleteComment = (commentId) => API.delete(`/comments/${commentId}`);

export default API;
