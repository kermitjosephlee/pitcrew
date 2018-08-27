import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

class Dashboard extends Component {
  render() {
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: 43.6444, lng: -79.3951 }}
        defaultZoom={12}
      />
    ));

    return (
      <div>
        <GoogleMapExample
          containerElement={<div style={{ height: "500px", width: "500px" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </div>
    );
  }
}

export default Dashboard;
