import React, { Component, Fragment } from "react";
import { Tab, Tabs } from "react-bootstrap";
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
          <div class="rider-list">
            <p>{ticket.rider}</p>
            <DispatchActiveTechs
              rider={ticket.rider}
              ticket={ticket}
              techs={this.props.techs}
            />
          </div>
        );
    });

    return (
      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
        <Tab eventKey={1} title="Pending">
          {dispatchTickets}
        </Tab>
        <Tab eventKey={2} title="Active">
          Tab 2 content
        </Tab>
      </Tabs>
    );
  }
}
export default DispatchTicket;
