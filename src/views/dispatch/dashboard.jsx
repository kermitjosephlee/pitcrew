import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
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

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMarker: null,
      myPosition: undefined,
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
            lat: 43.6476611,
            lng: -79.3959029
          }
        },
        {
          id: 3,
          location: {
            lat: 43.6447046,
            lng: -79.3906215
          }
        },
        {
          id: 4,
          location: {
            lat: 43.6402511,
            lng: -79.411626
          }
        },
        {
          id: 5,
          location: {
            lat: 43.6443754,
            lng: -79.3823521
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
    }, 1000);
  };

  componentDidMount() {
    this._reloadTickets();
    navigator.geolocation.getCurrentPosition(position => {
      const myPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.setState({ myPosition });
      console.log("Dashboard location:", myPosition);
    });
  }

  fetchLocation() {
    const CurrentPosition = {};
    navigator.geolocation.getCurrentPosition(position => {
      const CurrentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    });
    return CurrentPosition;
  }

  render() {
    if (this.state.myPosition) {
      return (
        <GoogleMap
          center={{
            lat: this.state.myPosition.lat,
            lng: this.state.myPosition.lng
          }}
          defaultZoom={9}
        >
          <MapMarker tickets={this.state.tickets} />
        </GoogleMap>
      );
    } else {
      return <div />;
    }
  }
}

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
