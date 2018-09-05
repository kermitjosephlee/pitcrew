import React, { Component } from "react";
import { Jumbotron, Button, Grid } from "react-bootstrap";
import { AutoAffix } from "react-overlays";
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
      <div class="wrapper">
        <div class="section parallax">
          Scroll Up and Down this page to see the parallax scrolling effect.
          This div is just here to enable scrolling. Tip: Try to remove the
          background-attachment property to remove the scrolling effect.
        </div>
        <div class="section static">
          <h2>
            We get you back on the road in{" "}
            <span class="bold">3 easy steps</span>{" "}
          </h2>
          <section class="featured-functionality">
            <div>
              <div>
                <h3>Call Dispatch</h3>
                <p>
                  “Top Hat helps me run a better class. I love how simple it is
                  to take attendance and extract that data later.”
                </p>
              </div>
            </div>
            <div>
              <div>
                <h3>Tech Arrives</h3>
                <p>
                  “Top Hat helps me run a better class. I love how simple it is
                  to take attendance and extract that data later.”
                </p>
              </div>
            </div>
            <div>
              <div>
                <h3>Call Dispatch</h3>
                <p>
                  “Top Hat helps me run a better class. I love how simple it is
                  to take attendance and extract that data later.”
                </p>
              </div>
            </div>
          </section>
          <section class="feature-blocks">
            <div>
              <div class="feature-text">
                <h2>Inspire and motivate your students</h2>
                <h3>
                  Transform passive lectures and course materials with active
                  learning
                </h3>
                <hr class="divider" />
                <p>
                  Top Hat’s student engagement software enhances the course
                  experience by motivating students to learn, participate and
                  ultimately master the content you teach.
                </p>
                <p>
                  Spark discussions, integrate videos and graphics, even
                  customize full interactive textbooks to suit the needs of your
                  course, all within an easy-to-use interface.
                </p>
              </div>
              <div class="feature-text">
                <h2>Inspire and motivate your students</h2>
                <h3>
                  Transform passive lectures and course materials with active
                  learning
                </h3>
                <hr class="divider" />
                <p>
                  Top Hat’s student engagement software enhances the course
                  experience by motivating students to learn, participate and
                  ultimately master the content you teach.
                </p>
                <p>
                  Spark discussions, integrate videos and graphics, even
                  customize full interactive textbooks to suit the needs of your
                  course, all within an easy-to-use interface.
                </p>
              </div>
              <div class="feature-text">
                <h2>Inspire and motivate your students</h2>
                <h3>
                  Transform passive lectures and course materials with active
                  learning
                </h3>
                <hr class="divider" />
                <p>
                  Top Hat’s student engagement software enhances the course
                  experience by motivating students to learn, participate and
                  ultimately master the content you teach.
                </p>
                <p>
                  Spark discussions, integrate videos and graphics, even
                  customize full interactive textbooks to suit the needs of your
                  course, all within an easy-to-use interface.
                </p>
              </div>
            </div>
          </section>
          <h2>Meet the Team!</h2>
          <hr class="divider" />
          <section class="featured-functionality">
            <div>
              <div>
                <h3>Joe Lee</h3>
                <p>
                  “Top Hat helps me run a better class. I love how simple it is
                  to take attendance and extract that data later.”
                </p>
              </div>
            </div>
            <div>
              <div>
                <h3>Taha Elardi</h3>
                <p>
                  “Top Hat helps me run a better class. I love how simple it is
                  to take attendance and extract that data later.”
                </p>
              </div>
            </div>
            <div>
              <div>
                <h3>Michael Surya</h3>
                <p>
                  “Top Hat helps me run a better class. I love how simple it is
                  to take attendance and extract that data later.”
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Main;
