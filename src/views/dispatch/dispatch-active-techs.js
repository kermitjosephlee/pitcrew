import React, { Component, Fragment } from "react";
import {
  Button,
  Grid,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import $ from "jquery";

class DispatchActiveTechs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0
    };
  }

  handleChange = e => {
    console.log("VALUE >> " + e.target.value);
    this.setState({ id: e.target.value });
  };

  assignTech = () => {
    const _rider = this.props.rider;

    const data = {
      id: this.state.id,
      rider: this.props.rider
    };

    $.ajax({
      url: "http://localhost:8080/assignTech",
      type: "POST",
      data: data
    });
  };

  render() {
    return (
      <Fragment>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Available Tech</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder="select"
            value={this.state.id}
            onChange={this.handleChange}
          >
            <option>---</option>
            {this.props.techs.map(tech => {
              if (tech.availability)
                return <option value={tech.id}>{tech.username}</option>;
            })}
          </FormControl>
          <Button onClick={this.assignTech.bind(this)}>
            Assign Tech for {this.props.rider}
          </Button>
        </FormGroup>
      </Fragment>
    );
  }
}
export default DispatchActiveTechs;
