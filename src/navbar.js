import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const TopNav = props => (
  <Fragment>
    <button>
      <Link to="/">Home</Link>
    </button>
    <button>
      <Link to="/login">Log In</Link>
    </button>
  </Fragment>
);

export default TopNav;
