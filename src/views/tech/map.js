import React, { Component, Fragment } from "react";
import {
  Button,
  Grid,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import DispatchActiveTechs from "./dispatch-active-techs";

class DispatchTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };
  }

  handleChange = e => {
    console.log(e.target.value);
    this.setState({ value: e.target.value });
  };

  render() {
    const dispatchTickets = this.props.tickets.map(ticket => {
      if (ticket.status == "pending")
        return (
          <div class="container-fluid">
            <h4>Rider: {ticket.rider}</h4>
            <DispatchActiveTechs
              rider={ticket.rider}
              ticket={ticket}
              techs={this.props.techs}
            />
          </div>
        );
    });

    return (
      <GoogleMap
        defaultZoom={16}
        center={center}
        assignedTicket={assignedTicket}
      >
        <DirectionsRenderer directions={directions} />
      </GoogleMap>
    );
  }
}
export default DispatchTicket;
