import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import $ from "jquery";
import "./App.css";

import Main from "./main";
import TopNav from "./navbar";
import Login from "./login";
import Rider from "./views/rider/rider";
import Register from "./register";
import Dashboard from "./views/dispatch/dashboard";
import Technician from "./views/technician/technician";

let myPosition = {};

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
      rider: {
        name: "",
        phone: undefined
      }
    };
  }

  registerTech(data) {
    $.ajax({
      url: "http://localhost:8080/register",
      type: "POST",
      data
    });
  }

  signIn(data) {
    $.ajax({
      url: "http://localhost:8080/login",
      type: "POST",
      data,
      success: data => {
        if (data) {
          this.setState({
            user: {
              username: data.username,
              password: data.password,
              login: true,
              type: data.type
            }
          });
        } else {
          alert("Username or Password does not exist");
        }
      },
      error: function(data) {
        console.log("fail");
      }
    });
  }

  signOut() {
    // clear out user from state
    this.setState({ user: null });
  }

  //
  addTicket(location) {
    $.ajax({
      url: "http://localhost:8080/newTicket",
      type: "POST",
      data: {
        id: 6,
        location: {
          lat: location.lat,
          lng: location.lng
        }
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <TopNav />
          <h1 className="App-title">PitCrew</h1>
          <button onClick={this.addTicket}>Test</button>
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
                newTicket={this.addTicket.bind(this)}
              />
            )}
          />
          <Route
            path="/register"
            component={() => (
              <Register onRegister={this.registerTech.bind(this)} />
            )}
          />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/technician" exact component={Technician} />
        </Switch>
      </div>
    );
  }
}

export default App;
