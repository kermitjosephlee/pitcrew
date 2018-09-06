import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import React, { Component } from "react";
import logo from "./logo.svg";

class NavigationBar extends Component {
  signOut() {
    // clear out user from state
    localStorage.removeItem("user");
    console.log("SIGNING OUT");
  }
  render() {
    return (
      <Navbar inverse collapseOnSelect style={{ marginBottom: "0px" }}>
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
    );
  }
}

export default NavigationBar;
