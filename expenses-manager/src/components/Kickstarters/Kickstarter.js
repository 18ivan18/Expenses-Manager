import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import Progress from "../Utils/Progress";
import { BalanceChange } from "../Balances/BalanceChange";
import { getKickstarterById } from "../../features/kickstarters/kickstarterSlice";
import { changeLoading } from "../../features/loading/loadingSlice";
import ExpensesAPI from "../../API/ExpensesAPI";
import { daysLeft } from "../../utils/dateParser";

export const Kickstarter = ({
  kickstarter,
  getKickstarterById,
  auth,
  changeLoading,
}) => {
  const { id } = useParams();
  useEffect(() => {
    console.log("Component Kickstarter mounted...");
    changeLoading();
    getKickstarterById(id).then(() => changeLoading());
  }, []);

  useEffect(() => {
    const elems = document.querySelectorAll(".modal");
    window.M.Modal.init(elems, {});
    kickstarter &&
      settimeLeft(daysLeft(new Date().toString(), kickstarter.endDate));
  }, [kickstarter]);

  const history = useHistory();
  const [timeLeft, settimeLeft] = useState(null);

  const deleteKickstarter = async (id) => {
    const result = await ExpensesAPI.deleteKickstarter(id, auth.token);
    if (result.success) {
      history.goBack();
    }
  };

  return (
    <div>
      {kickstarter && (
        <div className="container">
          <div
            className="row z-depth-1 grey lighten-4"
            style={{ minHeight: "600px" }}
          >
            <div className="col s12" style={{ textAlign: "center" }}>
              <span
                className="flow-text"
                style={{ textAlign: "center", fontWeight: "bold" }}
              >
                {kickstarter.name}
                <div>{kickstarter.shortDescription}</div>
              </span>
            </div>
            <div className="col s6">
              <img
                className="responsive-img"
                style={{ height: "350px" }}
                src={kickstarter.picture}
              />
            </div>
            <div className="col s6">
              <div className="row">
                <Progress
                  bgcolor="pink"
                  completed={kickstarter.pledged}
                  outOf={kickstarter.goal}
                  height="20px"
                  width="95%"
                ></Progress>
                <span>${kickstarter.pledged}</span>
                <br></br>
                <span>pledged of ${kickstarter.goal} goal</span>
              </div>

              {timeLeft >= 0 && (
                <div className="row">
                  <span>
                    {daysLeft(new Date().toString(), kickstarter.endDate)}
                  </span>
                  <br></br>
                  <span> days to go</span>
                </div>
              )}

              {timeLeft < 0 && (
                <div className="row">
                  <span style={{ fontWeight: "Bold" }}>Expired</span>
                </div>
              )}

              <div className="row">
                <span>{kickstarter.backers}</span>
                <br></br>
                <span>backings</span>
              </div>

              {timeLeft >= 0 && (
                <div className="row">
                  <button
                    className="btn modal-trigger"
                    data-target={kickstarter._id}
                    onClick={() => {
                      if (!auth.loggedIn) {
                        history.push("/login");
                      }
                    }}
                  >
                    Back this project
                  </button>
                </div>
              )}
            </div>{" "}
            {auth.loggedIn && auth.user._id === kickstarter.authorId && (
              <React.Fragment>
                <button
                  className="btn green"
                  onClick={() =>
                    history.push(`/kickstarter/edit/${kickstarter._id}`)
                  }
                >
                  Edit
                </button>
                <button
                  className="btn red"
                  onClick={() => deleteKickstarter(kickstarter._id)}
                >
                  Delete
                </button>
              </React.Fragment>
            )}
            <div className="col s6 offset-s4">
              By{" "}
              <Link
                style={{ color: "#000000" }}
                to={`/profile/${kickstarter.authorId}`}
              >
                {kickstarter.author.name}
              </Link>
            </div>
            <div className="col s12" style={{ marginTop: "24px" }}>
              {kickstarter.detailedDescription}
            </div>
          </div>

          <div id={kickstarter._id} className="modal">
            <BalanceChange
              expense={false}
              date={new Date()}
              category={kickstarter.name}
              cb={() => {
                getKickstarterById(id);
                document.body.style.overflow = "visible";
              }}
              userID={kickstarter.authorId}
              categoryPicture={kickstarter.picture}
              postTwice={true}
              secondID={auth.user && auth.user._id || null}
            />
          </div>
        </div>
      )}
      <div>Nothng to see</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  kickstarter: state.kickstarters.targetKickstarter,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getKickstarterById: (id) => dispatch(getKickstarterById(id)),
    changeLoading: () => dispatch(changeLoading()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Kickstarter);
