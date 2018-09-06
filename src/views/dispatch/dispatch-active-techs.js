import React, { Component, Fragment } from "react";
import {
  Button,
  Grid,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import $ from "jquery";
import { API_HOST_HTTP, API_HOST_WS } from "../../config.js";

class DispatchActiveTechs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0
    };
  }

  componentDidMount() {
    this.socket = new WebSocket(`${API_HOST_WS}`);

    this.socket.onopen = event => {
      console.log("Connected to server");

      this.socket.addEventListener("message", evt => {
        console.log("receiving from WSS: ...", evt.data);
      });
    };
  }

  handleChange = e => {
    console.log("VALUE >> " + e.target.value);
    this.setState({
      id: e.target.value
    });
  };

  assignTech = () => {
    // const _rider = this.props.rider;
    const data = {
      id: this.state.id,
      rider: this.props.rider,
      type: "dispatch",
      ticket: this.props.ticket
    };
    this.socket.send(JSON.stringify(data));
  };

  render() {
    return (
      <Fragment>
        <FormGroup controlId="formControlsSelect">
          <FormControl
            componentClass="select"
            placeholder="select"
            value={this.state.id}
            onChange={this.handleChange}
            style={{ height: "4vh", width: "20vw" }}
          >
            <option>assign tech</option>{" "}
            {this.props.techs.map(tech => {
              if (tech.availability)
                return <option value={tech.id}> {tech.username} </option>;
            })}{" "}
          </FormControl>{" "}
        </FormGroup>{" "}
        <Button
          bsSize="xsmall"
          bsStyle="primary"
          onClick={this.assignTech.bind(this)}
          style={{ height: "min-content" }}
        >
          assign
        </Button>
      </Fragment>
    );
  }
}
export default DispatchActiveTechs;
