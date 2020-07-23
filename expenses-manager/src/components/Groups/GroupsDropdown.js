import React from "react";
import { Link } from "react-router-dom";

export default function GroupsDropdown() {
  return (
    <React.Fragment>
      <a className="dropdown-trigger" data-target="groups">
        Groups
        <i className="material-icons right small">group</i>
      </a>

      <ul id="groups" className="dropdown-content">
        <li>
          <Link to={`/groups`}>My groups</Link>
        </li>
        <li>
          <Link to={`/createGroup`}>Create new group</Link>
        </li>
      </ul>
    </React.Fragment>
  );
}
