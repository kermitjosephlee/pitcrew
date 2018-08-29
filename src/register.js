import React, { Component } from "react";
// import { Route, Switch, Redirect } from "react-router-dom";

class Register extends Component {
  handleRegistration(e) {
    e.preventDefault();
    const data = {
      username: this.refs.username.value,
      password: this.refs.password.value,
      type: this.refs.user.value
    };
    this.props.onRegister(data);
  }

  render() {
    return (
      <form onSubmit={this.handleRegistration.bind(this)}>
        <h3> Register </h3>{" "}
        <select ref="user" placeholder="Enter User">
          <option value="Dispatch">Dispatch</option>
          <option value="Technician">Technician</option>
        </select>
        <input type="text" ref="username" placeholder="enter you username" />
        <input type="password" ref="password" placeholder="enter password" />
        <input type="submit" value="Register" />
      </form>
    );
  }
}

export default Register;
