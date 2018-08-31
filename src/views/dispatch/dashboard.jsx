import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  InfoWindow
} from "react-google-maps";
import MapMarker from "./map-markers.js";
import $ from "jquery";
import { compose, withProps } from "recompose";
import { Button } from "react-bootstrap";
import "./dashboard.css";
import { Grid } from "react-bootstrap";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMarker: null,
      myPosition: undefined,
      // dummie positions for testing
      tickets: []
    };
  }

  getTickets = () => {
    $.ajax({
      url: "http://localhost:8080/fetchTickets",
      type: "GET"
    });
  };

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
    }, 2500);
  };

  componentDidMount() {
    // this._reloadTickets();
    navigator.geolocation.getCurrentPosition(position => {
      // const myPosition = {
      //   lat: position.coords.latitude,
      //   lng: position.coords.longitude
      // };
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });
    });
  }

  render() {
    return (
      <div id="menu" className="GoogleMap" borderColor="green">
        <GoogleMap
          center={new window.google.maps.LatLng(43.6543175, -79.4246381)}
          defaultZoom={9}
        >
          {/* <MapMarker tickets={this.state.tickets} /> */}
        </GoogleMap>
        <Button onClick={this.getTickets}>GET TICKETS</Button>
      </div>
    );
  }
}
// }

export default compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCHs0Po1ZjrqqKy8pNXcXX3Gfl71w2GEDs&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: "100%" }} />,
    containerElement: <div style={{ height: "500px", width: "500px" }} />,
    mapElement: <div style={{ height: "100%" }} />
  }),
  withScriptjs,
  withGoogleMap
)(Dashboard);
