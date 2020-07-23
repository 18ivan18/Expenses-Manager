import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getKickstarterById } from "../../features/kickstarters/kickstarterSlice";
import ExpensesAPI from "../../API/ExpensesAPI";

export const KickstarterEdit = ({ auth, kickstarter, getKickstarterById }) => {
  const { id } = useParams();
  const initialState = {
    name: "",
    picture: "",
    shortDescription: "",
    detailedDescription: "",
    goal: "",
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const [formData, setFormData] = useState(initialState);
  const [message, setMessage] = useState(undefined);

  useEffect(() => {
    getKickstarterById(id);
    const elems = document.querySelector(`#endDate`);
    window.M.Datepicker.init(elems, {});
  }, []);

  useEffect(() => {
    if (kickstarter) {
      setFormData({
        name: kickstarter.name,
        picture: kickstarter.picture,
        shortDescription: kickstarter.shortDescription,
        detailedDescription: kickstarter.detailedDescription,
        goal: kickstarter.goal,
      });
    }
  }, [kickstarter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endDate = document.getElementById("endDate").value;
    try {
      const result = await ExpensesAPI.updateKickstarter(
        kickstarter._id,
        auth.token,
        {
          ...formData,
          endDate,
        }
      );
      setMessage(result.message);
      if (result.success) setFormData(initialState);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="z-depth-1 grey lighten-4 row">
      {!auth.loggedIn && <Redirect to="/login"></Redirect>}
      <h1>Create kickstarter</h1>
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input
                placeholder="Placeholder"
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
              <label htmlFor="bame">Name</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                id="picture"
                type="text"
                value={formData.picture}
                onChange={handleChange}
              />
              <label htmlFor="picture">Picture</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                id="shortDescription"
                type="text"
                value={formData.shortDescription}
                onChange={handleChange}
              />
              <label htmlFor="shortDescription">Short description</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <textarea
                id="detailedDescription"
                type="text"
                value={formData.detailedDescription}
                onChange={handleChange}
              />
              <label htmlFor="detailedDescription">Detailed description</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="goal"
                type="number"
                value={formData.goal}
                onChange={handleChange}
              />
              <label htmlFor="goal">Goal</label>
            </div>
          </div>
          <input id="endDate" type="text" className="datepicker"></input>
          <button className="btn" onClick={handleSubmit}>
            Create
          </button>
          {message && (
            <div
              style={{ fontSize: "18px" }}
              className={message.success ? "green-text" : "red-text"}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  kickstarter: state.kickstarters.targetKickstarter,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getKickstarterById: (id) => dispatch(getKickstarterById(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KickstarterEdit);
