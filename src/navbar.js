import React from "react";
import { Link } from "react-router-dom";

const TopNav = props => (
  <div>
    <Link to="/">Home</Link>
    <p> | </p>
    <Link to="/login">Log In</Link>
  </div>
);

export default TopNav;
