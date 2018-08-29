import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker
} from "react-google-maps";
import $ from "jquery";
import Sidebar from "react-sidebar";
import "./dashboard.css";

let myPosition = {};
const mql = window.matchMedia(`(min-width: 400 px)`);

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myPosition: {},
      tickets: [],
      sidebarDocked: mql.matches,
      sidebarOpen: true
    };
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  _fetchTickets = () => {
    const url = "/fetchTickets";
    fetch(url)
      .then(results => results.json())
      .then(tickets => {
        this.setState({ tickets });
        console.log("tickets:", tickets);
      })
      .catch(err => console.error("ERROR:", err));
  };

  componentDidMount() {
    this._fetchTickets();
    mql.addListener(this.mediaQueryChanged);

    navigator.geolocation.getCurrentPosition(position => {
      myPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.setState({ myPosition });
      console.log("Dashboard location:", myPosition);
    });
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  render() {
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap defaultCenter={this.state.myPosition} defaultZoom={12}>
        <Marker position={this.state.myPosition} />
      </GoogleMap>
    ));

    const sidebarStyles = {
      sidebar:{
        backgroundColor: "honeydew",
      }
    }

    return (
      <div id="menu">
        <GoogleMapExample
          containerElement={<div style={{ height: "500px", width: "500px" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />

        <Sidebar
          sidebar={<em>PitCrew Dashboard</em>}
          styles={sidebarStyles}
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
        >
          <button onClick={() => this.onSetSidebarOpen(true)}>
            Menu
          </button>
          <b>Main content</b>
        </Sidebar>
      </div>
    );
  }
}

export default Dashboard;
