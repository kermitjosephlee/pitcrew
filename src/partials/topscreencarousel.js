import React, { Component } from "react";
import { Carousel } from "react-bootstrap";
import "../Main.css";
import image1 from "../images/linkedin-sales-navigator-406816-unsplash.jpg";
import image2 from "../images/tomas-horak-380603-unsplash.jpg";
import image3 from "../images/wayne-bishop-5737-unsplash.jpg";

class TopScreenCarousel extends Component {
  render() {
    return (
      <React.Fragment>
        <Carousel
          className="carousel"
          activeIndex={this.props.index}
          direction={this.props.direction}
          onSelect={this.handleSelect}
        >
          <Carousel.Item className="carousel-item">
            <img width={1200} height={450} src={image1} alt="#1 900x500" />
            <Carousel.Caption>
              <h3>Call PitCrew For Help</h3>
              <p>Our page will call one of our Technicians to your location</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={1200} height={450} src={image3} alt="#2 900x500" />
            <Carousel.Caption>
              <h3>We Come and Fix Your Bike</h3>
              <p>Our mobile techs come and fix your bike</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={1200} height={450} src={image2} alt="#3 900x500" />
            <Carousel.Caption>
              <h3>Get To Where You Are Going</h3>
              <p>Finish Strong with PitCrew</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </React.Fragment>
    );
  }
}
export default TopScreenCarousel;
