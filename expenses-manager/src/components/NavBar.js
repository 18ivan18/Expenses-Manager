/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../assests/logo.jpg";
import { login, setLoading, validateUser } from "../features/users/AuthSlice";
import { getFromStorage } from "../utils/storage";

const NavBar = ({ auth, setLoading, login, validateUser }) => {
  useEffect(() => {
    console.log("Component Navbar did mount...")
    const M = window.M;

    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems, {});

    
    validateUser();
  }, []);

  const history = useHistory();
  const logout = () => {
    setLoading();
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch("http://192.168.100.11:8080/api/account/logout", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            login({ loggedIn: false, user: null, token: null });
            history.push('/');
          }
        });
    }
    setLoading();
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
            <ul className="right hide-on-med-and-down">
              {!auth.loggedIn && (
                <React.Fragment>
                  <li>
                    <Link to="/login" style={{ margin: "0px 30px 0px 30px" }}>
                      Sign in
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      style={{ margin: "0px 30px 0px 30px" }}
                    >
                      Sign up
                    </Link>
                  </li>
                </React.Fragment>
              )}
              {auth.loggedIn && (
                <React.Fragment> 
                  <li>
                <Link to={`/balance`}>
                  My balance
                  <i className="material-icons right small">account_balance</i>
                </Link>
              </li>
                  <li>
                    <Link to={`/users`}>
                      Users
                      <i className="material-icons right small">verified_user</i>
                    </Link>
                  </li>
                  <li>
                    <Link to={`/profile/${auth.user._id}`}>
                      Profile
                      <i className="material-icons right small">android</i>
                    </Link>
                  </li>
                  <li onClick={() => logout()}>
                    <Link className="btn">
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
        <li>
          <Link to="/recepies">Recepies</Link>
        </li>
      </ul>
    </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
