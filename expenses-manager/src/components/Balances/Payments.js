import React, { useEffect, useState } from "react";
import { selectAuth } from "../../features/users/AuthSlice";
import { changeLoading } from "../../features/loading/loadingSlice";
import {
  getPayments,
  selectMessage,
} from "../../features/Payments/BalanceSlice";
import { parseDate, parseDate1 } from "../../utils/dateParser";
import { useDispatch, useSelector } from "react-redux";
import { BalanceChange } from "./BalanceChange";
import BalanceCard from "./BalanceCard.js";
import ProgressBar from "../Utils/Progress";

const Payments = ({ date }) => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const incomes = useSelector((state) => state.balance.payments);
  const message = useSelector(selectMessage);
  const categories = useSelector((state) => state.balance.paymentsCategories);
  const [percent, setPercent] = useState(undefined);

  useEffect(() => {
    const M = window.M;
    let elems = document.querySelectorAll(".fixed-action-btn");
    M.FloatingActionButton.init(elems, { hoverEnabled: false });
    elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, {});
  }, []);

  useEffect(() => {
    if (auth.loggedIn) {
      dispatch(changeLoading());
      dispatch(getPayments(auth)).then(() => dispatch(changeLoading()));
    }
  }, [auth, message]);

  const [incomesForDay, setIncomesForDay] = useState(undefined);

  useEffect(() => {
    setIncomesForDay(
      incomes.filter(
        (income) => parseDate(income.date) === parseDate1(date.toString())
      )
    );
  }, [incomes, date]);

  useEffect(() => {
    if (incomes && categories && incomes.length !== 0) {
      let result = {};
      for (let index = 0; index < categories.length; index++) {
        const allIncome = incomes
          .map((i) => i.amount)
          .reduce((accumulator, currentElem) => accumulator + currentElem);
        const incomeFromCategory = incomes
          .filter((i) => i.category === categories[index].name)
          .map((i) => i.amount)
          .reduce((accumulator, currentElem) => accumulator + currentElem);
        result = {
          ...result,
          [categories[index].name]: {
            percent: Math.round((incomeFromCategory / allIncome) * 100),
            money: incomeFromCategory,
          },
        };
      }
      setPercent(result);
    }
  }, [incomes, categories]);

  return (
    <div>
      <div className="row">
        <div className="col s12" style={{ marginTop: 50 }}>
          <div className="col s6 z-depth-1">
            {categories &&
              categories.map((c) => (
                <div
                  key={c.name}
                  style={{ borderBottom: "2px dotted black", margin: 20 }}
                >
                  <img
                    src={c.picture}
                    className="responsive-image circle"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <span style={{ fontSize: "20px" }}>{c.name}</span>{" "}
                </div>
              ))}
          </div>
          <div className="col s6">
            {categories &&
              percent &&
              categories.map((c) => (
                <div
                  key={c.name}
                  style={{ paddingTop: "25px", textAlign: "right" }}
                >
                  {percent[c.name] && (
                    <div>
                      <ProgressBar
                        marginBottom="0px"
                        percent={percent[c.name].percent}
                      ></ProgressBar>
                      <span>{percent[c.name].money}$</span>
                    </div>
                  )}  
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="col s6">
        <div style={{ textAlign: "center" }}>
          <h3>{`Expenses at ${parseDate1(date.toString())}`}</h3>
        </div>
        {incomesForDay &&
          incomesForDay.map((fund) => (
            <BalanceCard
              balance={fund}
              key={fund._id}
              showCategory={true}
            ></BalanceCard>
          ))}
      </div>

      <div className="col s6">
        <div style={{ textAlign: "center" }}>
          <h3>{`Expenses today`}</h3>
          {incomes &&
            incomes
              .filter(
                (income) =>
                  parseDate(income.date) === parseDate1(new Date().toString())
              )
              .map((fund) => (
                <BalanceCard
                  balance={fund}
                  key={fund._id}
                  showCategory={true}
                ></BalanceCard>
              ))}
        </div>
      </div>

    </div>
  );
};

export default Payments;
