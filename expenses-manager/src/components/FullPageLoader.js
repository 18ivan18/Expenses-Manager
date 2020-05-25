import React from "react";
import { connect } from "react-redux";
import LoaderGif from "../assests/loading.gif";
import "../css/loading.css"

export const FullPageLoader = ({ auth }) => {
  return (
    auth.loading && (
      <div className="loader-container">
        <div className="loader">
          <img alt="Loading spinner" src={LoaderGif} />
        </div>
      </div>
    )
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(FullPageLoader);
