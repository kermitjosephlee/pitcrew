import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import db from "/Users/Mike/lighthouse/pitcrew/db/db.js";

class Register extends Component {
  handleRegistration(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    this.props.onRegister(username, password);
  }

  render() {
    return (
      <form onSubmit={this.handleRegistration.bind(this)}>
        <h3> Sign in </h3>{" "}
        <input type="text" ref="username" placeholder="enter you username" />
        <input type="password" ref="password" placeholder="enter password" />
        <input type="submit" value="Register" />
      </form>
    );
  }
}

export default Register;
