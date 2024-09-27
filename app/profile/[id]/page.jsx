'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Profile from '@components/Profile';

const UserProfile = () => {
  const { id } = useParams();
  const [userPosts, setUserPosts] = useState([]);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${id}/posts`);
        if (!response.ok) {
          throw new Error('Failed to fetch user posts');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // For debugging

        // Handle both API response formats
        if (Array.isArray(data)) {
          // This is the format for your profile page
          setUserPosts(data);
          setUserName(data[0]?.creator?.username || 'User');
        } else if (data.posts && Array.isArray(data.posts)) {
          // This is the format for other user profiles
          setUserPosts(data.posts);
          setUserName(data.userName || 'User');
        } else {
          throw new Error('Unexpected data format');
        }
      } catch (error) {
        console.error('Error fetching user posts:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUserPosts();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s profile page. Here are all the posts by ${userName}.`}
      data={userPosts}
    />
  );
};

export default UserProfile;