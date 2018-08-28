import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker
} from "react-google-maps";
import $ from "jquery";

let myPosition = {};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myPosition: {},
      tickets: []
    };
  }

  _fetchTickets = () => {
    const url = "/fetchTickets";
    fetch(url)
      .then(results => results.json())
      .then(tickets => {
        this.setState({ tickets });
        console.log("tickets:", tickets);
      })
      .catch(err => console.error("ERROR:", err));
  };

  componentDidMount() {
    this._fetchTickets();

    navigator.geolocation.getCurrentPosition(position => {
      myPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.setState({ myPosition });
      console.log("Dashboard location:", myPosition);
    });
  }

  render() {
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap defaultCenter={this.state.myPosition} defaultZoom={12}>
        <Marker position={this.state.myPosition} />
      </GoogleMap>
    ));

    return (
      <div id="menu">
        <GoogleMapExample
          containerElement={<div style={{ height: "500px", width: "500px" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </div>
    );
  }
}

export default Dashboard;
