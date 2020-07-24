import React from "react";
import { connect } from "react-redux";
import "../../css/Utils/MulticolouredProgressBar.css"

const MulticolouredProgressBar = ({readings}) => {
  let values =
    readings &&
    readings.length &&
    readings.map((item, i) => {
      if (item.value > 0) {
        return (
          <div
            className="value"
            style={{ color: item.color, width: item.value + "%" }}
            key={i}
          >
            <span>{item.value}%</span>
          </div>
        );
      }
    });

  let calibrations =
    readings &&
    readings.length &&
    readings.map((item, i) => {
      if (item.value > 0) {
        return (
          <div
            className="graduation"
            style={{ color: item.color, width: item.value + "%" }}
            key={i}
          >
            <span>|</span>
          </div>
        );
      }
    });

  let bars =
    readings &&
    readings.length &&
    readings.map((item, i) => {
      if (item.value > 0) {
        return (
          <div
            className="bar"
            style={{ backgroundColor: item.color, width: item.value + "%" }}
            key={i}
          ></div>
        );
      }
    });

  let legends =
    readings &&
    readings.length &&
    readings.map((item, i) => {
      if (item.value > 0) {
        return (
          <div className="legend" key={i}>
            <span className="dot" style={{ color: item.color }}>
              ●
            </span>
            <span className="label">{item.name}</span>
          </div>
        );
      }
    });
  return (
    <div className="multicolor-bar">
      <div className="values">{values === "" ? "" : values}</div>
      <div className="scale">{calibrations === "" ? "" : calibrations}</div>
      <div className="bars">{bars === "" ? "" : bars}</div>
      <div className="legends">{legends === "" ? "" : legends}</div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MulticolouredProgressBar);
