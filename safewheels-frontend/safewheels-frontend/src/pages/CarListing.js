import React, { useState } from 'react';
import './CarList.css';
import Calculator from '../components/Calculator';
import { useNavigate } from 'react-router-dom';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [isCarVisible, setIsCarVisible] = useState(false);
  const [isCalculatorVisible, setIsCalculatorVisible] = useState(false);
  const navigate = useNavigate();

  const fetchCars = async () => {
    try {
      const response = await fetch('http://localhost:3939/api/cars');
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error('Error fetching car data:', error);
    }
  };

  const handleShowCarsClick = () => {
    if (!isCarVisible) {
      fetchCars();
    }
    setIsCarVisible(!isCarVisible);
  };

  const goToUserPage = () => {
    navigate('/user');
  };

  return (
    <div className="car-list">
      <button className="button-86" onClick={handleShowCarsClick}>
        {isCarVisible ? 'Hide Cars' : 'Cars'}
      </button>
      {isCarVisible && cars.length > 0 && (
        <div className="car-details">
          <img src="car1.jpg" alt="Car" className="car-image" />
          <h3>{cars[0].make} {cars[0].model}</h3>
          <p>Year: {cars[0].year}</p>
          <p>Price: ${Number(cars[0].price).toFixed(2)}</p>
          <p>{cars[0].description}</p>
        </div>
      )}
      <button className="button-86 user-button" onClick={goToUserPage}>
        User
      </button>
      <button className="button-86 calculator-button" onClick={() => setIsCalculatorVisible(!isCalculatorVisible)}>
        {isCalculatorVisible ? 'Hide Calculator' : 'Calculator'}
      </button>
      {isCalculatorVisible && <Calculator />}
    </div>
  );
};

export default CarList;
