import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import ExpensesAPI from "../../API/ExpensesAPI";

export const CreateKickstarter = ({ auth }) => {
    const history = useHistory();
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
    const elems = document.querySelector(`#endDate`);
    window.M.Datepicker.init(elems, {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endDate = document.getElementById("endDate").value;
    try {
      const result = await ExpensesAPI.createKickstarter(auth.token, {
        ...formData,
        endDate,
      });
      setMessage(result.message);
      setFormData(initialState)
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="z-depth-1 grey lighten-4 row container">
      {!auth.loggedIn && <Redirect to="/login"></Redirect>}
      <h1>Create kickstarter</h1>
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input
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
          <input id="endDate" type="text" className="datepicker" placeholder="Kickstarter open until"></input>
          <a className="btn-flat right" onClick={handleSubmit}>
            Create
          </a>
          <a className="waves-effect waves-green btn-flat left" onClick={() => history.goBack()}>
          Cancel
        </a>
          {message && (
            <div
              style={{ fontSize: "18px", textAlign: "center" }}
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
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CreateKickstarter);
