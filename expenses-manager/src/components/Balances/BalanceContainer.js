import React, { useEffect, useState } from "react";
import Incomes from "./Incomes";
import Balance from "./Balance";
import Payments from "./Payments";
import { connect } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../css/Balances/BalanceContainer.css";

const BalanceContainer = () => {
  useEffect(() => {
    console.log("Component Balance container did mount");
    const M = window.M;
    const elems = document.querySelectorAll(".tabs");
    M.Tabs.init(elems, {});
  }, []);

  const [date, setDate] = useState(new Date())

  // useEffect(() => {
  //   getPayments();
  // }, []);

  // const getPayments = () => {
  //   const obj = getFromStorage("the_main_app");
  //   if (obj && obj.token) {
  //     changeLoading();
  //     const { token } = obj;
  //     fetch("http://localhost:8080/api/account/verify", {
  //       method: "GET",
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((json) => {
  //         if (json.success) {
  //           fetch(
  //             `http://localhost:8080/api/balanceChanges/payment/${json.user._id}`,
  //             {
  //               method: "GET",
  //               headers: {
  //                 Authorization: "Bearer " + token,
  //               },
  //             }
  //           )
  //             .then((res) => res.json())
  //             .then((json) => {
  //               if (json.success) {
  //                 setPayments(json.result);
  //               }
  //             })
  //             .catch((err) => console.log(err));
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }
  //   changeLoading();
  // };

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
            <a href="#swipe-1" className="active">
              Incomes
            </a>
          </li>
          <li className="tab col s4">
            <a href="#swipe-2">Balance</a>
          </li>
          <li className="tab col s4">
            <a href="#swipe-3">Payments</a>
          </li>
        </ul>
        <div id="swipe-1" className="col s12" style={{backgroundColor: "white"}}>
          <Incomes date={date}/>
        </div>
        <div id="swipe-2" className="col s12">
          <Balance date={date}/>
        </div>
        <div id="swipe-3" className="col s12" style={{backgroundColor: "white"}}>
          <Payments date={date}/>
        </div>
      </div>
    </div>
  );
};
export default BalanceContainer;
