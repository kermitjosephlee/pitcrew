import React, { Component } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  InfoWindow
} from "react-google-maps";

class Rider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rider: {
        id: 0,
        rider: "Bob",
        lat: 0,
        lng: 0,
        type: "mechanic",
        startTime: "2018-08-30T16:10:28.638Z",
        description: "A",
        status: "pending"
      }
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      const rider = this.state.rate;
      rider.lat = position.coords.latitude;
      rider.lng = position.coords.longitude;

      this.setState({ rider });
    });
  }

  requestHelp() {
    this.props.newTicket(this.state.rider);
  }

  render() {
    // if (!this.props.user.login) {
    //   return <Redirect from="/rider" to="/login" />;
    // }
    return (
      <div>
        <h2>Rider Page</h2>
        <p>welcome rider!</p>
        <button onClick={this.requestHelp.bind(this)}>Request Help!</button>
      </div>
    );
  }
}

export default Rider;
