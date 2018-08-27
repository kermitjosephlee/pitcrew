import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import $ from "jquery";
import "./App.css";

import Main from "./main";
import TopNav from "./navbar";
import Login from "./login";
import Rider from "./rider";

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

  componentDidMount() {
    this.getUsers()
      .then(res => this.setState({ users: res.express }))
      .catch(err => console.log(err));
  }

  signIn(username, password, login, type) {
    // calling setState will re-render the entire app
    this.setState({
      user: {
        username,
        password,
        login,
        type
      }
    });
  }

  signOut() {
    // clear out user from state
    this.setState({ user: null });
  }

  getUsers = async () => {
    const response = await fetch("/api/hello");
    const body = await response.json();

    return body;
  };

  handleClick = () => {
    console.log("this is:", this);
    $.ajax({
      url: "http://localhost:5000/post_test",
      type: "POST",
      data: { id: "test" }
    });
  };

  render() {
    // if (this.state.user && this.state.user.login) {
    //   return (
    //     <div className="App">
    //       <header className="App-header">
    //         <h1 className="App-title">PitCrew</h1>
    //       </header>
    //       <Switch>
    //         <Redirect from="/login" to="/rider" />
    //         <Route path="/rider" component={Rider} />
    //       </Switch>
    //     </div>
    //   );
    // }

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
            component={() => <Login onSignIn={this.signIn.bind(this)} />}
          />
          <Route
            path="/rider"
            component={() => <Rider onSignOut={this.signOut.bind(this)} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
