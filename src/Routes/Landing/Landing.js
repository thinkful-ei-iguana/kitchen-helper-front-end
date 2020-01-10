import React from "react";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";
<<<<<<< Updated upstream:src/Components/Landing.js
import Context from "../Components/Context";
import RecentResults from "./Recent-Results";
=======
import Context from "../../Components/Context/Context";
import RecentResults from "../Recent-Results/Recent-Results";
>>>>>>> Stashed changes:src/Routes/Landing/Landing.js

export default class Landing extends React.Component {
  static contextType = Context;
  constructor() {
    super();
    this.state = { counter: 0 };
  }
  render() {
    if (this.context.recipes.length === 0) {
      return <p>Loading</p>;
    }
    document.addEventListener("click", function(event) {
      event.preventDefault(event);
    });

    return (
      <div className="Landing">
        <header id="Landing-Header" className="flex-container">
          <div className="flex-item"></div>
        </header>
        <section id="landingDocumentation">
          <RecentResults />
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
