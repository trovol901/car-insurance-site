require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3940' }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('SafeWheels API is running');
});

const PORT = process.env.PORT || 3939;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const usersRoute = require('./routes/users');
const carsRoute = require('./routes/cars');
const transactionsRoute = require('./routes/transactions');
const calculatorRoute = require('./routes/calculator');

app.use('/api/users', usersRoute);
app.use('/api/cars', carsRoute);
app.use('/api/transactions', transactionsRoute);
app.use('/api/calculator', calculatorRoute);
