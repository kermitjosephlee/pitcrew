import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import $ from "jquery";
import "./App.css";

import Main from "./main";
import TopNav from "./navbar";
import Login from "./login";
import Rider from "./rider";
import Register from "./register";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        password: "",
        login: false,
        type: ""
      },
      users: "",
      test: "testing react -> express"
    };
  }

  register(username, password) {
    $.ajax({
      url: "http://localhost:8080/register",
      type: "POST",
      data: { username: username, password: password }
    });
  }

  //
  signIn(username, password, login, type) {
    var user_exists = false;
    // Check if user exists
    $.ajax({
      url: "http://localhost:8080/login_user",
      type: "POST",
      data: { username: username, password: password },
      success: response => {
        if (response) {
          this.setState({
            user: {
              username,
              password,
              login,
              type
            }
          });
        } else {
          alert("Username or Password does not exist");
        }
      },
      error: function(response) {
        console.log("fail");
      }
    });
  }

  //
  signOut() {
    // clear out user from state
    this.setState({ user: null });
  }

  // From react => express
  handleClick = () => {
    console.log("this is:", this);
    $.ajax({
      url: "http://localhost:8080/post_test",
      type: "POST",
      data: { id: "test" }
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <TopNav />
          <h1 className="App-title">PitCrew</h1>
          <button onClick={this.handleClick}>Test</button>
        </header>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route
            path="/login"
            component={() => (
              <Login user={this.state.user} onSignIn={this.signIn.bind(this)} />
            )}
          />
          <Route
            path="/rider"
            component={() => (
              <Rider
                user={this.state.user}
                onSignOut={this.signOut.bind(this)}
              />
            )}
          />
          <Route
            path="/register"
            component={() => <Register onRegister={this.register.bind(this)} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
