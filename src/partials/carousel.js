import React, { Component } from "react";
import { Carousel } from "react-bootstrap";

class topScreenCarousel extends Component {
  render() {
    return <h3>HELLO</h3>;
    return (
      <React.Fragment>
        <h3>Test Carousel</h3>
        <Carousel
          className="carousel"
          activeIndex={this.props.index}
          direction={this.props.direction}
          onSelect={this.handleSelect}
        >
          <Carousel.Item className="carousel-item">
            <img
              width={1200}
              height={450}
              src={this.props.image1}
              alt="#1 900x500"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              width={1200}
              height={450}
              src={this.props.image2}
              alt="#2 900x500"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              width={1200}
              height={450}
              src={this.props.image3}
              alt="#3 900x500"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </React.Fragment>
    );
  }
}
export default topScreenCarousel;
