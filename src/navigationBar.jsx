import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import React, { Component } from "react";
import logo from "./images/logo.png";

class NavigationBar extends Component {
  signOut() {
    // clear out user from state
    localStorage.removeItem("user");
    console.log("SIGNING OUT");
  }
  render() {
    return (
      <Navbar
        style={{
          marginBottom: "0px",
          borderRadius: "0px",
          staticTop: "true"
        }}
      >
        <Navbar.Brand>
          <a href="/">
            <img className="App-logo" src={logo} alt="logo" />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav pullRight>
            {!localStorage.getItem("user") && (
              <NavItem
                eventKey={1}
                href="/login"
                class="btn"
                style={{ fontColor: "white" }}
              >
                login
              </NavItem>
            )}
            {!localStorage.getItem("user") && (
              <NavItem eventKey={2} href="/register" class="btn1">
                register
              </NavItem>
            )}
            <NavItem eventKey={3} href="/rider" class="btn1">
              rider
            </NavItem>
            {localStorage.getItem("user") && (
              <NavItem
                eventKey={4}
                href="/"
                onClick={this.signOut}
                class="btn1"
              >
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
