import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import $ from "jquery";
import "./App.css";
import logo from "./logo.svg";

import { Grid } from "react-bootstrap";
import { Column, Row } from "simple-flexbox";

import Main from "./main.jsx";
import Login from "./login";
import Rider from "./views/rider/rider";
import Tech from "./views/tech/tech";
import Register from "./register";
import Dashboard from "./views/dispatch/dashboard";

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
  newTicket(data) {
    $.ajax({
      url: "http://localhost:8080/newTicket",
      type: "POST",
      data
    });
  }

  render() {
    console.log("location:", this.props);
    return (
      <Fragment>
        <Column flexGrow={1}>
          <header>
            <Row horizontal="center" vertical="center">
              <div className="iconCorner">
                <img src={logo} className="App-logo-spin" alt="logo" />
              </div>
              <div className="iconCornerRemainder">
                <span>PitCrew</span>
              </div>
            </Row>
          </header>

          <Switch>
            <Route path="/" exact component={Main} />
            <Route
              path="/login"
              component={() => (
                <Login
                  user={this.state.user}
                  onSignIn={this.signIn.bind(this)}
                />
              )}
            />
            <Route
              path="/rider"
              component={() => (
                <Rider user={this.state.user} handleTicket={this.newTicket} />
              )}
            />
            <Route
              path="/register"
              component={() => (
                <Register onRegister={this.registerTech.bind(this)} />
              )}
            />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/tech" exact component={Tech} />
          </Switch>
          <footer>
            <Row horizontal="center" vertical="center">
              <div className="footer" />
            </Row>
          </footer>
        </Column>
      </Fragment>
    );
  }
}

export default App;
