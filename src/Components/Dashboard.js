import React from "react";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";
import Context from "../Components/Context";

export default class Dashboard extends React.Component {
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
    const user = 12;

    return (
      <div className="Dashboard">
        <header id="Dashboard-Header" className="flex-container">
          <div className="flex-item">
            <h4 id="Dashboard-Slogan">Welcome {user}</h4>
          </div>
        </header>
        <section>
          <button>Make a new recipe?</button>
        </section>
        <section id="Dashboard-Buttons">
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
