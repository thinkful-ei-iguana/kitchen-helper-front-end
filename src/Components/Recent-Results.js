import React from "react";
import config from "../config";
import Recipe from "./Recipe";

export default class RecentResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/recipes`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${config.API_TOKEN}`
      }
    })
      .then(res => res.json())
      .then(recipesRes => this.setState({ recipes: recipesRes }));
  }

  render() {
    return (
      <div className="RecentResults">
        <section className="flex-container">
          {this.state.recipes.map(recipe => (
            <Recipe key={recipe.id} {...recipe} />
          ))}
        </section>
      </div>
    );
  }
}
