import React from "react";
import { Link } from "react-router-dom";

const TopNav = props => (
  <div>
    <button>
      <Link to="/">Home</Link>
    </button>
    <button>
      <Link to="/login">Log In</Link>
    </button>
  </div>
);

export default TopNav;
