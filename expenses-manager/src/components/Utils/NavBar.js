/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../../assests/logo.jpg";
import { logoutUser } from "../../features/users/AuthSlice";
import { changeLoading } from "../../features/loading/loadingSlice";
import InviteNotifications from "../../components/Groups/InviteNotification";
import GroupsDropdown from "../Groups/GroupsDropdown";

const NavBar = ({ auth, changeLoading, invites, logoutUser }) => {
  useEffect(() => {
    console.log("Component Navbar did mount...");

    let elems = document.querySelectorAll(".sidenav");
    window.M.Sidenav.init(elems, {});
  }, []);

  useEffect(() => {
    const elems = document.querySelectorAll(".dropdown-trigger");
    window.M.Dropdown.init(elems, {
      constrainWidth: false,
      coverTrigger: false,
    });
  }, [auth.loggedIn]);

  const logout = async () => {
    changeLoading();
    await logoutUser();
    changeLoading();
  };

  return (
    <React.Fragment>
      <div className="navbar">
        <nav role="navigation" className="orange">
          <div className="nav-wrapper">
            <Link to="/" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </Link>
            <Link to="/" className="brand-logo">
              <img
                style={{ width: "64px", height: "64px", position: "relative" }}
                src={Logo}
              />
            </Link>
            <a
              className="dropdown-trigger left"
              data-target="kickstarters"
              style={{ marginLeft: "80px" }}
            >
              Kickstarters
              <i className="material-icons right small">desktop_mac</i>
            </a>
            <ul className="right hide-on-med-and-down">
              {!auth.loggedIn && (
                <React.Fragment>
                  <li>
                    <Link to="/login">
                      Sign in
                      <i className="material-icons right small">play_arrow</i>
                    </Link>
                  </li>
                  <li>
                    <Link to="/register">
                      Sign up
                      <i className="material-icons right small">person_add</i>
                    </Link>
                  </li>
                </React.Fragment>
              )}
              {auth.loggedIn && (
                <React.Fragment>
                  <li>
                    <InviteNotifications></InviteNotifications>
                  </li>
                  <li>
                    <GroupsDropdown></GroupsDropdown>
                  </li>
                  <li>
                    <Link to={`/balance`}>
                      My balance
                      <i className="material-icons right small">
                        account_balance
                      </i>
                    </Link>
                  </li>
                  {auth.user.role === "admin" && (
                    <li>
                      <Link to={`/users`}>
                        Users
                        <i className="material-icons right small">
                          verified_user
                        </i>
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link to={`/profile/${auth.user._id}`}>
                      <span style={{ fontSize: "15px" }}>
                        {auth.user.name.split(" ")[0]}
                      </span>
                      <img
                        className="responsive-img circle"
                        style={{
                          width: "24px",
                          height: "24px",
                          verticalAlign: "middle",
                          marginLeft: "15px",
                        }}
                        src={auth.user.profilePicture}
                      ></img>
                    </Link>
                  </li>
                  <li onClick={() => logout()}>
                    <Link className="btn" to="/">
                      Logout
                      <i className="material-icons right small">exit_to_app</i>
                    </Link>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
        </nav>
      </div>

      <ul className="sidenav" id="mobile-demo">
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>

      <ul id="kickstarters" className="dropdown-content">
        <li>
          <Link to={`/kickstarters`}>Explore</Link>
        </li>
        <li>
          <Link to={`/createKickstarter`}>Start a project</Link>
        </li>
      </ul>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  invites: state.groups.invites,
});

const mapDispatchToProps = (dispatch) => {
  return {
    changeLoading: () => dispatch(changeLoading()),
    logoutUser: () => dispatch(logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
