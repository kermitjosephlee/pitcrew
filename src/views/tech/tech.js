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
          this.setState({ assignedTicket: true, ticket_id: data.ticket_id });
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
        <Fragment>
          <h4>Ticket Assigned!</h4>
          <TechMap center={this.state.center} />
          <button onClick={this.ticketCompleted}>Ticket Completed</button>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <TechMap center={this.state.center} />
        </Fragment>
      );
    }
  }
}

const TechMap = compose(
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
        this.setState({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      });
    },

    componentDidUpdate() {
      console.log("Testing componentDidUpdate");

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
        // this.setState({
        //   center: {
        //     lat: 43.639701,
        //     lng: -79.459055
        //   }
        // });
      });
    }
  })
)(({ directions, assignedTicket, center }) => (
  <GoogleMap defaultZoom={9} center={center}>
    <DirectionsRenderer directions={directions} />
  </GoogleMap>
));

export default Tech;

// export default compose(
//   withProps({
//     googleMapURL:
//       "https://maps.googleapis.com/maps/api/js?key=AIzaSyCHs0Po1ZjrqqKy8pNXcXX3Gfl71w2GEDs&v=3.exp&libraries=geometry,drawing,places",
//     loadingElement: <div style={{ height: "100%" }} />,
//     containerElement: <div style={{ height: "500px", width: "500px" }} />,
//     mapElement: <div style={{ height: "100%" }} />
//   }),
//   withScriptjs,
//   withGoogleMap,
//   lifecycle({
//     componentDidMount() {
//       const google = window.google;
//
//       navigator.geolocation.getCurrentPosition(position => {
//         const DirectionsService = new google.maps.DirectionsService();
//         DirectionsService.route(
//           {
//             origin: new google.maps.LatLng(
//               position.coords.latitude,
//               position.coords.longitude
//             ),
//             destination: new google.maps.LatLng(43.6543175, -79.4246381),
//             travelMode: google.maps.TravelMode.BICYCLING
//           },
//           (result, status) => {
//             console.log("result: ", result);
//             if (status === google.maps.DirectionsStatus.OK) {
//               this.setState({
//                 directions: result,
//                 markers: true
//               });
//             } else {
//               console.error(`error fetching directions result`, result, status);
//             }
//           }
//         );
//         this.setState({
//           center: {
//             lat: 43.639701,
//             lng: -79.459055
//           }
//         });
//       });
//     }
//   })
// )(Tech);
