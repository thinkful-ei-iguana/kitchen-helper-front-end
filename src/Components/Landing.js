import React from "react";
import { Link } from "react-router-dom";

export default class Landing extends React.Component {
  render() {
    return (
      <div className="Landing">
        <header id="Landing-Header" className="flex-container">
          <div className="flex-item">
            {/* <img
              id="Landing-Logo"
              src={SmartLogo}
              alt="Smart Marketplace Logo"
            /> */}
            <h4 id="Landing-Slogan">Make fun recipes with friends!</h4>
            <div id="HomeBtn">
              <Link id="Home-Btn" to="/Home">
                Continue to site
              </Link>
            </div>
          </div>
          <div id="SVG" className="flex-item">
            {/* <PhoneSVG /> */}
          </div>
        </header>
        <section id="Landing-Documentation">
          <div id="FAQ">
            <h2 id="FAQ-H2">Hi I'm the kitchen helper application!</h2>
            <p id="FAQ-P">I'm the 1st recipe!</p>
          </div>
          <hr id="Landing-Divider" />
          <div id="FAQ">
            <h2 id="FAQ-H2">Hi I'm the kitchen helper application!</h2>
            <p id="FAQ-P">I'm the 2nd recipe!</p>
          </div>
          <hr id="Landing-Divider" />
          <div id="FAQ">
            <h2 id="FAQ-H2">Hi I'm the kitchen helper application!</h2>
            <p id="FAQ-P">I'm the 3rd recipe!</p>
          </div>
        </section>
        <section id="Landing-Buttons">
          <hr id="Connect-Divider" />
          <div id="buttons">
            <a href="https://github.com" target="blank_">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://github.com" target="blank_">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://github.com" target="blank_">
              <i className="fas fa-desktop"></i>
            </a>
          </div>
        </section>
      </div>
    );
  }
}
