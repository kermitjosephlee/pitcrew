import React, { Component } from "react";
import { compose, withProps } from "recompose";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  InfoWindow
} from "react-google-maps";

class Technician extends Component {
  render() {
    return (
      <div>
        <h1>Technician</h1>
        <GoogleMap />
      </div>
    );
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
);
