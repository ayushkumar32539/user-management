import React from 'react';
import { Route, Link } from 'wouter'; // Import Route and Link from wouter
import Home from './components/Home';
import CreatePostForm from './components/CreatePostForm';
import PostDetails from './components/PostDetails';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>User Management Application</h1>
        {/* Use Link for navigation */}
        <Link to="/create-post" className="add-post-btn">+ Add New Post</Link>
      </header>
      {/* No need to wrap Routes inside Router component */}
      <Route path="/" component={Home} />
      <Route path="/create-post" component={CreatePostForm} />
      <Route path="/edit-post/:id" component={CreatePostForm} />
      <Route path="/post/:id" component={PostDetails} />
    </div>
  );
}

export default App;
