import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  InfoWindow,
  DirectionsRenderer
} from "react-google-maps";
import { compose, withProps, lifecycle } from "recompose";
import Sidebar from "react-sidebar";

class Tech extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tech: {
        RideId: 1,
        username: "Bob",
        name: "Mr. MeeFix",
        password: "123456"
      },
      assignedTicket: {
        id: 1,
        rider: "Bob",
        lat: 43.639701,
        lng: -79.459055,
        type: "mechanic",
        startTime: "2018-08-30T16:10:28.638Z",
        description: "A",
        status: "active"
      },
      directions: {},
      center: props.center
    };
  }

  render() {
    const ticketInfo = (
      <div>
        <p>go help {this.state.assignedTicket.rider}!</p>
      </div>
    );

    return (
      <React.Fragment>
        <GoogleMap defaultZoom={9}>
          <DirectionsRenderer directions={this.props.directions} />
        </GoogleMap>
        {this.state.assignedTicket.id ? (
          <React.Fragment>
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
          </React.Fragment>
        ) : (
          <p />
        )}
      </React.Fragment>
    );

    if (this.state.center) {
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
