/* eslint-disable */
import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import EditUser from "./components/EditUser";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Background from "./assests/background.jpg";
import { login, setLoading, validateUser } from "./features/users/AuthSlice";
import { connect } from "react-redux";
import ManageUsers from "./components/ManageUsers";
import BalanceContainer from "./components/BalanceContainer";
import FullPageLoader from "./components/FullPageLoader";

const App = ({ validateUser }) => {
  useEffect(() => {
    console.log("Component APP did mount...");
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "100% 100%",
      }}
    >
      <Router>
        <NavBar />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/profile/:id">
            <Profile />
          </Route>

          <Route path="/balance">
            <BalanceContainer />
          </Route>

          <Route path="/editUser/:id">
            <EditUser />
          </Route>

          <Route path="/users">
            <ManageUsers />
          </Route>

          <Route path="/register">
            <Register />
          </Route>
        </Switch>

        <FullPageLoader />
        <Footer />
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, pass, token) => dispatch(login(email, pass, token)),
    setLoading: () => dispatch(setLoading()),
    validateUser: () => dispatch(validateUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
