import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MulticolouredProgressBar from "../Utils/MulticolouredProgressBar";
import BalanceCard from "../Balances/BalanceCard";
import { parseDate, parseDate1 } from "../../utils/dateParser";

const Balance = () => {
  const [readings, setReadings] = useState([]);
  const [sums, setSums] = useState({ sumP: 0, sumI: 0 });
  const payments = useSelector((state) => state.balance.payments);
  const incomes = useSelector((state) => state.balance.incomes);

  useEffect(() => {
    sums.sumP = 0;
    if (payments && payments.length >= 1) {
      sums.sumP = payments
        .map((i) => i.amount)
        .reduce((accumulator, currentValue) => accumulator + currentValue);
    }
    sums.sumI = 0;
    if (incomes && incomes.length >= 1) {
      sums.sumI = incomes
        .map((i) => i.amount)
        .reduce((accumulator, currentValue) => accumulator + currentValue);
    }
    const sum = sums.sumI + sums.sumP;
    setReadings([
      {
        name: "Expenses",
        value: Math.floor(((sums.sumP * 100) / sum) * 100) / 100,
        color: "#eb4d4b",
      },
      {
        name: "Incomes",
        value: Math.floor(((sums.sumI * 100) / sum) * 100) / 100,
        color: "#6ab04c",
      },
    ]);
  }, [payments, incomes]);

  return (
    <div>
      <div className="row">
        <div className="col s12" style={{ marginTop: 50 }}>
          <div className="col s12">
            {/* SUM */}
            <MulticolouredProgressBar
              readings={readings}
            ></MulticolouredProgressBar>
            <div style={{ color: "green", fontSize: "20px", margin: "10px" }}>
              Income<span style={{ float: "right" }}>{sums.sumI} лв.</span>
            </div>
            <div
              style={{
                color: "red",
                fontSize: "20px",
                margin: "10px",
                borderBottom: "2px dotted black",
              }}
            >
              Expense<span style={{ float: "right" }}>{sums.sumP} лв.</span>
            </div>
            <div
              style={{
                fontSize: "20px",
                margin: "10px",
                backgroundColor: "#808080",
              }}
            >
              Balance
              <span style={{ float: "right" }}>
                {sums.sumI - sums.sumP} лв.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="col s6">
        All incomes
        {incomes &&
          incomes.map((fund) => (
            <BalanceCard
              balance={fund}
              key={fund._id}
              showCategory={true}
              date={parseDate(fund.date)}
            ></BalanceCard>
          ))}
      </div>

      <div className="col s6">
        All payments
        {payments &&
          payments.map((fund) => (
            <BalanceCard
              balance={fund}
              key={fund._id}
              showCategory={true}
              date={parseDate(fund.date)}
            ></BalanceCard>
          ))}
      </div>
    </div>
  );
};

export default Balance;
