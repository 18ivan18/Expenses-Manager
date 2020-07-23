import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Group from "./Group";
import {
  getGroupsByUserId,
  getAllInvites,
} from "../../features/groups/GroupSlice";
import { changeLoading } from "../../features/loading/loadingSlice";

export const Groups = ({
  groups,
  getGroupsByUserId,
  changeLoading,
  auth,
  getAllInvites,
}) => {
  useEffect(() => {
    console.log("Component groups did mount.");
    if (auth.loggedIn) {
      changeLoading();
      getAllInvites({ id: auth.user._id, token: auth.token });
      getGroupsByUserId({ id: auth.user._id, token: auth.token }).then(() =>
        changeLoading()
      );
    }
  }, [auth]);

  useEffect(() => {
    const elems = document.querySelectorAll(".modal");
    window.M.Modal.init(elems, {});
  }, []);

  const [showGroup, setShowGroup] = useState(undefined);

  useEffect(() => {
    if (groups && groups.length !== 0) setShowGroup(groups[0]);
    else setShowGroup(undefined);
  }, [groups]);

  return (
    <div style={{ minHeight: "800px" }}>
      {!showGroup && (
        <div
          className="col s12"
          style={{
            textAlign: "center",
            color: "indigo",
            fontSize: "30px",
            backgroundColor: "rgba(149, 185, 199,0.4)",
          }}
        >
          <p>You have no groups to show</p>
        </div>
      )}
      {showGroup && (
        <div className="row" style={{ opacity: "0.90" }}>
          <div
            className="col s2"
            style={{
              color: "white",
              backgroundColor: "#90A4AE",
              height: "900px",
              overflowY: "scroll",
            }}
          >
            {groups &&
              groups.map((group) => (
                <div
                  style={{
                    backgroundColor: "#A0B2BA",
                    width: "250px",
                    height: "70px",
                    borderRadius: "50% / 100%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  key={group._id}
                >
                  <div
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      lineHeight: "70px",
                      marginTop: 20,
                      marginBottom: 20,
                    }}
                  >
                    <div
                      onClick={() => setShowGroup(group)}
                      className="btn-flat"
                    >
                      {group.name}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div
            className="col s10"
            style={{
              backgroundColor: "#50A79A",
              height: "900px",
              overflowY: "scroll",
            }}
          >
            <Group group={showGroup} />
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  groups: state.groups.groups,
  invites: state.groups.invites,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getGroupsByUserId: (id, token) => dispatch(getGroupsByUserId(id, token)),
    changeLoading: () => dispatch(changeLoading()),
    getAllInvites: (id, token) => dispatch(getAllInvites(id, token)),
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(Groups));
