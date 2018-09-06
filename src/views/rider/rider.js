import React, { Component, Fragment } from "react";
import {
  Button,
  Modal,
  FormGroup,
  FormControl,
  ControlLabel,
  FieldGroup
} from "react-bootstrap";
import RiderAssist from "./riderAssist.jsx";
import riderForm from "./riderForm.jsx";
import $ from "jquery";
import { css } from "react-emotion";
import { ScaleLoader } from "react-spinners";
import { API_HOST_HTTP, API_HOST_WS } from "../../config.js";

const override = css`
  display: block;
  text-align: center;
  border-color: red;
`;

class Rider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rider: {
        status: "pending"
      },
      loading: false,
      assist: false
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      const rider = this.state.rider;
      rider.lat = position.coords.latitude;
      rider.lng = position.coords.longitude;

      this.setState({
        rider
      });
    });
  }

  handleClose = () => {
    this.setState({
      show: false,
      assist: false
    });
  };

  handleShow = () => {
    this.setState({
      show: true
    });
  };

  handleChangeDescription = e => {
    const rider = this.state.rider;
    rider.description = e.target.value;
    this.setState({
      rider
    });
    console.log("is it working???", this.state.rider);
  };

  handleSelect = e => {
    const rider = this.state.rider;
    rider.type = e.target.value;
    this.setState({
      rider
    });
  };

  handleChangeName = e => {
    const rider = this.state.rider;
    rider.name = e.target.value;
    this.setState({
      rider
    });
  };

  handleChangeContact = e => {
    const rider = this.state.rider;
    rider.contact = e.target.value;
    this.setState({
      rider
    });
  };

  requestHelp = e => {
    e.preventDefault();

    const rider = this.state.rider;
    rider.startTime = new Date();

    this.setState({
      rider
    });

    const data = this.state.rider;
    console.log("I NEED TO KNOW THIS", data);
    this.newTicket(data);
  };

  newTicket(data) {
    this.setState({
      loading: true
    });
    $.ajax({
      url: `${API_HOST_HTTP}/newTicket`,
      type: "POST",
      data
    });
    setTimeout(() => {
      this.setState({
        loading: false,
        assist: true
      });
    }, 1500);
  }

  render() {
    const { assist, loading } = this.state;

    if (loading)
      return (
        <div class="bg-rider">
          <Modal
            show={this.state.show}
            onHide={this.handleClose}
            className="sweet-loading"
          >
            <Modal.Header closeButton />
            <Modal.Body>
              <ScaleLoader
                className={override}
                sizeUnit={"px"}
                size={250}
                color={"#123abc"}
                loading={this.state.loading}
              />{" "}
            </Modal.Body>{" "}
          </Modal>{" "}
        </div>
      );
    if (assist) {
      return <RiderAssist show={this.state.show} onHide={this.handleClose} />;
    }
    return (
      <div class="bg-rider">
        <h2 className="rider-title">RIDER</h2>
        <Button bsStyle="danger" bsSize="large" onClick={this.handleShow}>
          Request Assistance{" "}
        </Button>{" "}
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> How Can We Help You ? </Modal.Title>{" "}
          </Modal.Header>{" "}
          <Modal.Body>
            <form>
              <FormGroup>
                <ControlLabel> Name </ControlLabel>{" "}
                <FormControl
                  id="formControlsText"
                  type="text"
                  label="Text"
                  placeholder="Name"
                  onChange={this.handleChangeName}
                />
                <ControlLabel> Contact </ControlLabel>{" "}
                <FormControl
                  id="formControlsText"
                  type="text"
                  label="Text"
                  placeholder="Contact Number"
                  onChange={this.handleChangeContact}
                />
                <ControlLabel> Select </ControlLabel>{" "}
                <FormControl
                  componentClass="select"
                  onChange={this.handleSelect}
                >
                  <option value=""> Select... </option>{" "}
                  <option value="mechanical"> Mechanical </option>{" "}
                  <option value="medical"> Medical </option>{" "}
                  <option value="sweep"> Sweep </option>{" "}
                </FormControl>
                <ControlLabel> Description </ControlLabel>{" "}
                <FormControl
                  componentClass="textarea"
                  type="text"
                  placeholder="Description"
                  onChange={this.handleChangeDescription}
                />{" "}
              </FormGroup>{" "}
            </form>{" "}
          </Modal.Body>{" "}
          <Modal.Footer>
            <Button onClick={this.requestHelp}> Submit </Button>{" "}
          </Modal.Footer>{" "}
        </Modal>{" "}
      </div>
    );
  }
}

export default Rider;
