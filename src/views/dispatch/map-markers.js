import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  InfoWindow
} from "react-google-maps";

class MapMarker extends Component {
  constructor(props) {
    super(props);
  }

  handleToggleOpen = id => {
    console.log("tag id:", id);
    this.setState({
      activeMarker: id
    });
  };

  render() {
    const mapMarkers = this.props.tickets.map(marker => {
      return (
        <Marker
          key={marker.id}
          onClick={() => this.handleToggleOpen(marker.id)}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          }}
          position={{ lat: marker.location.lat, lng: marker.location.lng }}
        />
      );
    });
    return <div>{mapMarkers}</div>;
  }
}
export default MapMarker;
