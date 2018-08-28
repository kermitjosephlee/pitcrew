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

// let contentString =
//   '<div id="content">' +
//   '<div id="siteNotice">' +
//   "</div>" +
//   '<h1 id="firstHeading" class="firstHeading">' +
//   riderName +
//   "</h1>" +
//   '<div id="bodyContent">' +
//   "<p>" +
//   riderName +
//   "</p>" +
//   "<p>tech name: " +
//   techName +
//   "</p>" +
//   "<p> Status: Pending </p>" +
//   "</div>" +
//   "</div>";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMarker: null,
      myPosition: {},
      // dummie positions for testing
      tickets: [
        {
          id: 1,
          location: {
            lat: 43.639701,
            lng: -79.459055
          }
        },
        {
          id: 2,
          location: {
            lat: 43.679701,
            lng: -79.469055
          }
        },
        {
          id: 3,
          location: {
            lat: 43.638701,
            lng: -79.458055
          }
        },
        {
          id: 4,
          location: {
            lat: 43.620701,
            lng: -79.456055
          }
        },
        {
          id: 5,
          location: {
            lat: 43.636701,
            lng: -79.459055
          }
        }
      ]
    };
  }

  handleToggleOpen = id => {
    console.log("tag id:", id);
    this.setState({
      activeMarker: id
    });
  };

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

  //**************************************************

  //**************************************************

  componentDidMount() {
    // this._reloadTickets();

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
        {this.state.tickets.map(marker => {
          return (
            <Marker
              onClick={() => this.handleToggleOpen(marker.id)}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              }}
              position={{ lat: marker.location.lat, lng: marker.location.lng }}
            >
              {this.state.activeMarker === marker.id && (
                <InfoWindow>
                  <h4>{marker.id}</h4>
                </InfoWindow>
              )}
            </Marker>
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
