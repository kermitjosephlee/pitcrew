import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">PitCrew</h1>
        </header>
        <p className="App-intro">
          {" "}
          I have come here to chew bubblegum and kick ass. And I'm all out of
          bubblegum
        </p>
      </div>
    );
  }
}

export default App;
