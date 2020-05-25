import React from "react";
import { connect } from "react-redux";

export const Payments = ({ payments }) => {
  return (
    <div>
      <h1>Payments</h1>
      {payments.map((payment) => (
        <div key={payment._id}>
          <div>{`Category: ${payment.category}`}</div>
          <div>{`Amount: ${payment.amount}`}</div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
