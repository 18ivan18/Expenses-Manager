import React, { useEffect, useState } from "react";
import Incomes from "./Incomes";
import Balance from "./Balance";
import Payments from "./Payments";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../css/Balances/BalanceContainer.css";
import BalanceChange from "./BalanceChange"

const BalanceContainer = () => {
  useEffect(() => {
    console.log("Component Balance container did mount");
    const M = window.M;
    const elems = document.querySelectorAll(".tabs");
    M.Tabs.init(elems, {});
  }, []);

  const [date, setDate] = useState(new Date());

  return (
    <div
      className="row"
      style={{
        minHeight: "800px",
        width: "100%",
        margin: "1px 0px 50px 0px",
        opacity: "0.95",
      }}
    >
      {" "}
      <div>
        <Calendar value={date} onChange={(date) => setDate(date)}></Calendar>
      </div>
      <div className="col s12">
        <ul id="tabs-swipe-demo" className="tabs">
          <li className="tab col s4">
            <a href="#swipe-1">Incomes</a>
          </li>
          <li className="tab col s4">
            <a href="#swipe-2" className="active">
              Balance
            </a>
          </li>
          <li className="tab col s4">
            <a href="#swipe-3">Payments</a>
          </li>
        </ul>
        <div
          id="swipe-1"
          className="col s12"
          style={{ backgroundColor: "white" }}
        >
          <Incomes date={date} />
        </div>
        <div
          id="swipe-2"
          className="col s12"
          style={{ backgroundColor: "white" }}
        >
          <Balance date={date} />
        </div>
        <div
          id="swipe-3"
          className="col s12"
          style={{ backgroundColor: "white" }}
        >
          <Payments date={date} />
        </div>
      </div>
      {/* FIXED ACTION BUTTON */}
      <div className="fixed-action-btn">
        <a className="btn-floating btn-large red">
          <i className="large material-icons">mode_edit</i>
        </a>
        <ul>
          <li>
            <div>
              Add Expense
              <button
                className="btn-floating red modal-trigger"
                data-target="modal1"
              >
                <i className="material-icons">add</i>
              </button>
            </div>
          </li>
          <li>
            <div>
              Add Income
              <button
                data-target="modal2"
                className="btn-floating green darken-1 modal-trigger"
              >
                <i className="material-icons">add</i>
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div id="modal1" className="modal">
        <BalanceChange expense date={date} />
      </div>
      <div id="modal2" className="modal">
        <BalanceChange expense={false} date={date} />
      </div>
    </div>
  );
};
export default BalanceContainer;
