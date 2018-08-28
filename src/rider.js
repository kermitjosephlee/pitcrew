import React, { Component } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";

class Rider extends Component {
  onSignOut(e) {
    this.props.signOut();
  }

  render() {
    if (!this.props.user.login) {
      return <Redirect from="/rider" to="/login" />;
    }
    return (
      <div>
        <h2>Rider Page</h2>
        <p>welcome rider!</p>
        <a href="javascript:;" onClick={this.onSignOut.bind(this)}>
          Sign out
        </a>
        <button>
          <Link to="/login">Log In</Link>
        </button>
      </div>
    );
  }
}

export default Rider;
