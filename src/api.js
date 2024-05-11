// api.js
const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

// Function to fetch list of posts
export const fetchPosts = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to create a new post
export const createPost = async (postData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(postData),
    });
    if (!response.ok) {
      throw new Error('Failed to create post');
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to update an existing post
export const updatePost = async (postId, postData) => {
  try {
    const response = await fetch(`${BASE_URL}/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(postData),
    });
    if (!response.ok) {
      throw new Error('Failed to update post');
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to delete a post
export const deletePost = async (postId) => {
  try {
    const response = await fetch(`${BASE_URL}/${postId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete post');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
