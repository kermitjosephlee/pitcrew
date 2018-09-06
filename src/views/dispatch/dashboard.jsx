import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  InfoWindow,
  DirectionsRenderer
} from "react-google-maps";
import MapMarker from "./map-markers.js";
import $ from "jquery";
import { compose, withProps, lifecycle } from "recompose";
import { Button, Grid, Row, Col } from "react-bootstrap";
import DispatchTicket from "./dispatch-tickets";
import { Redirect } from "react-router-dom";
import "./dashboard.css";
import { API_HOST_HTTP, API_HOST_WS } from "../../config.js";

let loopInterval = 1000;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curTime: 0,
      activeMarker: null,
      myPosition: undefined,
      // dummie positions for testing

      tickets: [],
      techs: []
    };
  }

  getTickets = () => {
    $.ajax({
      url: `${API_HOST_HTTP}/fetchTickets`,
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
      })
      .catch(err => console.error("ERROR:", err));
  };

  _fetchAvailableTechs = () => {
    const url = "/fetchAvailableTechs";
    fetch(url)
      .then(results => results.json())
      .then(data => {
        this.setState({ techs: data.techs });
      })
      .catch(err => console.error("ERROR:", err));
  };

  _reloadTickets = () => {
    setInterval(() => {
      this._fetchTickets();
      this._fetchAvailableTechs();
    }, loopInterval);
  };

  componentDidMount() {
    this._reloadTickets();

    setInterval(() => {
      this.setState({
        curTime: new Date().toLocaleString()
      });
    }, 1000);
  }

  render() {
    if (!localStorage.getItem("user")) {
      return <Redirect to="/login" />;
    }
    return (
      <React.Fragment>
        <h2 style={{ fontSize: "24px" }}>:: DASHBOARD ::</h2>
        <div className="container">
          <h4 style={{ float: "left" }}>
            Ride to Conquer Cancer | Toronto, ON
          </h4>
          <h4 style={{ float: "right" }}>{this.state.curTime}</h4>
        </div>
        <Grid id="menu" borderColor="green" fluid>
          <Row>
            <Col xs={12} md={8} xl={8}>
              <Map tickets={this.state.tickets} techs={this.state.techs} />
            </Col>
            <Col
              style={{
                height: "100vh",
                overflow: "scroll"
              }}
              xs={6}
              md={4}
              xl={4}
            >
              <DispatchTicket
                tickets={this.state.tickets}
                techs={this.state.techs}
              />
            </Col>
          </Row>
        </Grid>
      </React.Fragment>
    );
  }
}

const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCHs0Po1ZjrqqKy8pNXcXX3Gfl71w2GEDs&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: "100%", width: "100%" }} />,
    containerElement: (
      <div style={{ height: "100vh", width: "100%", paddingLeft: "10px" }} />
    ),
    mapElement: <div style={{ height: "100%", width: "100%" }} />
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
        const DirectionsService = new google.maps.DirectionsService();
        DirectionsService.route(
          {
            origin: new google.maps.LatLng(43.6521095, -79.4065638),
            destination: new google.maps.LatLng(43.5514799, -79.5946813),
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
      });
    }
  })
)(({ tickets, techs, directions, center }) => (
  <GoogleMap center={center} defaultZoom={12}>
    <MapMarker tickets={tickets} techs={techs} />
    <DirectionsRenderer directions={directions} />
  </GoogleMap>
));

export default Dashboard;
