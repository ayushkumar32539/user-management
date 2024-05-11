// components/PostDetails.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deletePost } from '../api';
// import './PostDetails.css';

function PostDetails({ match }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 const navigate = useNavigate();

  useEffect(() => {
    fetchPostData();
    // eslint-disable-next-line
  }, []);

  const fetchPostData = async () => {
    try {
      const postId = match.params.id;
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch post');
      }
      const postData = await response.json();
      setPost(postData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(post.id);
      navigate('/');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default PostDetails;
