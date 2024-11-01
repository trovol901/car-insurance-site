import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanPeriod, setLoanPeriod] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateMonthlyPayment = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const months = parseFloat(loanPeriod) * 12;

    if (principal && rate && months) {
      const payment = (principal * rate) / (1 - Math.pow(1 + rate, -months));
      setMonthlyPayment(payment.toFixed(2));
    } else {
      setMonthlyPayment(null);
    }
  };

  return (
    <div className="calculator-container">
      <h3>Car Loan Calculator</h3>
      <input
        type="number"
        placeholder="Loan Amount"
        value={loanAmount}
        onChange={(e) => setLoanAmount(e.target.value)}
      />
      <input
        type="number"
        placeholder="Interest Rate (%)"
        value={interestRate}
        onChange={(e) => setInterestRate(e.target.value)}
      />
      <input
        type="number"
        placeholder="Loan Period (years)"
        value={loanPeriod}
        onChange={(e) => setLoanPeriod(e.target.value)}
      />
      <button onClick={calculateMonthlyPayment}>Calculate</button>
      {monthlyPayment && <p>Monthly Payment: ${monthlyPayment}</p>}
    </div>
  );
};

export default Calculator;
