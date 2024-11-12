const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// Get all cars with optional filters
router.get('/', async (req, res) => {
  try {
    const { make, model, price_min, price_max } = req.query;
    let query = 'SELECT * FROM cars WHERE 1=1';
    const params = [];

    if (make) {
      query += ' AND make = ?';
      params.push(make);
    }
    if (model) {
      query += ' AND model = ?';
      params.push(model);
    }
    if (price_min) {
      query += ' AND price >= ?';
      params.push(price_min);
    }
    if (price_max) {
      query += ' AND price <= ?';
      params.push(price_max);
    }

    const [cars] = await db.execute(query, params);
    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new car
router.post('/', auth, async (req, res) => {
  const { make, model, year, price, description } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO cars (make, model, year, price, description) VALUES (?, ?, ?, ?, ?)',
      [make, model, year, price, description]
    );
    res.status(201).json({ message: 'Car added successfully', carId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get car by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [car] = await db.execute('SELECT * FROM cars WHERE id = ?', [id]);
    if (car.length === 0) return res.status(404).json({ message: 'Car not found' });
    res.json(car[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update car
router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { make, model, year, price, description } = req.body;
  try {
    const [result] = await db.execute(
      'UPDATE cars SET make = ?, model = ?, year = ?, price = ?, description = ? WHERE id = ?',
      [make, model, year, price, description, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Car not found' });
    res.json({ message: 'Car updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete car
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute('DELETE FROM cars WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Car not found' });
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
