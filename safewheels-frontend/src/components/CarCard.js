import React from 'react';

const CarCard = ({ car }) => (
  <div className="car-card">
    <h3>{car.make} {car.model}</h3>
    <p>Year: {car.year}</p>
    <p>Price: ${car.price}</p>
    <p>{car.description}</p>
  </div>
);

export default CarCard;
