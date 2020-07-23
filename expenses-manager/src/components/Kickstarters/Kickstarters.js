import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllKickstarters } from "../../features/kickstarters/kickstarterSlice";
import { changeLoading } from "../../features/loading/loadingSlice";
import "../../css/Kickstarters/Kickstarters.css";
import KickstarterCard from "./KickstarterCard";

export const Kickstarters = ({
  kickstarters,
  getAllKickstarters,
  changeLoading,
}) => {
  const [filterValue, setFilterValue] = useState("");
  const [filteredKickstarters, setfilteredKickstarters] = useState([]);
  useEffect(() => {
    changeLoading();
    getAllKickstarters().then(() => changeLoading());
  }, []);

  useEffect(() => {
    setfilteredKickstarters(kickstarters);
  }, [kickstarters]);

  useEffect(() => {
    if (filterValue === "") {
      setfilteredKickstarters(kickstarters);
    } else if (kickstarters) {
      setfilteredKickstarters(
        kickstarters.filter(
          (ks) =>
            ks.author.name.match(filterValue) || ks.name.match(filterValue)
        )
      );
    }
  }, [filterValue]);

  return (
    <div style={{ minHeight: "800px" }}>
      <div className="container row z-depth-1 grey lighten-4">
        <h1>Kickstarters</h1>
        <div>
          <input
            id="search"
            placeholder="Search"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
          <button className="material-icons gray">search</button>
        </div>
      </div>{" "}
      <br></br>
      <div className="row" style={{ backgroundColor: "white" }}>
        {filteredKickstarters &&
          filteredKickstarters.map((kickstarter) => (
            <div className="col s4" key={kickstarter._id}>
              <KickstarterCard kickstarter={kickstarter}></KickstarterCard>
            </div>
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  kickstarters: state.kickstarters.kickstarters,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAllKickstarters: () => dispatch(getAllKickstarters()),
    changeLoading: () => dispatch(changeLoading()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Kickstarters);
