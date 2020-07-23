/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { changeLoading } from "../../features/loading/loadingSlice";
import { fetchAllUsers, deleteUser } from "../../features/users/UsersSlice";

export const ManageUsers = ({
  auth,
  users,
  message,
  changeLoading,
  fetchAllUsers,
  deleteUser,
}) => {
  const history = useHistory();
  useEffect(() => {
    console.log("Component Manage users did mount...");
    if (auth.loggedIn && auth.token) {
      changeLoading();
      fetchAllUsers(auth).then(() => changeLoading());
    }
  }, [auth]);

  return (
    <div style={{ minHeight: "800px" }}>
      <div className="z-depth-1 row white-text" style={{
          padding: "32px 48px 0px 48px",
          border: "1px solid",
          marginLeft: "600px",
          marginRight: "600px",
          opacity: "0.85",
          backgroundColor: "#7A6A60"
        }}>
        <div className="col s12">
          <h1 className="center">Manage Users</h1>
          {message && <div className="center" style={{ fontSize: "18px" }}>{message}</div>}
        </div>
      </div>
      {users.map((user) => (
        <div
          className="card horizontal"
          style={{ opacity: "0.95" }}
          key={user._id}
        >
          <div className="card-image waves-effect waves-block waves-light">
            <img
              className="activator"
              style={{ width: "400px", height: "400px" }}
              src={user.profilePicture}
            />
          </div>

          <div className="card-content">
            <span className="card-title grey-text text-darken-4">
              <Link style={{ color: "#000000" }} to={`/profile/${user._id}`}>
                {user.name}
              </Link>
            </span>
            <p>{user.description}</p>
            <div style={{ position: "absolute", bottom: "15%", right: "1%" }}>
              <button
                className="btn green lighten-1"
                onClick={() => history.push(`/editUser/${user._id}`)}
              >
                Edit<i className="material-icons right">edit</i>
              </button>
              <button
                className="btn red darken-2"
                onClick={() => deleteUser({ id: user._id, auth })}
              >
                Delete <i className="material-icons right">delete</i>
              </button>
            </div>
          </div>

          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">
              Full sepcification of the user:
              <i className="material-icons right">close</i>
            </span>
            <ul>
              <li>
                <p>{`Name: ${user.name}`}</p>
              </li>
              <li>
                <p>{`Email: ${user.email}`}</p>
              </li>
              <li>
                <p>{`Gender: ${user.gender}`}</p>
              </li>
              <li>
                <p>{`Role: ${user.role}`}</p>
              </li>
              <li>
                <p>{`Account validity: ${user.validity}`}</p>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users.entities,
  message: state.users.error,
});

const mapDispatchToProps = (dispatch) => {
  return {
    changeLoading: () => dispatch(changeLoading()),
    fetchAllUsers: (auth) => dispatch(fetchAllUsers(auth)),
    deleteUser: (id, auth) => dispatch(deleteUser(id, auth)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);
