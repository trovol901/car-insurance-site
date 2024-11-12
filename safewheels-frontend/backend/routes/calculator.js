const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { loanAmount, interestRate, loanTerm } = req.query;

  if (!loanAmount || !interestRate || !loanTerm) {
    return res.status(400).json({ message: 'Missing required query parameters' });
  }

  const principal = parseFloat(loanAmount);
  const monthlyInterest = parseFloat(interestRate) / 100 / 12;
  const numberOfPayments = parseInt(loanTerm) * 12;

  const monthlyPayment = (principal * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -numberOfPayments));

  res.json({ monthlyPayment: monthlyPayment.toFixed(2) });
});

module.exports = router;
