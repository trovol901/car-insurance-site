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
        navigate('/');
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
      <form onSubmit={handleLogin} className="login-form">
        <label htmlFor="email">User:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />

        <button type="submit" className="login-button">Enter</button>
      </form>
      {errorMessage && <div className="error-box">{errorMessage}</div>}
    </div>
  );
};

export default UserPage;
