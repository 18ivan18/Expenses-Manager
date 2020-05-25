import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setLoading } from "../features/users/AuthSlice";
import { useParams, useHistory } from "react-router-dom";
import { getFromStorage } from "../utils/storage";

export const Profile = ({ auth, setLoading }) => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  useEffect(() => {
    console.log("Component Profile did mount...");
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;
      setLoading();
      fetch(`http://192.168.100.11:8080/api/users/${id}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          // console.log("json", json);
          if (json.success) {
            setUser(json.user);
            setLoading();
          } else {
            setLoading();
          }
        });
    }
  }, []);

  const onImgError = () => {
    setUser({
      ...user,
      profilePicture:
        "https://image.shutterstock.com/image-vector/male-silhouette-avatar-profile-picture-260nw-199246382.jpg",
    });
  };

  const loggedInUser = (id) => {
    return id === auth.user._id;
  };

  const history = useHistory();

  return (
    <center>
      {auth.loading && <h1>Loading</h1>}
      <div
        className="z-depth-1 grey lighten-4 row"
        style={{
          width: "800px",
          minHeight: "800px",
          display: "inline-block",
          padding: "32px 48px 0px 48px",
          border: "1px solid #EEE",
        }}
      >
        {auth.loggedIn && (
          <div>
            <h3 className="indigo-text">{`${
              loggedInUser(user._id) ? "Welcome " : ""
            }${user.name}!!`}</h3>
            <img
              alt=""
              onError={onImgError}
              style={{ height: "500px", width: "500px" }}
              className="responsive-img"
              src={user.profilePicture}
            />
            <ul>
              <li>{`Gender: ${user.gender}`}</li>
              <li>{`Role: ${user.role}`}</li>
              <li>{`Description: ${user.description}`}</li>
              <li>{`Email: ${user.email}`}</li>
            </ul>
            {loggedInUser(user._id) && (
              <button
                className="btn waves-effect waves-light indigo"
                onClick={() => history.push(`/editUser/${user._id}`)}
              >
                Edit
              </button>
            )}
          </div>
        )}

        {auth.loading && (
          <div className="preloader-wrapper active">
            <div className="spinner-layer spinner-red-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
