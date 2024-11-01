const express = require('express');
const app = express();
const PORT = 3939;

const cars = [
  { name: "Toyota Camry", year: 2020, price: 20000, description: "Well-maintained car with low mileage." },
  { name: "Hyundai SantaFe", year: 2040, price: 20000, description: "Well-maintained car with low mileage." },
];

app.get('/api/cars', (req, res) => {
  res.json(cars);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
