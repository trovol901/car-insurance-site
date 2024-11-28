# Features

1. **Car Listings**: Display a list of available cars with filters for make, model, price range, etc.

2. **Car Loan Calculator**: Allow users to calculate estimated monthly payments based on their input.

3. **Comparison Tool**: Enable users to select multiple cars and compare their features and prices.

# Technology (Backend Focus)

- **Backend**: The backend is built using Node.js with Express, providing RESTful APIs to handle all server side logic. It manages user requests, processes data, and integrates with the database to fetch or update information.
- **Database**: SQL is used for storing car listings.



# Diagram

The following diagram shows the high-level architecture of the SafeWheels platform:

- **Backend**: The backend server, built with Node.js, handles incoming requests, processes data, and communicates with the SQL database.
- **Database**: A SQL database stores car information, user data, and other details.
- **Third-Party APIs**: The backend also integrates with third-party APIs to fetch car specifications and pricing information.



# API Contracts

The API contract defines the endpoints used to interact with the SafeWheels backend. For example:

- **GET /api/cars**: Retrieve a list of available cars, with optional filters for make, model, and price range.
- **POST /api/calculate-loan**: Accept user input to calculate an estimated car loan payment.
- **POST /api/compare**: Accept a list of car IDs to compare their features and pricing.

For a more detailed breakdown of each endpoint, refer to the API contract documentation:
