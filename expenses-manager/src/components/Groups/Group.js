import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ExpensesAPI from "../../API/ExpensesAPI";
import { getGroupsByUserId } from "../../features/groups/GroupSlice";
import { BalanceChange } from "../Balances/BalanceChange";
import Progress from "../Utils/Progress";
import { Link } from "react-router-dom";
import BalanceCard from "../Balances/BalanceCard";

export const Group = ({ auth, group, getGroupsByUserId }) => {
  const invitePeople = async () => {
    const participents = group.participents.map((part) => part._id);
    const userToInvite = data.find((obj) => obj.name === autocomplete);
    if (participents.indexOf(userToInvite.id) !== -1) {
      console.log("Already in that group!");
      return;
    }
    try {
      const result = await ExpensesAPI.inviteUserToGroup(
        userToInvite.id,
        group._id,
        auth.token
      );
      if(result.success) {
        window.M.toast({
          html: `<div>User '${result.result.name}' has been invited successfully.</div>`,
          classes: "success",
          displayLength: 8000,
        });
      }
      setAutocomplete("");
    } catch (error) {
      console.log(error);
    }
  };

  const leaveGroup = async () => {
    try {
      const upratedGroup = await ExpensesAPI.getGroupById(
        group._id,
        auth.token
      );
      upratedGroup.participents = upratedGroup.participents.filter(
        (part) => part !== auth.user._id
      );
      await ExpensesAPI.updateGroupById(group._id, auth.token, {
        participents: upratedGroup.participents,
      });
      getGroupsByUserId({ id: auth.user._id, token: auth.token });
      window.M.toast({
        html: `<div>You successfully left ${group.name}.</div>`,
        classes: "success",
        displayLength: 8000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    ExpensesAPI.findAllUsersList().then((resp) => {
      setData(resp.userList);
    });
    const elems = document.querySelectorAll(".modal");
    window.M.Modal.init(elems, {});
  }, []);

  useEffect(() => {
    const list = data;
    const result = {};
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      if (
        group.participents.map((part) => part._id).indexOf(element.id) === -1
      ) {
        result[element.name] = element.profilePicture;
      }
    }
    const elems = document.querySelector(`#autocomplete-input`);
    window.M.Autocomplete.init(elems, {
      data: result,
      onAutocomplete: () => {
        setAutocomplete(
          document.getElementById(`autocomplete-input`).value
        );
      },
    });
  }, [data, group]);

  const [autocomplete, setAutocomplete] = useState("");

  const handleChange = (e) => {
    setAutocomplete(e.target.value);
  };

  return (
    <div className="row">
      <div>
        {/* IMAGE */}
        <div className="image">
          {" "}
          <img
            className="responsive-img"
            style={{ width: "100%", height: "500px" }}
            src={group.picture}
          />
          <div
            className="col s2"
            style={{
              position: "relative",
              bottom: "80px",
              left: "16px",
              backgroundColor: "#808080",
              color: "white",
              textAlign: "center",
            }}
          >
            <p>{group.name}</p>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="col s12">
          <h1>Group description: </h1>
          <div>
            <p
              className="z-depth-1 col s12"
              style={{
                display: "inline-block",
                padding: "16px 16px 16px 16px",
                fontSize: "20px",
                minHeight: "200px",
              }}
            >
              {group.description}
            </p>
          </div>
        </div>

        {/* GOAL */}
        <div>
          <h1>Goal : {group.goal}</h1>
          <Progress
            bgcolor="pink"
            completed={group.payments.length === 0 ? 0 : group.payments
              .map((p) => p.amount)
              .reduce((accumulator, currentElem) => accumulator + currentElem)}
            outOf={group.goal}
            height="50px"
          ></Progress>
        </div>

        {/* PARTICIPENTS */}
        <h1>
          Supporters :{" "}
          {group.participents.map((user) => (
            <div style={{margin: "10px"}} key={user.name}><Link 
            style={{ color: "#000000" }} to={`/profile/${user._id}`}>${user.name}</Link></div>
          ))}
        </h1>

        <h1>
          Funds:{" "}
          {group.payments.map((fund) => (
            <BalanceCard balance={fund} key={fund._id}></BalanceCard>
          ))}
        </h1>
      </div>
      <div className="row">
        <div className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">textsms</i>
              <input
                type="text"
                id={`autocomplete-input`}
                className="autocomplete"
                onChange={handleChange}
                value={autocomplete}
              />
              <label htmlFor="autocomplete-input">User's name</label>
            </div>
            <button className="btn" onClick={() => invitePeople()}>
              Invite
            </button>
            <button className="btn red" onClick={() => leaveGroup()}>
              Leave group
            </button>
            <button className="btn green modal-trigger" data-target={group._id}>
              Donate money
            </button>
          </div>
        </div>
      </div>

      <div id={group._id} className="modal">
        <BalanceChange
          expense
          date={new Date()}
          cb={() => getGroupsByUserId({ id: auth.user._id, token: auth.token })}
          category={group.name}
          categoryPicture={group.picture}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getGroupsByUserId: (id, token) => dispatch(getGroupsByUserId(id, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);
