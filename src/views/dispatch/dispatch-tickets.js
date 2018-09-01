import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Grid } from "react-bootstrap";

class DispatchTickets extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const mapMarkers = this.props.tickets.map(ticket => {
      if (ticket.status == "active")
        return (
          <Marker
            key={ticket.id}
            onClick={() => this.handleToggleOpen(ticket.id)}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            }}
            position={{ lat: ticket.lat, lng: ticket.lng }}
          />
        );
    });

    return (
      <Fragment>
        {mapMarkers}
        {mapTechs}
      </Fragment>
    );
  }
}
export default DispatchTickets;
