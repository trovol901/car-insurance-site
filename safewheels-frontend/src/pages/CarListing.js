import React, { useState, useEffect } from 'react';
import './CarList.css';
import Calculator from '../components/Calculator';
import { useNavigate } from 'react-router-dom';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [isCarVisible, setIsCarVisible] = useState(false);
  const [isCalculatorVisible, setIsCalculatorVisible] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({
    make: '',
    model: '',
    price_min: '',
    price_max: '',
  });
  const navigate = useNavigate();

  const fetchCars = async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters);
      const response = await fetch(`http://localhost:3939/api/cars?${params.toString()}`);
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

  const goToUserPage = () => {
    navigate('/user');
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
              type="text"
              name="make"
              placeholder="Make"
              value={filterCriteria.make}
              onChange={handleFilterChange}
            />
            <input
              type="text"
              name="model"
              placeholder="Model"
              value={filterCriteria.model}
              onChange={handleFilterChange}
            />
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
            <button className="button-86" type="submit">
              Apply Filters
            </button>
          </form>

          {cars.length > 0 && (
            <div className="car-grid">
              <div className="car-details">
                <img src="car1.jpg" alt="Car" className="car-image" />
                <h3>
                  {cars[0].make} {cars[0].model}
                </h3>
                <p>Year: {cars[0].year}</p>
                <p>Price: ${Number(cars[0].price).toFixed(2)}</p>
                <p>{cars[0].description}</p>
              </div>

              {cars.length > 1 && (
                <div className="car-details">
                  <img src="car2.jpg" alt="Car" className="car-image" />
                  <h3>
                    {cars[1].make} {cars[1].model}
                  </h3>
                  <p>Year: {cars[1].year}</p>
                  <p>Price: ${Number(cars[1].price).toFixed(2)}</p>
                  <p>{cars[1].description}</p>
                </div>
              )}
            </div>
          )}
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

      <div className="bio-section">
        <h2>Blog</h2>
        <p>One might wonder if right now is a good or a bad time to invest in a new vehicle. Past data shows that December continually rates as the best month to purchase a vehicle. But we're past December, now what? We're also at the end of the period (January through April) that typically see the least amount of discounts. So, you'll want to take advantage of the upcoming period, May through September, which tends to see more car-buying deals.

While there are pros and cons to purchasing a new automobile, we here at Berkshire Hathaway Automotive are here to provide you with information that will help you make a wise choice regarding whether or not it's the right time for you to buy.

Gas Prices

Unfortunately, gas prices have been creeping up lately. There's no need to panic, but we want to point out that the newer vehicles tend to be very efficient in fuel efficiency ratings. You'll end up saving more in the long run, especially if your current ride is quite old.

Available Funds

If you've received stimulus money or a tax refund, this might be the down payment that you're looking for. If you've been trying to gather enough money to get a new vehicle but couldn't find a little bit of money to put towards the initial investment, now may be a perfect time.

Slower Output

The demand for new vehicles has increased a bit, but this makes shopping at our dealership even more competitive than usual because of the lower supply. We have all of our models priced to sell, and we may have several incentives available on behalf of the manufacturer. We have a steady stream of vehicles coming in, so we encourage you to check out what we have at the moment.

Getting Ahead of the Game

It's likely that 2022 is going to be a big year for the automotive industry as they're all planning some pretty big releases. That means that this year's models are priced to sell. You'll get a lot for your money regarding features included, technology, safety, upgrades, etc.

If you would like to look at some of the new automobile models available at our family of dealerships, find a dealership near you today.</p>
      </div>
    </div>
  );
};

export default CarList;
