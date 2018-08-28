import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  InfoWindow
} from "react-google-maps";
import $ from "jquery";

let myPosition = {};

let testPositions = [
  { lat: 43.639701, lng: -79.459055 },
  { lat: 43.629326, lng: -79.489001 },
  { lat: 43.622554, lng: -79.519995 },
  { lat: 43.599622, lng: -79.579561 },
  { lat: 43.554703, lng: -79.629769 },
  { lat: 43.531559, lng: -79.691996 },
  { lat: 43.511207, lng: -79.728131 }
];

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
      <GoogleMap defaultCenter={this.state.myPosition} defaultZoom={9}>
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
