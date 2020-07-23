/* eslint-disable */
import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/Utils/NavBar";
import Footer from "./components/Utils/Footer";
import Login from "./components/Login";
import EditUser from "./components/EditUser";
import Register from "./components/Register";
import Profile from "./components/Users/Profile";
import Background from "./assests/background.jpg";
import { validateUser } from "./features/users/AuthSlice";
import { connect } from "react-redux";
import ManageUsers from "./components/Users/ManageUsers";
import BalanceContainer from "./components/Balances/BalanceContainer";
import FullPageLoader from "./components/FullPageLoader";
import Groups from "./components/Groups/Groups";
import Kickstarters from "./components/Kickstarters/Kickstarters";
import Kickstarter from "./components/Kickstarters/Kickstarter";
import CreateKickstarter from "./components/Kickstarters/CreateKickstarter";
import KickstarterEdit from "./components/Kickstarters/KickstarterEdit";
import CreateGroup from "./components/Groups/CreateGroup";
import { getAllKickstarters } from "./features/kickstarters/kickstarterSlice";
import { getAllInvites } from "./features/groups/GroupSlice";
import {
  getIncomes,
} from "./features/Payments/BalanceSlice";

const App = ({ validateUser, getAllKickstarters, getAllInvites, auth, getIncomes }) => {
  useEffect(() => {
    console.log("Component APP did mount...");
    validateUser();
    getAllKickstarters();
  }, []);

  useEffect(() => {
    if (auth.loggedIn) {
      getAllInvites({ id: auth.user._id, token: auth.token });
      getIncomes(auth)
    }
  }, [auth]);

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

          <Route path="/groups">
            <Groups />
          </Route>

          <Route path="/createGroup">
            <CreateGroup />
          </Route>

          <Route path="/balance">
            <BalanceContainer />
          </Route>

          <Route path="/kickstarters">
            <Kickstarters />
          </Route>

          <Route path="/createKickstarter">
            <CreateKickstarter />
          </Route>

          <Route path="/kickstarter/edit/:id">
            <KickstarterEdit />
          </Route>

          <Route path="/kickstarter/:id">
            <Kickstarter />
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
    validateUser: () => dispatch(validateUser()),
    getAllKickstarters: () => dispatch(getAllKickstarters()),
    getAllInvites: (id, token) => dispatch(getAllInvites(id, token)),
    getIncomes: (auth) => dispatch(getIncomes(auth))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
