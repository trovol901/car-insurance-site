// UserProfile.js
import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../services/apiService';

const UserProfile = ({ token }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (token) {
      getUserProfile(token)
        .then(response => setProfile(response.data))
        .catch(console.error);
    }
  }, [token]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
    </div>
  );
};

export default UserProfile;
