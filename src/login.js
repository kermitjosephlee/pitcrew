import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

class Login extends Component {
  handleSignIn(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    this.props.onSignIn(username, password, true, "rider");
  }

  render() {
    if (this.state.user.login) {
      return <Redirect from="/login" to="/rider" />;
    }
    return (
      <form onSubmit={this.handleSignIn.bind(this)}>
        <h3>Sign in</h3>
        <input type="text" ref="username" placeholder="enter you username" />
        <input type="password" ref="password" placeholder="enter password" />
        <input type="submit" value="Login" />
      </form>
    );
  }
}

export default Login;
