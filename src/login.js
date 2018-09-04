import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import $ from "jquery";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      fireRedirect: false
    };
  }
  signIn(data) {
    $.ajax({
      url: "http://localhost:8080/login",
      type: "POST",
      data,
      success: data => {
        if (data) {
          const tempUser = {
            username: data.username,
            login: true,
            type: data.type,
            id: data.id
          };
          localStorage.setItem("user", JSON.stringify(tempUser));
          this.setState({ fireRedirect: true });
        } else {
          alert("Username or Password does not exist");
        }
      },
      error: function(data) {
        console.log("fail");
      }
    });
  }

  handleSignIn = e => {
    e.preventDefault();

    navigator.geolocation.getCurrentPosition(position => {
      let data = {
        username: this.refs.username.value,
        password: this.refs.password.value,
        type: this.refs.type.value,
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.signIn(data);
    });
  };

  render() {
    const { fireRedirect } = this.state;
    const page = "";

    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      const page = `/${user.type}`;
      console.log(user);
      return <Redirect from="/login" to={page} />;
    }
    return (
      <form onSubmit={this.handleSignIn}>
        <h3> Sign in </h3>{" "}
        <select ref="type">
          <option value=""> Select... </option>{" "}
          <option value="Dashboard"> Dispatch </option>{" "}
          <option value="Technician"> Technician </option>{" "}
        </select>{" "}
        <input type="text" ref="username" placeholder="enter you username" />
        <input type="password" ref="password" placeholder="enter password" />
        <input type="submit" value="Login" />
        {fireRedirect && <Redirect from="/login" to={page} />}
      </form>
    );
  }
}

export default Login;
