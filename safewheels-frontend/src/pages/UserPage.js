import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserPage.css';

const UserPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:3939/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Login successful! Welcome, ${data.user.name}`);
      } else {
        setErrorMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred during login. Please try again.');
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="user-page">
      <button className="back-button" onClick={handleBackClick}>Back</button>
      <h1>User Information</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">USER:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Enter</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default UserPage;
