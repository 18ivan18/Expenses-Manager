import React from "react";

const Incomes = ({ incomes }) => {
  return (
    <div className="container">
      <h1>Incomes</h1>
      {incomes.map((income) => (
        <div key={income._id}>
          <div>{`Category: ${income.category}`}</div>
          <div>{`Amount: ${income.amount}`}</div>
        </div>
      ))}
    </div>
  );
};
export default Incomes;
