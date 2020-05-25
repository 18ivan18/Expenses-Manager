import React, { useState } from "react";
import { connect } from "react-redux";
import { setLoading } from "../features/users/AuthSlice";
import { useParams, useHistory } from "react-router-dom";

export const EditUser = ({ auth, setLoading }) => {

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    Object.filter = (obj, predicate) =>
      Object.keys(obj)
        .filter((key) => predicate(obj[key]))// eslint-disable-next-line
        .reduce((res, key) => ((res[key] = obj[key]), res), {});

    const filtered = Object.filter(formFields, (field) => field !== "");
    if (filtered.firstName || filtered.lastName) {
      filtered.name = filtered.firstName + " " + filtered.lastName;
    }
    // console.log(filtered);
    setLoading();
    fetch(`http://192.168.100.11:8080/api/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      },
      body: JSON.stringify(filtered),
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log("json", json);
        seteditState({
          editMessage: json.message,
          success: json.success,
        });
        setLoading();
      });
  };

  const [editState, seteditState] = useState({
    editMessage: "",
    success: false,
  });

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    description: "",
    gender: "",
    validity: "",
    role: "",
    profilePicture: "",
  });
  const { id } = useParams();
  return (
    <center>
      <div
        className="z-depth-1 grey lighten-4 row"
        style={{
          minHeight: "800px",
          width: "800px",
          display: "inline-block",
          padding: "32px 48px 0px 48px",
          border: "1px solid #EEE",
        }}
      >
        <div>
          <h1 className="indigo-text">Edit your account</h1>
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                    value={formFields.email}
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="gender"
                    name="gender"
                    type="text"
                    className="validate"
                    onChange={handleChange}
                    value={formFields.gender}
                  />
                  <label htmlFor="email">Gender</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="role"
                    name="role"
                    type="text"
                    className="validate"
                    onChange={handleChange}
                    value={formFields.role}
                  />
                  <label htmlFor="role">Role</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="description"
                    name="description"
                    type="text"
                    className="validate"
                    onChange={handleChange}
                    value={formFields.description}
                  />
                  <label htmlFor="description">Description</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="profilePicture"
                    name="profilePicture"
                    type="text"
                    className="validate"
                    onChange={handleChange}
                    value={formFields.profilePicture}
                  />
                  <label htmlFor="profilePicture">Profile picture</label>
                </div>
              </div>
              {/*PASSWORD*/}
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="validate"
                    onChange={handleChange}
                    value={formFields.password}
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
            </form>

            <button
              className="btn waves-effect waves-light indigo"
              name="Register"
              onClick={() => history.goBack()}
              style={{ margin: "0px 170px 0px 0px" }}
            >
              Cancel
              <i className="material-icons right">cancel</i>
            </button>
            <button
              className="btn waves-effect waves-light indigo"
              name="Register"
              onClick={handleSubmit}
              style={{ margin: "0px 0px 0px 170px" }}
            >
              Edit
              <i className="material-icons right">send</i>
            </button>
            {editState.editMessage && (
              <div
                style={{ fontSize: "18px" }}
                className={editState.success ? "green-text" : "red-text"}
              >
                {editState.editMessage}
              </div>
            )}
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
