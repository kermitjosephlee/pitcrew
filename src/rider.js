import React, { Component } from "react";
import $ from "jquery";
import { Route, Switch, Redirect, Link } from "react-router-dom";

class Rider extends Component {
  onSignOut(e) {
    this.props.signOut();
  }
  // callDispatch() {
  //   $.ajax({
  //     url: "http://localhost:8080/call_dispatch",
  //     type: "POST",
  //     data: {
  //       username: username,
  //       password: password
  //     }
  //   });
  // }

  render() {
    if (!this.props.user.login) {
      return <Redirect from="/rider" to="/login" />;
    }
    return (
      <div>
        <h2> Rider Page </h2> <p> WELCOME RIDER! </p>{" "}
        {/* <button onclick={this.callDispatch()}> Press for Assistance </button>{" "} */}
        <a href="javascript:;" onClick={this.onSignOut.bind(this)}>
          Sign out{" "}
        </a>{" "}
      </div>
    );
  }
}

export default Rider;
