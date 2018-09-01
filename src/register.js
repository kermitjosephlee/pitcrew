import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Register extends Component {
  handleRegistration(e) {
    e.preventDefault();
    const data = {
      username: this.refs.username.value,
      password: this.refs.password.value,
      type: this.refs.type.value
    };
    this.props.onRegister(data);
  }

  render() {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      const page = `/${user.type}`;
      console.log(user);
      return <Redirect from="/login" to={page} />;
    }
    return (
      <form onSubmit={this.handleRegistration.bind(this)}>
        <h3> Register </h3>{" "}
        <select ref="type" placeholder="Enter User">
          <option value="Dispatch"> Dispatch </option>{" "}
          <option value="Technician"> Technician </option>{" "}
        </select>{" "}
        <input type="text" ref="username" placeholder="enter you username" />
        <input type="password" ref="password" placeholder="enter password" />
        <input type="submit" value="Register" />
      </form>
    );
  }
}

export default Register;
