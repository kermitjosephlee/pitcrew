import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

class Rider extends Component {
  onSignOut(e) {
    this.props.signOut();
  }

  render() {
    if (!this.state.user.login) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <h2>Rider Page</h2>
        <p>welcome rider!</p>
        <a href="javascript:;" onClick={this.onSignOut.bind(this)}>
          Sign out
        </a>
      </div>
    );
  }
}

export default Rider;
