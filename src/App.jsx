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
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  register = data => {
    $.ajax({
      url: "http://localhost:8080/register",
      type: "POST",
      data,
      success: data => {
        if (data) {
          const tempUser = {
            username: data.username,
            login: true,
            type: data.type
          };
          localStorage.setItem("user", tempUser);
        } else {
          alert("Username or Password does not exist");
        }
      },
      error: function(data) {
        console.log("fail");
      }
    });
  };

  // signIn(data) {
  //   $.ajax({
  //     url: "http://localhost:8080/login",
  //     type: "POST",
  //     data,
  //     success: data => {
  //       if (data) {
  //         const tempUser = {
  //           username: data.username,
  //           login: true,
  //           type: data.type
  //         };
  //         localStorage.setItem("user", JSON.stringify(tempUser));
  //       } else {
  //         alert("Username or Password does not exist");
  //       }
  //     },
  //     error: function(data) {
  //       console.log("fail");
  //     }
  //   });
  // }

  signOut() {
    // clear out user from state
    localStorage.removeItem("user");
    console.log("SIGNING OUT");
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
      <React.Fragment>
        <div className="App">
          <Column flexGrow={1}>
            <Navbar inverse collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <span>
                    <img src={logo} className="App-logo" alt="logo" />
                  </span>
                  <span>
                    <a href="/"> pitCrew</a>
                  </span>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav pullRight>
                  <NavItem eventKey={1} href="/login">
                    login
                  </NavItem>
                  <NavItem eventKey={2} href="/register">
                    register
                  </NavItem>
                  <NavItem eventKey={3} href="/rider">
                    rider
                  </NavItem>
                  <NavItem eventKey={4} onClick={this.signOut}>
                    logout
                  </NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <div className="Switch">
              <Switch>
                <Route path="/" exact component={Main} />
                <Route
                  path="/login"
                  component={() => (
                    <Login
                      user={this.state.user}
                      // onSignIn={this.signIn.bind(this)}
                    />
                  )}
                />
                <Route
                  path="/rider"
                  component={() => (
                    <Rider
                      user={this.state.user}
                      handleTicket={this.newTicket}
                    />
                  )}
                />
                <Route
                  path="/register"
                  component={() => (
                    <Register
                      onRegister={this.register}
                      user={this.state.user}
                    />
                  )}
                />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/technician" exact component={Tech} />
              </Switch>
            </div>
          </Column>
          <footer>
            <Row horizontal="center" vertical="center">
              <div className="footer" />
            </Row>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
