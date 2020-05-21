import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Background from "./assests/background.jpg";
import { getFromStorage } from "./utils/storage";
import { login, setLoading } from "./features/users/AuthSlice";
import { connect } from "react-redux";

const App = ({ auth, login, setLoading }) => {
  useEffect(() => {
    console.log("Component did mount...");

    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      setLoading();
      fetch("http://localhost:8080/api/account/verify", {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token
        }
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            login({ loggedIn: true, user: json.user, token: json.token });
            setLoading();
          } else {
            setLoading();
          }
        });
    }
  }, []);

  return (
    <div style={{ backgroundImage: `url(${Background})` }}>
      <Router>
        <NavBar />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/register">
            <Register />
          </Route>
        </Switch>

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
