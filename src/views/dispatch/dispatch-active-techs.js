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
      assigned_tech_id: 0
    };
  }

  handleChange = e => {
    console.log(e.target.value);
    this.setState({ assigned_tech_id: e.target.value });
  };

  assignTech = () => {
    const _rider = this.props.rider;

    const data = {
      assigned_tech_id: this.state.assigned_tech_id,
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
            value={this.state.assigned_tech_id}
            onChange={this.handleChange}
          >
            <option>---</option>
            {this.props.techs.map(tech => {
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
