import React, { useState } from "react";
import ExpensesAPI from "../../API/ExpensesAPI";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth } from "../../features/users/AuthSlice.js";
import { changeLoading } from "../../features/loading/loadingSlice";
import { getGroupsByUserId } from "../../features/groups/GroupSlice";
import { useHistory } from "react-router-dom";

export default function CreateGroup() {
  const history = useHistory();
  const dispatch = useDispatch();
  const initialState = {
    name: "",
    goal: "",
    description: "",
    picture: "",
  };
  const [message, setMessage] = useState(undefined);
  const auth = useSelector(selectAuth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = async () => {
    try {
      dispatch(changeLoading());
      const result = await ExpensesAPI.createGroup(auth.token, {
        participents: [auth.user._id],
        ...formData,
      });
      setMessage(result.message);
      await dispatch(
        getGroupsByUserId({ id: auth.user._id, token: auth.token })
      );
      dispatch(changeLoading());
    } catch (error) {
      console.log(error);
    }

    setFormData(initialState);
  };

  return (
    <div className="z-depth-1 grey lighten-4 row container">
      <div style={{ minHeight: "600px" }}>
        <h1 style={{ fontFamily: "Times New Roamn", textAlign: "center" }}>
          Create new group
        </h1>
        <form>
          <input
            placeholder="Name"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            placeholder="Goal"
            id="goal"
            type="number"
            value={formData.goal}
            onChange={handleChange}
          />

          <textarea
            id="description"
            className="materialize-textarea"
            value={formData.description}
            onChange={handleChange}
            placeholder="Notes"
          ></textarea>

          <input
            placeholder="Picture"
            id="picture"
            value={formData.picture}
            onChange={handleChange}
          />
        </form>
      </div>
      <div>
        {message && (
          <div
            style={{ fontSize: "18px", textAlign: "center" }}
            className={message.success ? "green-text" : "red-text"}
          >
            {message}
          </div>
        )}
        <a
          className="waves-effect waves-green btn-flat left"
          onClick={() => history.goBack()}
        >
          Cancel
        </a>
        <a
          className="waves-effect waves-green btn-flat right"
          onClick={handleSubmit}
        >
          Create
        </a>
      </div>
    </div>
  );
}
