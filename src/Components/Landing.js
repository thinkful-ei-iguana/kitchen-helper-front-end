import React from "react";
import { Link } from "react-router-dom";
import Context from "../Components/Context";

export default class Landing extends React.Component {
  static contextType = Context;
  render() {
    if (this.context.recipes.length === 0) {
      return <p>Loading</p>;
    }
    const frontPage = this.context.recipes;
    console.log(this.context);
    return (
      <div className="Landing">
        <header id="Landing-Header" className="flex-container">
          <div className="flex-item">
            <h4 id="Landing-Slogan">Make fun recipes with friends!</h4>
            <div id="HomeBtn">
              <Link id="Home-Btn" to="/Home">
                Continue to site
              </Link>
            </div>
          </div>
        </header>
        <section id="Landing-Documentation">
          <div id="FAQ">
            <h2 id="FAQ-H2">{frontPage[0].title}</h2>
            <p id="FAQ-P">{frontPage[0].recipe_description}</p>
          </div>
          <hr id="Landing-Divider" />
          <div id="FAQ">
            <h2 id="FAQ-H2">{frontPage[1].title}</h2>
            <p id="FAQ-P">{frontPage[1].recipe_description}</p>
          </div>
          <hr id="Landing-Divider" />
          <div id="FAQ">
            <h2 id="FAQ-H2">{frontPage[2].title}</h2>
            <p id="FAQ-P">{frontPage[2].recipe_description}</p>
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
