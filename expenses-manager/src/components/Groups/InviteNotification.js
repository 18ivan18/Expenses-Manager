import React from "react";
import { connect } from "react-redux";
import {
  getGroupsByUserId,
  getAllInvites,
  handleInvite,
} from "../../features/groups/GroupSlice";
import { changeLoading } from "../../features/loading/loadingSlice";

const InviteNotification = ({
  invites,
  changeLoading,
  handleInvite,
  getAllInvites,
  getGroupsByUserId,
  auth,
}) => {
  return (
    <React.Fragment>
      <a
        className="dropdown-trigger"
        data-target="notifications"
        style={{ color: "white" }}
        onClick={() => {
          if (invites.length === 0)
            window.M.toast({
              html: `<div>No new notifications</div>`,
              classes: "rounded",
              displayLength: 8000,
            });
        }}
      >
        Notifications
        {invites.length !== 0 && (
          <span className="new badge">{invites.length}</span>
        )}
        <i className="material-icons right small">notifications</i>
      </a>

      <ul id="notifications" className="dropdown-content">
        {invites &&
          invites.map((invite) => (
            <li key={invite._id} style={{ maxWidth: "400px" }}>
              <div>
                You have new invite from{" "}
                <span style={{ fontWeight: "bold" }}>{invite.from.name}</span>{" "}
                for group "{invite.group.name}"
                <div className="buttons right">
                  <button
                    className="btn-small green"
                    onClick={async () => {
                      changeLoading();
                      await handleInvite({
                        invite,
                        token: auth.token,
                        isAccepted: true,
                      });
                      await getAllInvites({
                        id: auth.user._id,
                        token: auth.token,
                      });
                      await getGroupsByUserId({
                        id: auth.user._id,
                        token: auth.token,
                      }).then(() => changeLoading());
                    }}
                  >
                    Accept
                  </button>
                  <button
                    className="btn-small red"
                    onClick={async () => {
                      changeLoading();
                      await handleInvite({
                        invite,
                        token: auth.token,
                        isAccepted: false,
                      });
                      await getAllInvites({
                        id: auth.user._id,
                        token: auth.token,
                      });
                      await getGroupsByUserId({
                        id: auth.user._id,
                        token: auth.token,
                      }).then(() => changeLoading());
                    }}
                  >
                    Decline
                  </button>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </React.Fragment>
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
    handleInvite: (invite, token, isAccepted) =>
      dispatch(handleInvite(invite, token, isAccepted)),
  };
};

export default React.memo(
  connect(mapStateToProps, mapDispatchToProps)(InviteNotification)
);
