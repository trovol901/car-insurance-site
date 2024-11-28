import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CarListing from './pages/CarListing';
import UserPage from './pages/UserPage';
import CarDetails from './pages/CarDetails';
import Navbar from './components/Navbar';
import Title from './components/Title';

function App() {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMwMzU2NjQ1LCJleHAiOjE3MzAzNjAyNDV9.bBZiK7zhjA_rmp5h7BBsaztMXoB9bEreFdPoFIhA4A0';

  const mainPageStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL + '/Background-home.png'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  };

  return (
    <div style={mainPageStyle}>
      <Router>
        <Navbar />
        <Title />
        <Routes>
          <Route path="/" element={<CarListing />} />
          <Route path="/profile" element={<UserPage token={token} />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/cars/:id" element={<CarDetails />} /> {/* Nova rota adicionada */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
