/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../assests/logo.jpg";
import "../css/Login.css";
import { setInStorage } from "../utils/storage";
import { login, setLoading } from "../features/users/AuthSlice";

const Login = ({ auth, login, setLoading }) => {
  const validator = require("email-validator");

  const useFormFields = (initialValues) => {
    const [formFields, setFormFields] = useState(initialValues);
    const createChangeHandler = (e) =>
      setFormFields({ ...formFields, [e.target.name]: e.target.value });
    return { formFields, createChangeHandler };
  };

  const { formFields, createChangeHandler } = useFormFields({
    email: "",
    password: "",
  });

  const [loginState, setLoginState] = useState({
    submitted: false,
    loginSuccessful: false,
    loginError: "",
  });

  const history = useHistory();

  const emailValid = () => validator.validate(formFields.email);

  const passwordValid = () => formFields.password.length >= 8;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginState({ ...loginState, submitted: true });
    if (emailValid() && passwordValid()) {
      setLoading();
      fetch("http://localhost:8080/api/account/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formFields.email,
          password: formFields.password,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log("json", json);
          if (json.success) {
            login({ loggedIn: true, user: json.user, token: json.token });
            setInStorage('the_main_app', { token: json.token });    
            setLoading();
            history.push("/");
          } else {
            setLoginState({
              ...loginState,
              loginError: json.message,
              submitted: true,
            });
            setLoading();
          }
        });
    }
  };

  return (
    <center>
      <div
        className="z-depth-1 grey lighten-4 row"
        style={{
          height: "800px",
          width: "800px",
          display: "inline-block",
          padding: "32px 48px 0px 48px",
          border: "1px solid #EEE",
        }}
      >
        {auth.loading && <h1>Loading</h1>}
        <img
          className="responsive-img"
          style={{ width: "250px", margin: "10px" }}
          src={Logo}
        />
        <div className="section"></div>

        <h5 className="indigo-text">Please, login into your account</h5>
        <div className="section"></div>

        <div className="container">
          {emailValid() && passwordValid() && !loginState.loginSuccessful && (
            <div style={{ fontSize: "13px" }} className="red-text small">
              The username and password you entered did not match our records.
              Please double-check and try again. {loginState.loginError}
            </div>
          )}
          <form className="col s12" method="post">
            <div className="row">
              <div className="col s12"></div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  className="validate"
                  type="email"
                  id="email"
                  name="email"
                  value={formFields.email}
                  onChange={createChangeHandler}
                />
                <label htmlFor="email">Enter your email</label>
                {loginState.submitted && !emailValid() && (
                  <div
                    style={{ fontSize: "13px" }}
                    className="red-text small right-align"
                  >
                    Enter a valid email.
                  </div>
                )}
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  className="validate"
                  type="password"
                  id="password"
                  name="password"
                  value={formFields.password}
                  onChange={createChangeHandler}
                />
                <label htmlFor="password">Enter your password</label>
                {loginState.submitted && !passwordValid() && (
                  <div
                    style={{ fontSize: "13px" }}
                    className="red-text small right-align"
                  >
                    Your password must be atleast 8 characters long.
                  </div>
                )}
              </div>
              <label style={{ float: "right" }}>
                <Link className="pink-text">
                  <b>Forgot Password?</b>
                </Link>
              </label>
            </div>

            <br />
            <center>
              <div className="row">
                <button
                  type="submit"
                  name="btn_login"
                  className="col s12 btn btn-large waves-effect indigo"
                  onClick={handleSubmit}
                >
                  Login
                </button>
              </div>
            </center>
          </form>
          <Link to="/register">Create account</Link>
        </div>
      </div>
    </center>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
