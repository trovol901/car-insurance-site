import React, { useState } from 'react';
import './AddCar.css';

const AddCar = () => {
  const [car, setCar] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    description: '',
    type: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the car data to the backend here
    console.log('Car details:', car);
  };

  return (
    <div className="add-car">
      <h2>Add a New Car</h2>
      <form onSubmit={handleSubmit} className="add-car-form">
        <input
          type="text"
          name="make"
          placeholder="Make"
          value={car.make}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="model"
          placeholder="Model"
          value={car.model}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={car.year}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={car.price}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={car.description}
          onChange={handleChange}
          required
        />
        <select name="type" value={car.type} onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Truck">Truck</option>
          <option value="Sports">Sports</option>
        </select>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={car.image}
          onChange={handleChange}
        />
        <button type="submit" className="button-86">
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
