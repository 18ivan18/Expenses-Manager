import React from "react";
import { Link } from "react-router-dom";

export default function KickstarterCard({ kickstarter }) {
  return (
    <div>
      <div className="card sticky-action">
        <div className="card-image">
          <img src={kickstarter.picture} style={{ height: "350px" }} />
        </div>
        <span className="card-title">
          <Link
            style={{ color: "#000000" }}
            to={`/kickstarter/${kickstarter._id}`}
          >
            <span className="truncate">{kickstarter.name}</span>
          </Link>
        </span>
        <div
          className="card-content"
          style={{ paddingTop: "5px", paddingLeft: "0px" }}
        >
          <p className="green-text darken-5">
            Funded {((kickstarter.pledged / kickstarter.goal) * 100).toFixed()}%
          </p>
          <p
            className="truncate"
            style={{ marginLeft: "24px", marginTop: "24px" }}
          >
            {kickstarter.detailedDescription}
          </p>
          <br></br>
          <p style={{ marginLeft: "24px" }}>
            By{" "}
            <Link
              style={{ color: "#000000" }}
              to={`/profile/${kickstarter.authorId}`}
            >
              {kickstarter.author.name}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
