import React, { useState } from 'react';
import './CarDetails.css';

const carImages = ['c1.png', 'c2.png', 'c3.png', 'c4.png', 'c5.png'];

const CarDetails = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carImages.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? carImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="car-details-container">
      <div className="image-wrapper expanded">
        <button className="arrow-button left-arrow" onClick={handlePrevious}>
          &#9664;
        </button>
        <img
          src={`${process.env.PUBLIC_URL}/${carImages[currentImageIndex]}`}
          alt="Car"
          className="car-image-large animated-image"
        />
        <button className="arrow-button right-arrow" onClick={handleNext}>
          &#9654;
        </button>
      </div>
      <div className="car-info animated-info">
        <div className="info-background white-box">
          <h2>Car Info</h2>
          <p><strong>Price:</strong> $20,000.00</p>
          <p><strong>Model:</strong> Corolla</p>
          <p><strong>Kilometers:</strong> 15,000 km</p>
          <p><strong>Make:</strong> Toyota</p>
          <p>Interested in it? Contact us for more details.</p>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
