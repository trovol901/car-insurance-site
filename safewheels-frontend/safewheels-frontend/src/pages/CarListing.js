import React, { useState, useEffect } from 'react';
import './CarList.css';
import Calculator from '../components/Calculator';
import { useNavigate } from 'react-router-dom';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [isCarVisible, setIsCarVisible] = useState(false);
  const [isCalculatorVisible, setIsCalculatorVisible] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({
    price_min: '',
    price_max: '',
    type: '',
  });
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const fetchCars = async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters);
      const response = await fetch(`http://localhost:3939/api/cars?${params.toString()}`);
      if (response.ok) {
        const carsData = [
          {
            id: 1,
            make: 'Toyota',
            model: 'Camry',
            year: 2020,
            price: 20000,
            description: 'Well-maintained car with low mileage.',
            image: 'car1.jpg',
            type: 'Sedan',
          },
          {
            id: 2,
            make: 'Audi',
            model: 'R8',
            year: 2019,
            price: 60000,
            description: 'Luxury sports car with excellent performance.',
            image: 'car2.jpg',
            type: 'Sports',
          },
        ];
        const filteredCars = carsData.filter((car) => {
          const minPrice = filterCriteria.price_min ? parseFloat(filterCriteria.price_min) : 0;
          const maxPrice = filterCriteria.price_max ? parseFloat(filterCriteria.price_max) : Infinity;
          const matchesType = filterCriteria.type ? car.type === filterCriteria.type : true;

          return car.price >= minPrice && car.price <= maxPrice && matchesType;
        });
        setCars(filteredCars);
      } else {
        setCars([]);
      }
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

  const handleFilterChange = (e) => {
    setFilterCriteria({
      ...filterCriteria,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchCars(filterCriteria);
  };

  const toggleFavorite = (car) => {
    if (favorites.includes(car)) {
      setFavorites(favorites.filter((f) => f !== car));
    } else {
      setFavorites([...favorites, car]);
    }
  };

  const goToUserPage = () => {
    navigate('/user');
  };

  const handleCarClick = (car) => {
    navigate(`/cars/${car.id}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const bioSection = document.querySelector('.bio-section');
      const bioPosition = bioSection.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (bioPosition < screenPosition) {
        bioSection.classList.add('show');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="car-list">
      <button className="button-86" onClick={handleShowCarsClick}>
        {isCarVisible ? 'Hide Cars' : 'Cars'}
      </button>

      {isCarVisible && (
        <>
          <form className="filter-form" onSubmit={handleFilterSubmit}>
            <input
              type="number"
              name="price_min"
              placeholder="Min Price"
              value={filterCriteria.price_min}
              onChange={handleFilterChange}
            />
            <input
              type="number"
              name="price_max"
              placeholder="Max Price"
              value={filterCriteria.price_max}
              onChange={handleFilterChange}
            />
            <select
              name="type"
              value={filterCriteria.type}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">Select Type</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Truck">Truck</option>
            </select>
            <button className="button-86" type="submit">
              Apply Filters
            </button>
          </form>

          <div className="car-grid">
            {cars.map((car) => (
              <div key={car.id} className="car-details" onClick={() => handleCarClick(car)}>
                <img src={car.image} alt={`${car.make} ${car.model}`} className="car-image" />
                <h3>
                  {car.make} {car.model}
                </h3>
                <p>Year: {car.year}</p>
                <p>Price: ${Number(car.price).toFixed(2)}</p>
                <p>{car.description}</p>
                <button
                  className={`favorite-button ${favorites.includes(car) ? 'favorite-active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(car);
                  }}
                >
                  {favorites.includes(car) ? 'Unfavorite' : 'Add to Favorites'}
                </button>
                <button
                  className="button-86 request-info-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(`Request more info for Car ID ${car.id}`);
                  }}
                >
                  Request More Info
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      <button className="button-86 user-button" onClick={goToUserPage}>
        User
      </button>

      <button
        className="button-86 calculator-button"
        onClick={() => setIsCalculatorVisible(!isCalculatorVisible)}
      >
        {isCalculatorVisible ? 'Hide Calculator' : 'Calculator'}
      </button>

      {isCalculatorVisible && <Calculator />}

      <button className="button-86 add-button" style={{ position: 'fixed', bottom: '20px', right: '20px' }} onClick={() => navigate('/add-car')}>
        Add
      </button>

      <div className="bio-section">
        <h2>Blog</h2>
        <p>
          One might wonder if right now is a good or a bad time to invest in a new vehicle.
          Past data shows that December continually rates as the best month to purchase a vehicle.
          But we're past December, now what? We're also at the end of the period (January through April) that typically see the least amount of discounts. So, you'll want to take advantage of the upcoming period, May through September, which tends to see more car-buying deals.
          <br />
          If you would like to look at some of the new automobile models available at our family of dealerships, find a dealership near you today.
        </p>
      </div>
    </div>
  );
};

export default CarList;
