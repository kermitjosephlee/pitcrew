import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import $ from "jquery";
import "./App.css";

import { Grid } from "react-bootstrap";
import { Column, Row } from "simple-flexbox";

import Main from "./main.jsx";
import Login from "./login";
import Rider from "./views/rider/rider";
import Tech from "./views/tech/tech";
import Register from "./register";
import Dashboard from "./views/dispatch/dashboard";
import NavigationBar from "./navigationBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      <div className="App">
        <Column flexGrow={1}>
          <NavigationBar />
          <div className="Switch">
            <Switch>
              <Route path="/" exact component={Main} />
              <Route
                path="/login"
                component={() => <Login user={this.state.user} />}
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
      </div>
    );
  }
}

export default App;
