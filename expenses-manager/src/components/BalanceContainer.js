import React, { useEffect, useState } from "react";
import Incomes from "./Incomes";
import Balance from "./Balance";
import Payments from "./Payments";
import { connect } from "react-redux";
import { setLoading, validateUser } from "../features/users/AuthSlice";
import { getFromStorage } from "../utils/storage";

const BalanceContainer = ({ auth, setLoading, validateUser }) => {
  useEffect(() => {
    console.log("Component Balance container did mount");
    const M = window.M;
    const elems = document.querySelectorAll(".tabs");
    M.Tabs.init(elems, {});
  }, []);

  useEffect(() => {
    getIncomes();
    getPayments();
  }, []);

  const getIncomes = () => {
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      setLoading();
      const { token } = obj;
      fetch("http://192.168.100.11:8080/api/account/verify", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            console.log(json.user._id);
            fetch(
              `http://192.168.100.11:8080/api/balanceChanges/income/${json.user._id}`,
              {
                method: "GET",
                headers: {
                  Authorization: "Bearer " + token,
                },
              }
            )
              .then((res) => res.json())
              .then((json) => {
                if (json.success) {
                  setIncomes(json.result);
                }
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
    setLoading();
  };

  const getPayments = () => {
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      setLoading();
      const { token } = obj;
      fetch("http://192.168.100.11:8080/api/account/verify", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            fetch(
              `http://192.168.100.11:8080/api/balanceChanges/payment/${json.user._id}`,
              {
                method: "GET",
                headers: {
                  Authorization: "Bearer " + token,
                },
              }
            )
              .then((res) => res.json())
              .then((json) => {
                if (json.success) {
                  setPayments(json.result);
                }
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
    setLoading();
  };

  const [incomes, setIncomes] = useState([]);
  const [payments, setPayments] = useState([]);

  return (
    <div
      className="row"
      style={{
        minHeight: "800px",
        width: "100%",
        margin: "1px 0px 50px 0px",
        opacity: "0.95",
      }}
    > <div>
  </div>
      <div className="col s12">
        <ul id="tabs-swipe-demo" className="tabs">
          <li className="tab col s4">
            <a href="#swipe-1">Incomes</a>
          </li>
          <li className="tab col s4">
            <a className="active" href="#swipe-2">
              Balance
            </a>
          </li>
          <li className="tab col s4">
            <a href="#swipe-3">Payments</a>
          </li>
        </ul>
        <button onClick={getIncomes}>GET INCOMES</button>
        <div id="swipe-1" className="col s12 green">
          <Incomes incomes={incomes} />
        </div>
        <div id="swipe-2" className="col s12 yellow">
          <Balance />
        </div>
        <div id="swipe-3" className="col s12 red">
          <Payments payments={payments} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: () => dispatch(setLoading()),
    validateUser: () => dispatch(validateUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BalanceContainer);
