import React, { Component } from "react";
import { withGoogleMap, GoogleMap } from "react-google-maps";

class testMap extends Component {
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

export default testMap;
