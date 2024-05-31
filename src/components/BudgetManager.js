// src/components/BudgetManager.js
import React from 'react';

const BudgetManager = ({ budget }) => {
  return (
    <div>
      <h2>Available Budget: ${budget}</h2>
    </div>
  );
};

export default BudgetManager;
