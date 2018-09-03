import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
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

  signOut() {
    // clear out user from state
    localStorage.removeItem("user");
    console.log("SIGNING OUT");
  }

  newTicket(data) {
    $.ajax({
      url: "http://localhost:8080/newTicket",
      type: "POST",
      data
    });
  }

  render() {
    return (
      <React.Fragment>
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
                {!localStorage.getItem("user") && (
                  <NavItem eventKey={1} href="/login">
                    login
                  </NavItem>
                )}
                {!localStorage.getItem("user") && (
                  <NavItem eventKey={2} href="/register">
                    register
                  </NavItem>
                )}
                <NavItem eventKey={3} href="/rider">
                  rider
                </NavItem>
                {localStorage.getItem("user") && (
                  <NavItem eventKey={4} href="/" onClick={this.signOut}>
                    logout
                  </NavItem>
                )}
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
                  <Rider user={this.state.user} handleTicket={this.newTicket} />
                )}
              />
              <Route
                path="/register"
                component={() => (
                  <Register onRegister={this.register} user={this.state.user} />
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
      </React.Fragment>
    );
  }
}

export default App;
