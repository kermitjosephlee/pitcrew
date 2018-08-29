import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

class Login extends Component {
  handleSignIn(e) {
    e.preventDefault();
    const data = {
      username: this.refs.username.value,
      password: this.refs.password.value,
      type: this.refs.type.value
    };
    this.props.onSignIn(data);
  }

  render() {
    if (this.props.user.login) {
      const page = `/${this.props.user.type}`;
      return <Redirect from="/login" to={page} />;
    }
    return (
      <form onSubmit={this.handleSignIn.bind(this)}>
        <h3>Sign in</h3>
        <select ref="type" valueDefault="Enter User">
          <option value="Rider">Rider</option>
          <option value="Dispatch">Dispatch</option>
          <option value="Technician">Technician</option>
        </select>
        <input type="text" ref="username" placeholder="enter you username" />
        <input type="password" ref="password" placeholder="enter password" />
        <input type="submit" value="Login" />
      </form>
    );
  }
}

export default Login;
