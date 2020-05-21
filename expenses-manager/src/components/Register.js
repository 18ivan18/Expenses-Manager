import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setLoading } from "../features/users/AuthSlice";

import "../css/Register.css";

const Register = ({ auth, setLoading }) => {
  const useFormFields = (initialValues) => {
    const [formFields, setFormFields] = useState(initialValues);
    const createChangeHandler = (e) =>
      setFormFields({ ...formFields, [e.target.name]: e.target.value });
    return { formFields, createChangeHandler };
  };

  const { formFields, createChangeHandler } = useFormFields({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [registerState, setRegisterState] = useState({
    registerError: "",
  });

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formFields.firstName || !formFields.lastName) {
      setRegisterState({
        registerError: "Name cannot be empty.",
      });
      return;
    }
    if (!emailValid()) {
      setRegisterState({
        registerError: "Please enter a valid email.",
      });
      return;
    }
    if (!passwordValid()) {
      setRegisterState({
        registerError:
          "Password must be between 8 and 15 characters and contain small letter, capital letter, number and special sign.",
      });
      return;
    }
    setLoading();
    fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formFields.firstName + " " + formFields.lastName,
        email: formFields.email,
        password: formFields.password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("json", json);
        if (json.success) {
          setLoading();
          history.push("/");
        } else {
          setRegisterState({
            registerError: json.message,
          });
          setLoading();
        }
      });
  };
  const validator = require("email-validator");

  const emailValid = () => validator.validate(formFields.email);

  const passwordValid = () =>
    formFields.password.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
    );

  return (
    <center>
      <div
        className="z-depth-1 grey lighten-4 row"
        style={{
          height: "800px",
          display: "inline-block",
          padding: "32px 48px 0px 48px",
          border: "1px solid #EEE",
        }}
      >
        {auth.loading && (
          <div class="preloader-wrapper active">
            <div class="spinner-layer spinner-red-only">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div>
              <div class="gap-patch">
                <div class="circle"></div>
              </div>
              <div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
          </div>
        )}
        <h1 className="indigo-text">Create your account</h1>
        <div className="row">
          <form className="col s12">
            {/*NAME*/}
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons prefix">account_circle</i>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="validate"
                  onChange={createChangeHandler}
                  value={formFields.firstName}
                />
                <label htmlFor="firstName">First Name</label>
              </div>
              <div className="input-field col s6">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="validate"
                  onChange={createChangeHandler}
                  value={formFields.lastName}
                />
                <label htmlFor="lastName">Last Name</label>
              </div>
            </div>
            {/*EMAIL*/}
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">email</i>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="validate"
                  onChange={createChangeHandler}
                  value={formFields.email}
                />
                <label htmlFor="email">Email</label>

                {formFields.email && !emailValid() && (
                  <div
                    style={{ fontSize: "11px" }}
                    className="red-text small right-align"
                  >
                    Enter a valid email.
                  </div>
                )}
              </div>
            </div>
            {/*PASSWORD*/}
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">lock_outline</i>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="validate"
                  onChange={createChangeHandler}
                  value={formFields.password}
                />
                <label htmlFor="password">Password</label>

                {formFields.password && !passwordValid() && (
                  <div
                    style={{ fontSize: "11px" }}
                    className="red-text small right-align"
                  >
                    Password must be between 8 and 15 characters and contain
                    small letter, capital letter, number and special sign.
                  </div>
                )}
              </div>
            </div>
          </form>

          <button
            className="btn waves-effect waves-light indigo"
            name="Register"
            onClick={handleSubmit}
          >
            Register
            <i className="material-icons right">send</i>
          </button>

          {registerState.registerError && (
            <div style={{ fontSize: "11px" }} className="red-text">
              {registerState.registerError}
            </div>
          )}
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
    setLoading: () => dispatch(setLoading()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
