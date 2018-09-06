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
import $ from "jquery";

class Tech extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tech: {},
      assignedTicket: false,
      directions: {},
      center: {},
      ticket_id: 0
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
        const data = JSON.parse(evt.data);
        if (data.type == "notification") {
          this.setState({
            assignedTicket: true,
            ticket_id: data.ticket_id,
            ticket: data.ticket
          });
        }
      });
    };
  }

  ticketCompleted = () => {
    $.ajax({
      url: "http://localhost:8080/completeTicket",
      type: "POST",
      data: { ticket_id: this.state.ticket_id }
    });
    this.setState({ assignedTicket: false });
  };

  render() {
    if (!localStorage.getItem("user")) {
      return <Redirect to="/login" />;
    }

    if (this.state.assignedTicket) {
      return (
        <div className="cointainer">
          <h4>Ticket Assigned!</h4>
          <TechMap
            center={this.state.center}
            assignedTicket={this.state.assignedTicket}
            ticket={this.state.ticket}
          />
          <button onClick={this.ticketCompleted}>Ticket Completed</button>
        </div>
      );
    } else {
      return (
        <div className="cointainer">
          <TechMap
            center={this.state.center}
            assignedTicket={this.state.assignedTicket}
          />
        </div>
      );
    }
  }
}

const TechMap = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCHs0Po1ZjrqqKy8pNXcXX3Gfl71w2GEDs&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: "100%" }} />,
    containerElement: (
      <div
        style={{
          height: "70vh",
          width: "100vw",
          paddingLeft: "1vw",
          paddingRight: "1vw"
        }}
      />
    ),
    mapElement: <div style={{ height: "100%" }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const google = window.google;
      console.log("props:", this.props);

      console.log("props changed, fetching new location");
      const position = this.props.center;

      navigator.geolocation.getCurrentPosition(position => {
        console.log("initial position", position);
        this.setState({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
        if (this.props.assignedTicket == true) {
          const DirectionsService = new google.maps.DirectionsService();
          DirectionsService.route(
            {
              origin: new google.maps.LatLng(
                position.coords.latitude,
                position.coords.longitude
              ),
              destination: new google.maps.LatLng(
                this.props.ticket.lat,
                this.props.ticket.lng
              ),
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
                console.error(
                  `error fetching directions result`,
                  result,
                  status
                );
              }
            }
          );
        }
      });
    }
  })
)(({ directions, center, assignedTicket }) => (
  <GoogleMap defaultZoom={16} center={center} assignedTicket={assignedTicket}>
    <DirectionsRenderer directions={directions} />
  </GoogleMap>
));

export default Tech;
