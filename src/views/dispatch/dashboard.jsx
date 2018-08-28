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
      // dummie positions for testing
      tickets: [
        {
          location: {
            lat: 43.639701,
            lng: -79.459055
          }
        },
        {
          location: {
            lat: 43.679701,
            lng: -79.469055
          }
        },
        {
          location: {
            lat: 43.638701,
            lng: -79.458055
          }
        },
        {
          location: {
            lat: 43.620701,
            lng: -79.456055
          }
        },
        {
          location: {
            lat: 43.636701,
            lng: -79.459055
          }
        }
      ]
    };
  }

  _fetchTickets = () => {
    const url = "/fetchTickets";
    fetch(url)
      .then(results => results.json())
      .then(data => {
        this.setState({ tickets: data.tickets });
        console.log(this.state.tickets);
      })
      .catch(err => console.error("ERROR:", err));
  };

  _reloadTickets = () => {
    setInterval(() => {
      this._fetchTickets();
    }, 5000);
  };

  componentDidMount() {
    this._reloadTickets();

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
        {this.state.tickets.map(marker => {
          return (
            <Marker
              position={{ lat: marker.location.lat, lng: marker.location.lng }}
            />
          );
        })}
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
