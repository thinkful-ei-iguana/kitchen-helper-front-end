import React from "react";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";
import Context from "../Components/Context";

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

    const frontPage = this.context.recipes;
    const recipeCounter = () => {
      this.setState({
        counter: this.state.counter + 1
      });
    };

    return (
      <div className="Landing">
        <header id="Landing-Header" className="flex-container">
          <div className="flex-item">
            <h4 id="Landing-Slogan">Make fun foods with friends!</h4>
          </div>
        </header>
        <section id="landingDocumentation">
          <div id="FAQ">
            <h2 id="FAQ-H2">{frontPage[0].title}</h2>
            <button
              id="RecipeOne"
              onClick={e => {
                recipeCounter();
              }}
            >
              Make this recipe?
            </button>
            <p id="FAQ-P">{frontPage[0].recipe_description}</p>
          </div>
          <hr id="Landing-Divider" />
          <div id="FAQ">
            <h2 id="FAQ-H2">{frontPage[1].title}</h2>
            <button
              id="RecipeTwo"
              onClick={e => {
                recipeCounter();
              }}
            >
              Make this recipe?
            </button>
            <p id="FAQ-P">{frontPage[1].recipe_description}</p>
          </div>
          <hr id="Landing-Divider" />
          <div id="FAQ">
            <h2 id="FAQ-H2">{frontPage[2].title}</h2>
            <button
              id="RecipeThree"
              onClick={e => {
                recipeCounter();
              }}
            >
              Make this recipe?
            </button>
            <p id="FAQ-P">{frontPage[2].recipe_description}</p>
          </div>
          <div>
            <h2>
              Number of recipes you've made:
              <span id="recipeMadeCount"> {this.state.counter}</span>
            </h2>
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
