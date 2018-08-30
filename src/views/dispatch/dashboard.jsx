import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  InfoWindow
} from "react-google-maps";
import MapMarker from "./map-markers.js";
import $ from "jquery";
import { compose, withProps } from "recompose";
import Sidebar from "react-sidebar";

const mql = window.matchMedia(`(min-width: 250px)`);

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      center: undefined,
      activeMarker: null,
      myPosition: undefined,
      // dummie positions for testing
      tickets: []
    };
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

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
        console.log(this.state.tickets);
      })
      .catch(err => console.error("ERROR:", err));
  };

  _reloadTickets = () => {
    setInterval(() => {
      this._fetchTickets();
    }, 2500);
  };
  componentDidMount() {
    mql.addListener(this.mediaQueryChanged);
    this._reloadTickets();
    navigator.geolocation.getCurrentPosition(position => {
      // const myPosition = {
      //   lat: position.coords.latitude,
      //   lng: position.coords.longitude
      // };
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });
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

  // handleMapDragStart = this.handleMapDragStart.bind(this);
  // handleMapDragEnd = this.handleMapDragEnd.bind(this);
  //
  // handleMapDragStart(map) {
  //   this.setState({ ticketFetching: false });
  //   console.log("Drag started");
  // }
  //
  // handleMapDragEnd(map) {
  //   this.setState({ ticketFetching: true });
  //   console.log("Drag ended");
  // }

  _handleCenterChanged() {
    const center = this.refs.map.getCenter();
    if (!center.equals(this.state.center)) {
      this.setState({ center });
    }
  }

  render() {
    const sidebarStyles = {
      sidebar: {
        backgroundColor: "honeydew"
      }
    };

    if (this.state.center) {
      return (
        // <div id="menu">
        <GoogleMap
          defaultZoom={9}
          defaultCenter={this.state.center}
          onCenterChanged={this._handleCenterChanged.bind(this)}
        >
          <MapMarker tickets={this.state.tickets} />
        </GoogleMap>
        // <Sidebar
        //   sidebar={<em>PitCrew Dashboard</em>}
        //   styles={sidebarStyles}
        //   open={this.state.sidebarOpen}
        //   docked={this.state.sidebarDocked}
        //   onSetOpen={this.onSetSidebarOpen}
        // >
        //   <button onClick={() => this.onSetSidebarOpen(false)}>Menu</button>
        //   <b>Main content</b>
        //   <p className="ticketBox">ticket box</p>
        // </Sidebar>
        // </div>
      );
    } else {
      return (
        <div id="menu">
          <Sidebar
            sidebar={<em>PitCrew Dashboard</em>}
            styles={sidebarStyles}
            open={this.state.sidebarOpen}
            docked={this.state.sidebarDocked}
            onSetOpen={this.onSetSidebarOpen}
          >
            <button onClick={() => this.onSetSidebarOpen(true)}>Menu</button>
            <b>Main content</b>
            <p className="ticketBox">ticket box</p>
          </Sidebar>
        </div>
      );
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
  withGoogleMap
)(Dashboard);
