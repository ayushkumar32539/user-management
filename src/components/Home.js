import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Button, useMediaQuery, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './Home.css';

function Home() {
  const [posts, setPosts] = useState(() => {
    const localData = localStorage.getItem('posts');
    return localData ? JSON.parse(localData) : [];
  });
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!posts.length) {
      fetchPostsData();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const fetchPostsData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleUpdateStatus = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, updated: true };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <div className="home-container">
      <h2>User Management Application</h2>
      <Typography variant="body1" gutterBottom>
        Total Number of Cards: {posts.length}
      </Typography>
      <Grid container spacing={2}>
        {posts.map(post => (
          <Grid item xs={isMobile ? 12 : 6} sm={isMobile ? 12 : 6} md={isMobile ? 12 : 4} key={post.id}>
            <Card className={`post-card ${post.updated ? 'updated' : ''}`}>
              <div className={post.updated ? 'updated-indicator' : 'hide'} />
              <CardContent>
                <Typography variant="h5" component="h2">
                  {post.title}
                </Typography>
                <Typography variant="body2" component="p">
                  {post.body}
                </Typography>
              </CardContent>
              <div className="btn-group">
                <Button
                  component={Link}
                  to={`/edit-post/${post.id}`}
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => handleUpdateStatus(post.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Home;
