// components/UserDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      const data = await response.json();
      setUser(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      history.push('/');
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>User Details</h2>
      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default UserDetails;
