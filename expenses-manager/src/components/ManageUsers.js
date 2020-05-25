/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { setLoading } from "../features/users/AuthSlice";
import { getFromStorage } from "../utils/storage";

export const ManageUsers = ({ auth, setLoading }) => {
  const history = useHistory();

  const [users, setUsers] = useState([]);

  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("Component Manage users did mount...");
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;
      setLoading();
      fetch("http://192.168.100.11:8080/api/users", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            setUsers(json.users);
          }
          setMessage(json.message);
        });
      setLoading();
    }
  }, []);

  const deleteUser = (id) => {
    setLoading();
    fetch(`http://192.168.100.11:8080/api/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + auth.token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setUsers([...users.filter((u) => u._id !== json.user._id)]);
          setMessage(json.message)
        }
        setMessage(json.message)
      });
    setLoading();
  };

  return (
    <div style={{minHeight: "800px"}}>
      <center>
        <h1>Manage Users</h1>{message && (
              <div
                style={{ fontSize: "18px" }}
              >
                {message}
              </div>
            )}
      </center>
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
            <span className="card-title activator grey-text text-darken-4">
              {user.name}
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
                onClick={() => deleteUser(user._id)}
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
});

const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: () => dispatch(setLoading()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);
