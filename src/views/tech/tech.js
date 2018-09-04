import React, { Component, Fragment } from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  DirectionsRenderer
} from "react-google-maps";
import { compose, withProps, lifecycle } from "recompose";
import { Redirect } from "react-router-dom";

class Tech extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tech: {},
      assignedTicket: {
        // id: 1,
        // rider: "Bob",
        // lat: 43.639701,
        // lng: -79.459055,
        // type: "mechanic",
        // startTime: "2018-08-30T16:10:28.638Z",
        // description: "A",
        // status: "active"
      },
      directions: {},
      center: props.center,
      tickets: {},
      tech_assigned: true
    };
  }

  componentDidMount() {
    this.setState({ tech: JSON.parse(localStorage.getItem("user")) });

    this.socket = new WebSocket("ws://localhost:3001");

    this.socket.onopen = event => {
      let tech_id_message = {
        id: this.state.tech.id,
        type: "id"
      };

      console.log("Connected to server");
      this.socket.send(JSON.stringify(tech_id_message));

      this.socket.addEventListener("message", evt => {
        console.log("receiving from WSS: ...", evt.data);
      });
    };
  }

  render() {
    const ticketInfo = (
      <div>
        <p>go help {this.state.assignedTicket.rider}!</p>
      </div>
    );

    if (!localStorage.getItem("user")) {
      return <Redirect to="/login" />;
    }
    return (
      <Fragment>
        <GoogleMap defaultZoom={9}>
          <DirectionsRenderer directions={this.props.directions} />
        </GoogleMap>
        {this.state.assignedTicket.id ? (
          <Fragment>
            <p>go help {this.state.assignedTicket.rider}!</p>
            <Marker
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              }}
              position={{
                lat: this.state.assignedTicket.lat,
                lng: this.state.assignedTicket.lng
              }}
            />
          </Fragment>
        ) : (
          <p />
        )}
      </Fragment>
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
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const google = window.google;

      navigator.geolocation.getCurrentPosition(position => {
        const DirectionsService = new google.maps.DirectionsService();
        DirectionsService.route(
          {
            origin: new google.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            ),
            destination: new google.maps.LatLng(43.6543175, -79.4246381),
            travelMode: google.maps.TravelMode.BICYCLING
          },
          (result, status) => {
            console.log("result: ", result);
            if (status === google.maps.DirectionsStatus.OK) {
              this.setState({
                directions: result,
                markers: true
              });
            } else {
              console.error(`error fetching directions result`, result, status);
            }
          }
        );
        this.setState({
          center: {
            lat: 43.639701,
            lng: -79.459055
          }
        });
      });
    }
  })
)(Tech);
