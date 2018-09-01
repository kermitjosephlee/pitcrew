import React, { Component, Fragment } from "react";
import {
  Button,
  Grid,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

class DispatchActiveTechs extends Component {
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
    return (
      <Fragment>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Available Tech</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder="select"
            value={this.state.value}
            onChange={this.handleChange}
          >
            <option>---</option>
            {this.props.techs.map(tech => {
              return <option value={tech.id}>{tech.username}</option>;
            })}
          </FormControl>
          <Button>Assign Tech for {this.props.rider}</Button>
        </FormGroup>
      </Fragment>
    );
  }
}
export default DispatchActiveTechs;
