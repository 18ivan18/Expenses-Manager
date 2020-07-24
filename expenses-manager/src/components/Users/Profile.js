import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { changeLoading } from "../../features/loading/loadingSlice";
import { fetchUserById } from "../../features/users/UsersSlice";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { parseDate } from "../../utils/dateParser";
import KickstarterCard from "../Kickstarters/KickstarterCard";

export const Profile = ({
  auth,
  changeLoading,
  user,
  fetchUserById,
  kickstarters,
}) => {
  const { id } = useParams();
  useEffect(() => {
    console.log("Component Profile did mount...");
    if (auth.loggedIn && auth.token) {
      changeLoading();
      fetchUserById({ id, token: auth.token }).then(() => changeLoading());
    }
  }, [auth, id]);

  //TODO on image error
  const onImgError = () => {
    // setUser({
    //   ...user,
    //   profilePicture:
    //     "https://image.shutterstock.com/image-vector/male-silhouette-avatar-profile-picture-260nw-199246382.jpg",
    // });
  };

  const [filteredKickstarters, setFilteredKickstarters] = useState([]);

  useEffect(() => {
    if (kickstarters && user) {
      setFilteredKickstarters(
        kickstarters.filter((ks) => ks.authorId === user._id)
      );
    }
  }, [kickstarters, auth, user]);

  const loggedInUser = (id) => {
    return id === auth.user._id;
  };

  const history = useHistory();

  return (
    <center>
      {!auth.loggedIn && <Redirect to="/login"></Redirect>}
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
        {auth.loggedIn && user && (
          <div>
            <div className="col s12">
              <h3 className="indigo-text">{`${
                loggedInUser(user._id) ? "Welcome " : ""
              }${user.name}`}</h3>
              <div className="row"></div>
              <img
                alt=""
                onError={onImgError}
                style={{ height: "150px", width: "150px" }}
                className="responsive-img circle"
                src={user.profilePicture}
              />
              {loggedInUser(user._id) && (
                <button
                  className="btn waves-effect waves-light indigo right"
                  onClick={() => history.push(`/editUser/${user._id}`)}
                >
                  Edit
                </button>
              )}
            </div>

            <div className="row">
              <div className="col s12 z-depth-1 grey lighten-4">
                <h4 className="row left">About:</h4>
                <ul className="col s12" style={{ fontSize: "20px" }}>
                  <li className="left">{`Gender: ${
                    user.gender === "M" ? "Male" : "Female"
                  }`}</li>
                  <br />
                  <li className="left">{`Role: ${user.role}`}</li>
                  <br />
                  <li className="left">{`Joined: ${parseDate(
                    user.registerDate
                  )}`}</li>
                  <br />
                  <li className="left">{`Email: ${user.email}`}</li>
                </ul>
                <div className="col">
                  <h4 className="left row">Description:</h4>
                  <div>
                    <p className="left row" style={{fontSize: "20px", color: "#808080"}}>{user.description}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col s12 z-depth-1 grey lighten-4">
              <h4 className="col">Created:</h4>
              {filteredKickstarters.map((ks) => (
                <div key={ks._id} className="col s12">
                  <KickstarterCard kickstarter={ks}></KickstarterCard>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </center>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.users.targetUser,
  kickstarters: state.kickstarters.kickstarters,
});

const mapDispatchToProps = (dispatch) => {
  return {
    changeLoading: () => dispatch(changeLoading()),
    fetchUserById: (id, token) => dispatch(fetchUserById(id, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
