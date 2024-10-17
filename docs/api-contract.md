# API for SafeWheels
![API Summary](./assets/summary-api.png)


# Details:

**Access Level:**
- Public: No authentication required.
- Private (Authenticated users): User must be logged in.
- Private (Owner only): User must be logged in and own the resource.

# Users
- POST /api/users - Create a new user - Public
- POST /api/users/login - User login - Public
- GET /api/users/profile - Get user profile - Private (Authenticated users)
- PUT /api/users/profile - Update user profile - Private (Authenticated users)

# Cars
- GET /api/cars - List all cars with optional filters - Public
- POST /api/cars - Add a new car listing - Private (Authenticated users)
- GET /api/cars/{id} - Get details of a specific car - Public
- PUT /api/cars/{id} - Update car details - Private (Owner only)
- DELETE /api/cars/{id} - Delete a car listing - Private (Owner only)

# Transactions
- GET /api/transactions - List user transactions - Private (Authenticated users)
- POST /api/transactions - Create a new transaction - Private (Authenticated users)
- GET /api/transactions/{id} - Get details of a specific transaction - Private (Owner only)

# Loan Calculator
- GET /api/calculator - Calculate monthly payment - Public
