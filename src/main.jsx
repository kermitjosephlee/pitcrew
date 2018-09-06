import React, { Component } from "react";
import "./Main.css";
import icon1 from "./images/smartphone.png";
import icon2 from "./images/bikeRepair.png";
import icon3 from "./images/biking.png";
import icon4 from "./images/map.jpg";
import icon5 from "./images/tech.png";
import face1 from "./images/joe.jpeg";
import face2 from "./images/Taha.jpeg";
import face3 from "./images/Michael.jpg";

const Main = () => (
  <div class="wrapper">
    <section class="section parallax bg1" />
    <div>
      <section class="featured-functionality section static">
        <h1 class="block1">We get you back on the road in 3 easy steps</h1>
        <div>
          <div class="box">
            <h3>Call Dispatch</h3>
            <img class="image" src={icon1} />
            <p class="text-description">
              “PitCrew is there to assist you with any problem you come upon on
              the road. We provide Mechanical, Medical, and Sweep help for your
              journey. Just contact dispatch and help will be on the way”
            </p>
          </div>
        </div>
        <div>
          <div class="box">
            <h3>Tech Arrives</h3>
            <img class="image" src={icon2} />
            <p class="text-description">
              “Stay put and a technician will be on the way! They will come find
              you and assist on the type of help you have provided us. They will
              solve the problem on the spot or 'sweep' you back to home base.”
            </p>
          </div>
        </div>
        <div>
          <div class="box">
            <h3>Ride Away</h3>
            <img class="image" src={icon3} />
            <p class="text-description">
              “It is as simple as that. Now you are ready to get back on the
              road and conquer the journey! For any race, we are happy to help
              take the worries off tour hands and for you to enjoy the ride!”
            </p>
          </div>
        </div>
      </section>
      <section class="feature-blocks section2 static">
        <div>
          <div class="feature-text" style={{ paddingTop: "8vw" }}>
            <h2>Dispatch</h2>
            <p class="dispatch">
              <img
                class="image"
                src={icon4}
                style={{ marginLeft: "8vw", marginTop: "-7vw" }}
              />
              As a dispatch, you have a dashboard that will enable you to
              efficiently organize your technicians all across the race. The
              dashboard has all the information you need such as; where the
              technicians are located and where the incidents occur. With this
              information management of your team will improve significantly!
            </p>
          </div>
          <div
            class="feature-text"
            style={{
              boxShadow: "0px 1px 10px black",
              backgroundColor: "white"
            }}
          >
            <h2
              style={{
                alignSelf: "flex-end"
              }}
            >
              Technicians
            </h2>
            <p class="technicians">
              <img
                class="image"
                src={icon5}
                style={{
                  marginTop: "-10vw",
                  borderRadius: "10px",
                  maxHeight: "28vw"
                }}
              />
              Now technicians don't have to look aimlessly to find riders to
              help! With the power of PitCrew, dispatch has the ability to
              efficiently distribute technicians to help stranded riders. The
              transfer of communication is seamless and will greatly impact
              rides positively!
            </p>
          </div>
        </div>
      </section>
      <section class="section parallax bg2">
        <div>
          <h1 class="block1 team">Meet The Team!</h1>
          <div class="box1">
            <h3>Joe Lee</h3>
            <img class="image" src={face1} />
            <p>
              A naturally curious and motivated former Chef, Entrepreneur, and
              proven team leader, Joe turned to full-stack web development
              looking for an opportunity to learn and build better web and
              mobile integrated apps. You can find him in his offline time
              playing basketball, riding his bike, and fiddling with his
              sous-vide cooker.
            </p>
          </div>
        </div>
        <div>
          <div class="box1">
            <h3>Taha Elardi</h3>
            <img class="image" src={face2} />
            <p>
              A junior Full-Stack Web Developer with 5 years of experience in
              engineering in various industries including oil and gas,
              construction and telecom. Along my career, programming became a
              discerning passion on a personal level that realized my enthusiasm
              for problem solving and design. Ultimately it motivated me to
              pursue a career in full-stack development. I'm driven by applied
              mathematics in software, be it machine learning or video game
              development.
            </p>
          </div>
        </div>
        <div>
          <div class="box1">
            <h3>Michael Surya</h3>
            <img class="image" src={face3} />
            <p>
              Jr. Web Developer with a degree in IT Management. Interested in
              leveraging both development and management side of projects to
              deliver amazing products. Passionate about learning the
              ins-and-outs of languages to develop clean, modular codes and
              creating user friendly UI.
            </p>
          </div>
        </div>
      </section>
      <footer class="foot">
        <div class="copyright">© 2018 Copyright: PitCrew</div>
      </footer>
    </div>
  </div>
);

export default Main;
