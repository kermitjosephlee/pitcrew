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
              techs={this.props.techs}
            />
          </div>
        );
    });

    return (
      <Fragment>
        <h3>Pending Tickets</h3>
        {dispatchTickets}
        <h3>Active Tickets</h3>
        {dispatchTickets}
      </Fragment>
    );
  }
}
export default DispatchTicket;
