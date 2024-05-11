import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost, updatePost } from '../api';
import { Button, TextField, Modal, useMediaQuery, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function CreatePostForm({ postId }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState(''); // Assuming you want to update userId as well
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  // eslint-disable-next-line
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (postId) {
      fetchPostData();
    }
    // eslint-disable-next-line
  }, [postId]);

  const fetchPostData = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch post');
      }
      const postData = await response.json();
      setTitle(postData.title);
      setBody(postData.body);
      setUserId(postData.userId);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        title,
        body,
        userId, // Include userId if needed
      };
      if (postId) {
        await updatePost(postId, postData);
      } else {
        await createPost(postData);
      }
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <div className="form-container">
      <h2>{postId ? 'Edit Post' : 'Create New Post'}</h2>
      {error && <div className="error">Error: {error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
        </div>
        <div>
          <TextField
            label="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          {postId ? 'Update' : 'Submit'}
        </Button>
        {postId && (
          <Button onClick={handleModalOpen} variant="contained" color="secondary" startIcon={<EditIcon />}>
            Edit
          </Button>
        )}
      </form>
      <Modal open={openModal} onClose={handleModalClose}>
        <div className="modal-container">
          <h2>Edit Post</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                fullWidth
                margin="normal"
              />
            </div>
            <div>
              <TextField
                label="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
            </div>
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default CreatePostForm;
