import React from "react";
import { useSelector } from "react-redux";
import { selectLoading } from "../features/loading/loadingSlice";
import LoaderGif from "../assests/loading.gif";
import "../css/loading.css";

export const FullPageLoader = () => {
  const loading = useSelector(selectLoading);
  return (
    loading && (
      <div className="loader-container">
        <div className="loader">
          <img alt="Loading spinner" src={LoaderGif} />
        </div>
      </div>
    )
  );
};

export default FullPageLoader;
