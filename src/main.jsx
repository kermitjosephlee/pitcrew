import React, { Component } from "react";
import { Jumbotron, Button, Grid } from "react-bootstrap";
import "./Main.css";
import { Column, Row } from "simple-flexbox";
import TopScreenCarousel from "./partials/topscreencarousel.js";

class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null
    };
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }

  render() {
    const { index, direction } = this.state;
    return (
      <React.Fragment>
        <Jumbotron>
          <div className="jumbotron">
            <h1>Welcome to PitCrew</h1>
            <p>
              PitCrew is here to find you, repair your bike, and get you back on
              the road
            </p>
            <p>
              <Button bsStyle="primary">Learn more</Button>
            </p>
          </div>
        </Jumbotron>

        <TopScreenCarousel />
      </React.Fragment>
    );
  }
}

export default Main;
